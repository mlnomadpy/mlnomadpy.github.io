// Teaching objectives for free 2-D embeddings. Labels define pairs; no encoder is trained.
// All gradients correspond to the displayed mean loss, including candidate-role derivatives.
export const onSphere = kind => !['hadsell','triplet'].includes(kind);
export const defaults = {margin:1.2,tau:.2,lambda:1,target:-.3};
const dot=(a,b)=>a.reduce((s,v,k)=>s+v*b[k],0);
const diff=(a,b)=>a.map((v,k)=>v-b[k]);
const softplus=z=>Math.max(z,0)+Math.log1p(Math.exp(-Math.abs(z)));
const sigmoid=z=>z>=0?1/(1+Math.exp(-z)):Math.exp(z)/(1+Math.exp(z));
export function projectSphere(pts) {
  for(const p of pts){const r=Math.hypot(...p);if(r<1e-12){p.fill(0);p[0]=1;}else for(let k=0;k<p.length;k++)p[k]/=r;}
}
export function samplePlan(labels,rng=Math.random) {
  return labels.map((y,i)=>{
    const pos=[],neg=[];labels.forEach((z,j)=>{if(j!==i)(z===y?pos:neg).push(j);});
    return {i,p:pos.length?pos[Math.floor(rng()*pos.length)]:null,n:neg.length?neg[Math.floor(rng()*neg.length)]:null};
  });
}
export function objective(kind,pts,labels,params={},plan=samplePlan(labels,()=>.5)) {
  const p={...defaults,...params},n=pts.length,grad=pts.map(z=>z.map(()=>0));let loss=0;
  const add=(i,v,s)=>v.forEach((x,k)=>grad[i][k]+=s*x);
  const pairDot=(i,j,coefficient)=>{add(i,pts[j],coefficient);add(j,pts[i],coefficient);};
  const pairs=n*(n-1)/2;if(!pairs)return {loss:0,grad};
  if(kind==='hadsell'||kind==='orthog'||kind==='siglip') {
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
      const same=labels[i]===labels[j];
      if(kind==='hadsell'){
        const d=diff(pts[i],pts[j]),d2=dot(d,d),r=Math.sqrt(d2+1e-12);
        if(same){loss+=d2/pairs;add(i,d,2/pairs);add(j,d,-2/pairs);}
        else if(r<p.margin){loss+=(p.margin-r)**2/pairs;const f=-2*(p.margin-r)/(r*pairs);add(i,d,f);add(j,d,-f);}
      } else {
        const c=dot(pts[i],pts[j]);
        if(kind==='orthog'){loss+=(same?1-c:c*c)/pairs;pairDot(i,j,(same?-1:2*c)/pairs);}
        else {const y=same?1:-1,z=-y*10*(c-p.target);loss+=softplus(z)/pairs;pairDot(i,j,-y*10*sigmoid(z)/pairs);}
      }
    }
  } else if(kind==='triplet') {
    const rows=plan.filter(r=>r.p!==null&&r.n!==null),denom=rows.length||1;
    for(const {i,p:pp,n:nn} of rows){
      const a=diff(pts[i],pts[pp]),b=diff(pts[i],pts[nn]),slack=dot(a,a)-dot(b,b)+(params.margin??.3);
      if(slack>0){loss+=slack/denom;add(i,diff(pts[nn],pts[pp]),2/denom);add(pp,a,-2/denom);add(nn,b,2/denom);}
    }
  } else if(['infonce','clip','supcon'].includes(kind)) {
    const rows=[];
    if(kind==='supcon'){
      labels.forEach((y,i)=>{const P=labels.flatMap((z,j)=>j!==i&&z===y?[j]:[]);if(P.length)rows.push({i,P,w:1});});
    } else for(const {i,p:pp} of plan)if(pp!==null){
      rows.push({i,P:[pp],w:kind==='clip'?.5:1});if(kind==='clip')rows.push({i:pp,P:[i],w:.5});
    }
    const denom=rows.reduce((s,r)=>s+r.w,0)||1;
    for(const {i,P,w} of rows){
      const logits=pts.map((q,j)=>j===i?-Infinity:dot(pts[i],q)/p.tau),mx=Math.max(...logits);
      const weights=logits.map(v=>Math.exp(v-mx)),sum=weights.reduce((a,b)=>a+b,0),rowWeight=w/denom;
      loss+=rowWeight*(mx+Math.log(sum)-P.reduce((s,j)=>s+logits[j]/P.length,0));
      for(let j=0;j<n;j++)if(j!==i){const ds=rowWeight*(weights[j]/sum-(P.includes(j)?1/P.length:0))/p.tau;pairDot(i,j,ds);}
    }
  } else if(kind==='alignunif') {
    const positives=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(labels[i]===labels[j])positives.push([i,j]);
    for(const [i,j] of positives){const d=diff(pts[i],pts[j]),denom=positives.length;loss+=dot(d,d)/denom;add(i,d,2/denom);add(j,d,-2/denom);}
    const rows=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const d=diff(pts[i],pts[j]);rows.push({i,j,d,logE:-2*dot(d,d)});}
    const mx=Math.max(...rows.map(r=>r.logE)),sum=rows.reduce((s,r)=>s+Math.exp(r.logE-mx),0);
    loss+=p.lambda*(mx+Math.log(sum/pairs));
    for(const r of rows){const f=-4*p.lambda*Math.exp(r.logE-mx)/sum;add(r.i,r.d,f);add(r.j,r.d,-f);}
  } else throw new Error(`Unknown teaching objective ${kind}`);
  return {loss,grad};
}
export function stepObjective(kind,pts,labels,lr,rng=Math.random,params={}) {
  if(onSphere(kind))projectSphere(pts);
  const result=objective(kind,pts,labels,params,samplePlan(labels,rng));
  // Unit-circle cases use the projected gradient and a normalization retraction.
  for(let i=0;i<pts.length;i++){
    const radial=onSphere(kind)?dot(result.grad[i],pts[i]):0;
    for(let k=0;k<pts[i].length;k++)pts[i][k]-=lr*(result.grad[i][k]-radial*pts[i][k]);
  }
  if(onSphere(kind))projectSphere(pts);
  return result.loss;
}
