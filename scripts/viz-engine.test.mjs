import test from 'node:test';
import assert from 'node:assert/strict';
import { createStepClock, ignoreShortcut } from '../writing/src/components/viz/engine/runtime.js';
import { loadJSON, loadFloat32 } from '../writing/src/components/viz/engine/io.js';
import { gate } from '../writing/src/components/viz/engine/draw.js';
import { drag } from '../writing/src/components/viz/engine/pointer.js';

const flush = async () => { for(let i=0;i<12;i++)await Promise.resolve(); };

test('elapsed-time simulation has identical progress on 30/60/120/144 Hz displays', () => {
 for(const rate of [.5,1,3,5])for(const speed of [.5,1,4]) {
  const counts=[30,60,120,144].map(hz=>{const clock=createStepClock(rate);let n=0;for(let i=0;i<=hz*2;i++)n+=clock.advance(i*1000/hz,speed);return n;});
  assert.ok(counts.every(n=>n===Math.round(120*rate*speed)),`${rate}/${speed}: ${counts}`);
 }
 const clock=createStepClock(1);clock.advance(0);assert.equal(clock.advance(60000),6);clock.reset();assert.equal(clock.advance(90000),0);
});

test('figure shortcuts preserve editable controls, links and modifier shortcuts', () => {
 for(const tag of ['input','textarea','select','button','a','editable'])assert.equal(ignoreShortcut({target:{closest:()=>({tag})}}),true);
 assert.equal(ignoreShortcut({target:{closest:()=>null}}),false);
 for(const key of ['ctrlKey','altKey','metaKey','defaultPrevented'])assert.equal(ignoreShortcut({[key]:true}),true);
});

test('asset reads share successful work, validate status/shape, and retry failures', async () => {
 const previous=globalThis.fetch;let calls=0;
 globalThis.fetch=async()=>{calls++;if(calls===1)return {ok:false,status:503};return {ok:true,json:async()=>({answer:42})};};
 try {
  await assert.rejects(loadJSON('test:retry-json'),/503/);
  const [a,b]=await Promise.all([loadJSON('test:retry-json'),loadJSON('test:retry-json')]);assert.strictEqual(a,b);assert.equal(calls,2);
  globalThis.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(3)});
  await assert.rejects(loadFloat32('test:bad-binary'),/length/);
 }finally{globalThis.fetch=previous;}
});

test('late loader results cannot overwrite reset state; errors reach recoverable status', async () => {
 const old=globalThis.IntersectionObserver;globalThis.IntersectionObserver=undefined;
 let resolve,cleaned=0;const state={};const api={state,generation:1,canvas:{},render(){},beginTask(){return()=>cleaned++;},onCleanup(){},fail(e){this.error=e;}};
 try {
  gate(api,()=>new Promise(r=>resolve=r),(a,data)=>{a.state.data=data;});await flush();
  api.state={};api.generation++;resolve('stale');await flush();assert.equal(api.state.data,undefined);
  gate(api,()=>Promise.reject(new Error('failed')),()=>assert.fail('must not apply'));
  await flush();assert.match(api.error.message,/failed/);assert.equal(cleaned,1);
 }finally{globalThis.IntersectionObserver=old;}
});

test('pointer capture handles one primary pointer, cancellation and repeatable teardown', () => {
 const listeners=new Map(),captured=new Set();const canvas={style:{},dataset:{},getBoundingClientRect:()=>({left:10,top:20}),addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:(n,f)=>{if(listeners.get(n)===f)listeners.delete(n);},setPointerCapture:id=>captured.add(id),hasPointerCapture:id=>captured.has(id),releasePointerCapture:id=>captured.delete(id)};
 let starts=0,moves=0,ends=0;const release=drag(canvas,{onStart:p=>{starts++;assert.deepEqual(p,{x:5,y:5});},onMove:()=>moves++,onEnd:()=>ends++});
 listeners.get('pointerdown')({pointerId:1,button:0,clientX:15,clientY:25});
 listeners.get('pointermove')({pointerId:2,clientX:20,clientY:25});assert.equal(moves,0);
 listeners.get('pointercancel')({pointerId:1,clientX:20,clientY:25});assert.equal(ends,1);assert.equal(captured.size,0);
 release();assert.equal(listeners.size,0);assert.equal(canvas.dataset.vkDrag,undefined);assert.equal(starts,1);
 const second=drag(canvas);assert.equal(listeners.size,5);second();
});

