// Small float64 teaching reference. Fixed Gaussian draws, not trained features.
export function normalDraw(seed) {
  let s=seed>>>0;
  const uniform=()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return (s+.5)/4294967296};
  return ()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform());
}
export const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
export function toyData(n=28,d=8,r=4){
 const g=normalDraw(91),Q=[],K=[],V=[];
 for(let i=0;i<n;i++){
  const t=2*Math.PI*i/n;
  Q.push(Array.from({length:d},(_,j)=>(j===0?1.5*Math.cos(t):j===1?1.5*Math.sin(t):0)+.2*g()));
  K.push(Array.from({length:d},(_,j)=>(j===0?1.5*Math.cos(t):j===1?1.5*Math.sin(t):0)+.2*g()));
  V.push(Array.from({length:r},()=>g()));
 }
 return {Q,K,V};
}
export function exactAttention(Q,K,V,causal=false){
 const n=Q.length,r=V[0].length,d=Q[0].length,A=[],Y=[];
 for(let i=0;i<n;i++){
  const scores=K.map((k,j)=>causal&&j>i?-Infinity:dot(Q[i],k)/Math.sqrt(d));
  const max=Math.max(...scores),w=scores.map(s=>Math.exp(s-max)),z=w.reduce((s,v)=>s+v,0),a=w.map(v=>v/z);
  A.push(a);Y.push(Array.from({length:r},(_,c)=>a.reduce((s,v,j)=>s+v*V[j][c],0)));
 }
 return {A,Y};
}
export function featureLogs(X,omega){
 const scale=X[0].length**(-.25),m=omega.length;
 return X.map(row=>{const x=row.map(v=>v*scale),norm=dot(x,x);return omega.map(w=>dot(x,w)-norm/2-Math.log(m)/2)});
}
export function randomMatrix(m,d,seed){const g=normalDraw(seed);return Array.from({length:m},()=>Array.from({length:d},g))}
export function featurePair(Q,K,m,seed,mode='positive'){
 const omega=randomMatrix(m,Q[0].length,seed);
 if(mode==='positive'){
  const lq=featureLogs(Q,omega),lk=featureLogs(K,omega),shift=Math.max(...lk.flat());
  return {Fq:lq.map(row=>{const max=Math.max(...row);return row.map(v=>Math.exp(v-max))}),Fk:lk.map(row=>row.map(v=>Math.exp(v-shift)))};
 }
 const scale=Q[0].length**(-.25);
 const trig=X=>X.map(row=>{const x=row.map(v=>v*scale),norm=Math.exp(dot(x,x)/2)/Math.sqrt(m);return omega.flatMap(w=>[norm*Math.cos(dot(x,w)),norm*Math.sin(dot(x,w))])});
 return {Fq:trig(Q),Fk:trig(K)};
}
export function reassociated(Fq,Fk,V,causal=false){
 const m=Fk[0].length,r=V[0].length,S=Array.from({length:m},()=>Array(r).fill(0)),z=Array(m).fill(0),Y=[];
 const add=j=>{for(let f=0;f<m;f++){z[f]+=Fk[j][f];for(let c=0;c<r;c++)S[f][c]+=Fk[j][f]*V[j][c]}};
 if(!causal)for(let j=0;j<Fk.length;j++)add(j);
 for(let i=0;i<Fq.length;i++){
  if(causal)add(i);
  const den=dot(Fq[i],z);
  Y.push(!Number.isFinite(den)||den===0?null:Array.from({length:r},(_,c)=>Fq[i].reduce((s,v,f)=>s+v*S[f][c],0)/den));
 }
 return {Y,S,z};
}
export function approximateAttention(Q,K,V,m,seed=5,mode='positive'){
 const {Fq,Fk}=featurePair(Q,K,m,seed,mode),result=reassociated(Fq,Fk,V);
 // This NxN diagnostic is for the illustration only; it is not used by the state readout.
 const A=Fq.map(q=>{const w=Fk.map(k=>dot(q,k)),z=w.reduce((s,v)=>s+v,0);return z===0?null:w.map(v=>v/z)});
 return {...result,A,Fq,Fk};
}
export function relativeError(actual,reference){
 if(actual.some(row=>!row||row.some(v=>!Number.isFinite(v))))return Infinity;
 let a=0,b=0;for(let i=0;i<reference.length;i++)for(let j=0;j<reference[i].length;j++){a+=(actual[i][j]-reference[i][j])**2;b+=reference[i][j]**2}
 return b>0?Math.sqrt(a/b):Math.sqrt(a);
}
// A true streaming positive-feature implementation. A new key can raise the
// shared log scale; rescaling S and z preserves all previous contributions.
export function causalPositive(Q,K,V,m,seed=5){
 const omega=randomMatrix(m,Q[0].length,seed),r=V[0].length;
 const S=Array.from({length:m},()=>Array(r).fill(0)),z=Array(m).fill(0),Y=[];let shift=-Infinity;
 for(let i=0;i<Q.length;i++){
  const qLog=featureLogs([Q[i]],omega)[0],kLog=featureLogs([K[i]],omega)[0];
  const next=Math.max(shift,...kLog),factor=shift===-Infinity?0:Math.exp(shift-next);
  for(let f=0;f<m;f++){z[f]*=factor;for(let c=0;c<r;c++)S[f][c]*=factor}
  shift=next;const key=kLog.map(v=>Math.exp(v-shift)),qMax=Math.max(...qLog),q=qLog.map(v=>Math.exp(v-qMax));
  for(let f=0;f<m;f++){z[f]+=key[f];for(let c=0;c<r;c++)S[f][c]+=key[f]*V[i][c]}
  const den=dot(q,z);Y.push(den>0&&Number.isFinite(den)?Array.from({length:r},(_,c)=>q.reduce((s,v,f)=>s+v*S[f][c],0)/den):null);
 }
 return {Y,S,z};
}
