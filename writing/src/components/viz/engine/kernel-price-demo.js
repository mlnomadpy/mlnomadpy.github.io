// Explicit real orthonormal Fourier modes on T, measure dx/(2π).
export const candidates = [
  {id:'bump', name:'heat bump', value:x => {let s=0;for(let k=1;k<=16;k++)s+=Math.exp(-.25*k*k)*Math.cos(k*x);return s;}},
  {id:'wave', name:'cos(2x)', value:x=>Math.cos(2*x)},
  {id:'corner', name:'tent', value:x=>1-2*Math.abs(x)/Math.PI},
  {id:'jump', name:'square wave', value:x=>x>=0?1:-1},
  {id:'smooth', name:'Poisson wave', value:x=>{const r=Math.exp(-.5);return (r*Math.cos(x)-r*r)/(1-2*r*Math.cos(x)+r*r);}},
];
export function logEnergy(id,k) {
  if(id==='wave')return k===2?-Math.log(2):-Infinity;
  if(id==='corner')return k%2?Math.log(32/Math.PI**4)-4*Math.log(k):-Infinity;
  if(id==='jump')return k%2?Math.log(8/Math.PI**2)-2*Math.log(k):-Infinity;
  if(id==='bump')return -.5*k*k-Math.log(2);
  if(id==='smooth')return -k-Math.log(2);
  throw new Error('Unknown candidate');
}
export function logEigenvalue(kind,k) {
  if(kind==='heat')return -.5*(.55*k)**2;
  if(kind==='sobolev')return -Math.log1p(k*k);
  if(kind==='poisson')return -.346*k;
  if(kind==='finite')return k<=5?0:-Infinity;
  throw new Error('Unknown periodic kernel');
}
export function partialBill(id,kind,cutoff) {
  let sum=-Infinity;
  for(let k=1;k<=cutoff;k++) {
    const e=logEnergy(id,k);if(e===-Infinity)continue;
    const l=logEigenvalue(kind,k);if(l===-Infinity)return {unavailable:true,mode:k,logCost:Infinity};
    const t=e-l, hi=Math.max(sum,t);sum=hi+Math.log1p(Math.exp(Math.min(sum,t)-hi));
  }
  return {unavailable:false,logCost:sum};
}
export function gaussLegendre(n=64) {
  const nodes=[],weights=[];
  for(let i=0;i<n;i++) {
    let z=Math.cos(Math.PI*(i+.75)/(n+.5)), d=0;
    for(let it=0;it<30;it++) {
      let p=1,q=0;for(let j=1;j<=n;j++){const r=q;q=p;p=((2*j-1)*z*q-(j-1)*r)/j;}
      d=n*(z*p-q)/(z*z-1);const delta=p/d;z-=delta;if(Math.abs(delta)<1e-15)break;
    }
    nodes.push(z);weights.push(2/((1-z*z)*d*d));
  }
  return {nodes,weights};
}
export function sphereSpectrum(sharp,maxDegree=9,n=64) {
  const {nodes,weights}=gaussLegendre(n),out=Array(maxDegree+1).fill(0);
  nodes.forEach((t,i)=>{let p=1,q=t;const w=.5*weights[i]*Math.exp(sharp*(t-1));out[0]+=w;
    if(maxDegree>0)out[1]+=w*t;
    for(let k=1;k<maxDegree;k++){const r=((2*k+1)*t*q-k*p)/(k+1);out[k+1]+=w*r;p=q;q=r;}
  });return out;
}