// Minimal instrumented DOM: exercise the actual engine mounting, reset, clock,
// observers and handlers. No canvas/scientific arithmetic is replaced here.
class Element {
 constructor(tag='div'){this.nodeType=1;this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attrs={};this.style={setProperty:(n,v)=>{this.style[n]=v;}};this.listeners=new Map();this._class='';this.width=300;this.height=150;this.hidden=false;this.connected=true;
  this.classList={add:(...xs)=>{this.className=[...new Set([...this.className.split(' '),...xs])].join(' ').trim();},remove:x=>{this.className=this.className.split(' ').filter(v=>v!==x).join(' ');},toggle:(x,on)=>{if(on)this.classList.add(x);else this.classList.remove(x);},contains:x=>this.className.split(' ').includes(x)};
 }
 get className(){return this._class;}set className(v){this._class=v;}
 get isConnected(){return this.connected && (!this.parent || this.parent.isConnected);}
 get clientWidth(){return 800;}get scrollWidth(){return this.className==='vk-plot'?Math.max(800,+(this.closestRoot()?.style['--viz-min-width']||'0').replace('px','')):800;}
 closestRoot(){let x=this;while(x.parent&&x.parent.tagName!=='BODY')x=x.parent;return x;}
 getBoundingClientRect(){return {width:this.tagName==='CANVAS'?this.parent?.scrollWidth||800:800,height:parseFloat(this.style.height||'360'),left:0,top:0};}
 appendChild(c){c.parent=this;this.children.push(c);return c;}append(...cs){for(const c of cs)if(typeof c==='object')this.appendChild(c);}
 remove(){this.connected=false;if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this);}
 setAttribute(n,v){this.attrs[n]=String(v);}removeAttribute(n){delete this.attrs[n];}getAttribute(n){return this.attrs[n]??null;}
 addEventListener(n,fn){if(!this.listeners.has(n))this.listeners.set(n,new Set());this.listeners.get(n).add(fn);}
 removeEventListener(n,fn){this.listeners.get(n)?.delete(fn);}
 emit(n,e={}){for(const fn of [...(this.listeners.get(n)||[])])fn(e);}
 matches(q){return q.startsWith('.')?this.className.split(' ').includes(q.slice(1)):q.startsWith('#')?this.id===q.slice(1):this.tagName.toLowerCase()===q;}
 querySelectorAll(q){return this.children.flatMap(c=>[...(c.matches?.(q)?[c]:[]),...(c.querySelectorAll?.(q)||[])]);}
 querySelector(q){return this.querySelectorAll(q)[0]||null;}
 closest(){return null;}
 getContext(){return new Proxy({}, {get:(_,k)=>k==='measureText'?s=>({width:s.length*7}):()=>{}});}
}
function environment(){
 const observers=[],frames=new Map();let serial=0;
 class Observer{constructor(cb){this.cb=cb;this.disconnected=false;observers.push(this);}observe(el){this.element=el;}disconnect(){this.disconnected=true;}}
 const html=new Element('html'),body=new Element('body');html.appendChild(body);
 const doc=html;doc.documentElement=html;doc.body=body;doc.head=new Element('head');doc.readyState='complete';doc.createElement=n=>new Element(n);doc.getElementById=id=>doc.querySelector('#'+id);doc.hidden=false;
 const media=new Element();media.matches=false;
 Object.assign(globalThis,{document:doc,window:{devicePixelRatio:2,innerHeight:900,matchMedia:()=>media},location:{search:''},getComputedStyle:()=>({getPropertyValue:()=>''}),MutationObserver:Observer,ResizeObserver:Observer,IntersectionObserver:Observer,requestAnimationFrame:fn=>{frames.set(++serial,fn);return serial;},cancelAnimationFrame:id=>frames.delete(id)});
 return {doc,body,observers,frames,media,frame(ts){const fs=[...frames.values()];frames.clear();for(const fn of fs)fn(ts);},root(){const r=new Element();r.className='viz fixture';r.appendChild(Object.assign(new Element(),{className:'viz-cell'}));body.appendChild(r);return r;},enter(){for(const o of [...observers])if(o.element?.className==='vk-plot')o.cb([{isIntersecting:true}]);}};
}
const {mountViz,disposeViz}=await import('../writing/src/components/viz/engine/vizkit.js');

test('real engine defers setup, advances by elapsed time, respects inputs, and disposes', () => {
 const env=environment(),root=env.root();let steps=0,setups=0,cleanups=0;
 const api=mountViz(root,{title:'Fixture',controls:[{type:'play'},{type:'step'},{type:'reset'},{type:'text',name:'word',value:'s'},{type:'toggle',name:'flag',value:false},{type:'range',name:'x',min:0,max:10,step:1,value:3}],setup(a){setups++;a.onCleanup(()=>cleanups++);},step(){steps++;},draw(){}});
 assert.equal(setups,0);env.enter();assert.equal(setups,1);assert.strictEqual(mountViz(root,{}),api);
 let prevented=false;root.emit('keydown',{key:'s',target:{closest:()=>({})},preventDefault(){prevented=true;}});assert.equal(steps,0);assert.equal(prevented,false);
 root.emit('keydown',{key:' ',target:root,preventDefault(){}});env.frame(0);env.frame(1000/60);assert.equal(steps,1);
 env.doc.hidden=true;env.doc.emit('visibilitychange');assert.equal(api.playing,false);
 api.setControl('flag',true);assert.equal(root.querySelectorAll('input').find(e=>e.type==='checkbox').checked,true);
 api.setControl('x',7);assert.equal(root.querySelectorAll('input').find(e=>e.type==='range').getAttribute('aria-valuetext'),'7');
 const reset=root.querySelectorAll('button').find(e=>e.textContent==='Reset');reset.onclick();assert.equal(setups,2);assert.equal(cleanups,1);
 disposeViz(root);assert.equal(cleanups,2);assert.equal(env.frames.size,0);assert.equal(api.signal.aborted,true);assert.equal(root.dataset.vkReady,undefined);
 assert.ok(env.observers.filter(o=>o.element!==env.doc).every(o=>o.disconnected));
});

