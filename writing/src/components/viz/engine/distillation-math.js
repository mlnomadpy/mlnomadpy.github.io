// Finite Gram matrices from teacher outputs. Class and example indices differ.
export function softmaxT(z, temperature) {
  if (!(temperature > 0)) throw new RangeError('Temperature must be positive');
  const scaled=z.map(v=>v/temperature), high=Math.max(...scaled);
  const exp=scaled.map(v=>Math.exp(v-high)), sum=exp.reduce((s,v)=>s+v,0);
  return exp.map(v=>v/sum);
}
export function classKernel(logits, temperature) {
  const classes=logits[0].length;
  const S=Array.from({length:classes},()=>Array(classes).fill(0));
  for(const z of logits){const p=softmaxT(z,temperature);for(let i=0;i<classes;i++)for(let j=0;j<classes;j++)S[i][j]+=p[i]*p[j]/logits.length;}
  const diag=S.map((r,i)=>Math.sqrt(r[i]));
  return S.map((r,i)=>r.map((v,j)=>v/(diag[i]*diag[j])));
}
export function centerKernel(S) {
  const n=S.length, means=S.map(r=>r.reduce((s,v)=>s+v,0)/n), grand=means.reduce((s,v)=>s+v,0)/n;
  return S.map((r,i)=>r.map((v,j)=>v-means[i]-means[j]+grand));
}