test('actual engine snaps reduced-motion tweens and cleans itself on DOM removal', () => {
 const env=environment(),root=env.root();env.media.matches=true;const api=mountViz(root,{title:'Still',draw(){}});env.enter();
 assert.equal(api.tween('value',0),0);assert.equal(api.tween('value',10),10);
 root.remove();for(const o of env.observers)if(o.element===env.doc)o.cb([{removedNodes:[root]}]);assert.equal(api.signal.aborted,true);assert.equal(env.frames.size,0);
});


test('recoverable engine failures can retry and remount without duplicate controls', () => {
 const env=environment(),root=env.root();let count=0;
 const api=mountViz(root,{title:'Recover',controls:[{type:'reset'}],setup(a){if(++count===1)a.fail(new Error('Expected fixture failure'));},draw(){}});
 const error=console.error;console.error=()=>{};
 try {
  env.enter();assert.equal(root.dataset.vkState,'error');
  root.querySelectorAll('button').find(e=>e.textContent==='Retry').onclick();assert.equal(root.dataset.vkState,'ready');assert.equal(count,2);
  const buttons=root.querySelectorAll('button').length;disposeViz(root);
  mountViz(root,{title:'Recover',controls:[{type:'reset'}],draw(){}});env.enter();assert.equal(root.querySelectorAll('button').length,buttons);disposeViz(root);
 }finally{console.error=error;}
});

test('engine reuses unchanged canvas buffers and resets captured drag handlers', () => {
 const env=environment(),root=env.root();let dragStarts=0;
 const api=mountViz(root,{title:'Drag',controls:[{type:'reset'}],setup(a){drag(a.canvas,{onStart:()=>dragStarts++});},draw(){}});env.enter();
 let allocations=0,w=api.canvas.width,h=api.canvas.height;
 Object.defineProperties(api.canvas,{width:{get:()=>w,set:v=>{allocations++;w=v;}},height:{get:()=>h,set:v=>{allocations++;h=v;}}});
 env.observers[1].cb([]);env.frame(10);env.observers[1].cb([]);env.frame(20);assert.equal(allocations,0);
 root.querySelectorAll('button').find(e=>e.textContent==='Reset').onclick();
 api.canvas.emit('pointerdown',{pointerId:1,button:0,clientX:0,clientY:0});assert.equal(dragStarts,1);
 disposeViz(root);assert.equal(api.canvas.listeners.get('pointerdown').size,0);
});

test('gate awaits asynchronous preparation before marking a figure ready', async () => {
 const previous=globalThis.IntersectionObserver;globalThis.IntersectionObserver=undefined;
 let finish;const api={state:{},generation:1,canvas:{},onCleanup(){},render(){},beginTask(){return()=>{};}};
 try {gate(api,async()=>42,async(a,value)=>{await new Promise(r=>finish=r);a.state.value=value;});await flush();assert.equal(api.state.ready,false);finish();await flush();assert.equal(api.state.ready,true);assert.equal(api.state.value,42);}
 finally{globalThis.IntersectionObserver=previous;}
});


test('numeric controls update on input and keep valid state during partial editing', () => {
 const env=environment(),root=env.root();let changed=0;
 const api=mountViz(root,{title:'Numeric',controls:[{type:'number',name:'angle',label:'Angle',min:0,max:360,step:.1,value:60,reset:false}],onControl(){changed++;},draw(){}});env.enter();
 const input=root.querySelector('input');input.value='90';input.oninput();assert.equal(api.get('angle'),90);assert.equal(changed,1);
 input.value='';input.oninput();assert.equal(api.get('angle'),90);input.onchange();assert.equal(input.value,90);
 input.value='999';input.oninput();assert.equal(api.get('angle'),360);disposeViz(root);
});


test('in-page expansion works without native fullscreen and closes with Escape', async () => {
 const env=environment(),root=env.root();const api=mountViz(root,{title:'Expand test',draw(){}});env.enter();
 const expand=root.querySelectorAll('button').find(b=>b.getAttribute('aria-label')==='Expand figure');await expand.onclick();
 assert.equal(root.getAttribute('role'),'dialog');assert.equal(root.classList.contains('vk-expanded'),true);assert.equal(env.doc.body.style.overflow,'hidden');
 root.emit('keydown',{key:'Escape',preventDefault(){}});assert.equal(root.classList.contains('vk-expanded'),false);assert.equal(root.getAttribute('role'),null);disposeViz(root);
});
