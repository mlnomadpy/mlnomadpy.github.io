"""Make a local, unpublished editorial inventory from a separate blog checkout.

Usage: python3 scripts/review-blog.py ../blog-review-source
Requires PyYAML (available in the audit environment). No source posts are copied.
Outputs only to .blog-review/, outside src/, public/, and dist/.
"""

import csv
import datetime
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(sys.argv[1]).resolve()
OUT = ROOT / ".blog-review"
OUT.mkdir(exist_ok=True)
revision = subprocess.check_output(
    ["git", "-C", str(SOURCE), "rev-parse", "HEAD"], text=True
).strip()
posts = []
for collection in ("blog", "writeups"):
    for path in sorted((SOURCE / "src/content" / collection).glob("*.md*")):
        raw = path.read_text()
        parts = re.split(r"^---\s*$", raw, maxsplit=2, flags=re.MULTILINE)
        if len(parts) != 3:
            raise ValueError(f"Missing frontmatter: {path}")
        data = yaml.safe_load(parts[1])
        body = parts[2]
        slug = path.stem
        imports = re.findall(r"^import\s+.*?from\s+['\"]([^'\"]+)['\"]", body, re.MULTILINE)
        components = [p for p in imports if "/viz/" in p]
        prose = re.sub(r"```.*?```|^import[^\n]*|<[^>]+>", " ", body, flags=re.MULTILINE | re.DOTALL)
        words = len(re.findall(r"\b[\w’'-]+\b", prose))
        rel = path.relative_to(SOURCE).as_posix()
        url = "/blog/" + ("writeups/" if collection == "writeups" else "") + slug + "/"
        date = data.get("pubDate")
        posts.append({
            "id": f"{collection}/{slug}",
            "collection": collection,
            "slug": slug,
            "title": data["title"],
            "description": data.get("description", ""),
            "date": date.isoformat() if isinstance(date, (datetime.date, datetime.datetime)) else str(date or ""),
            "legacyDraft": data.get("draft", False),
            "approxWords": words,
            "visualizations": len(components),
            "componentImports": imports,
            "companion": data.get("companion"),
            "references": len(data.get("references") or []),
            "localLinks": sorted(set(re.findall(r"\]\((/blog/[^\s)#]+)", body))),
            "source": rel,
            "sourceUrl": f"https://github.com/mlnomadpy/blog/blob/{revision}/{rel}",
            "liveUrl": None if data.get("draft", False) else "https://www.tahabouhsine.com" + url,
            "decision": "unreviewed",
            "notes": "",
        })

by_slug = {p["slug"]: p for p in posts if p["collection"] == "blog"}
for post in posts:
    companion = by_slug.get(post["companion"])
    if companion:
        post["pairedWith"] = companion["id"]
        companion["pairedWith"] = post["id"]

inventory = {"sourceRepository": "mlnomadpy/blog", "sourceRevision": revision,
             "publicationApproval": "None. Every item needs the owner's decision.", "posts": posts}
(OUT / "inventory.json").write_text(json.dumps(inventory, indent=2, ensure_ascii=False))
with (OUT / "inventory.csv").open("w", newline="") as handle:
    fields = ["id", "title", "collection", "date", "legacyDraft", "approxWords", "visualizations", "references", "pairedWith", "decision", "notes", "sourceUrl", "liveUrl"]
    writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(posts)

payload = json.dumps(inventory, ensure_ascii=False).replace("<", "\\u003c")
template = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Writing, reconsidered — local review</title>
<style>
:root{color-scheme:dark;--bg:#171512;--ink:#eee7d8;--muted:#bbb1a0;--line:#494136;--sand:#d2b482}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.55 Georgia,serif}main{max-width:1250px;margin:auto;padding:40px 24px}h1{font-size:clamp(2.4rem,6vw,4.5rem);font-weight:400;margin:0}h2{font-weight:400;font-size:1.25rem;margin:0 0 8px}.intro{max-width:68ch;color:var(--muted)}a{color:var(--sand);text-underline-offset:4px}button,input,select,textarea{font:inherit;color:inherit;background:#211e19;border:1px solid var(--line);border-radius:3px;padding:9px 12px}button{cursor:pointer}button:hover{border-color:var(--sand)}:focus-visible{outline:2px solid var(--sand);outline-offset:3px}.tools{display:flex;gap:12px;flex-wrap:wrap;align-items:center;border-block:1px solid var(--line);padding:18px 0;margin:25px 0}.tools label{font:13px/1.5 system-ui;display:grid;gap:4px}.tools input{width:270px}#count{font:14px system-ui;color:var(--muted)}article{display:grid;grid-template-columns:minmax(0,1fr) 245px;gap:28px;padding:24px 0;border-bottom:1px solid var(--line)}article p{margin:8px 0}.meta,.links,.pair{font:13px/1.7 system-ui;color:var(--muted)}.badge{color:var(--sand)}.choice{display:grid;gap:8px;align-content:start}.choice label{font:13px system-ui;color:var(--muted)}textarea{min-height:78px;width:100%;font:14px/1.5 system-ui;resize:vertical}.empty{padding:30px 0}summary{cursor:pointer;color:var(--sand)}.rubric{max-width:72ch}small{font:13px system-ui;color:var(--muted)}@media(max-width:700px){article{grid-template-columns:1fr;gap:15px}.tools input{width:100%}.choice{grid-template-columns:1fr 1fr}.choice label,.choice textarea{grid-column:1/-1}}
</style></head><body><main>
<small>LOCAL EDITORIAL REVIEW · SOURCE COPY ONLY</small><h1>Writing, reconsidered.</h1>
<p class="intro">A place to decide what still belongs. Every piece starts unreviewed. Previous publication is history, not permission to migrate it. Choosing here only records your editorial intent; it publishes nothing.</p>
<details class="rubric"><summary>A few questions for each piece</summary><p>Does it sound like me? Does it say something worth keeping? Can I stand behind its claims and sources? For technical work, can the code and experiments still be reproduced? Does a companion earn its own page? What needs rewriting before I would share it again?</p><p>Keep = candidate for migration after final checks. Revise = retain locally until revised. Archive = leave out of the new site. These choices do not delete the existing blog.</p></details>
<div class="tools"><label>Find a piece<input id="search" type="search" placeholder="Title, topic, or description"></label><label>Collection<select id="collection"><option value="">All writing</option><option value="blog">Technical posts</option><option value="writeups">Personal writeups</option></select></label><label>Decision<select id="status"><option value="">All decisions</option><option>unreviewed</option><option>keep</option><option>revise</option><option>archive</option></select></label><button id="export">Export decisions</button><p id="count" role="status"></p></div>
<p><small id="storage">Decisions are saved in this browser. Export a JSON copy to hand them back for migration. Closing this page does not publish or delete anything.</small></p>
<section id="posts" aria-label="Writing inventory"></section>
<p><small id="revision"></small></p>
</main><script id="inventory" type="application/json">__PAYLOAD__</script><script>
const data=JSON.parse(document.getElementById('inventory').textContent), posts=data.posts;
const KEY='portfolio-editorial-review-v1:'+data.sourceRevision;
let decisions={};try{decisions=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}
const statuses=['unreviewed','keep','revise','archive'];
const saved=p=>decisions[p.id]||{decision:'unreviewed',notes:''};
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(decisions))}catch{document.getElementById('storage').textContent='Browser storage is unavailable. Export decisions before leaving this page.'}}
function counts(){const n=posts.filter(p=>saved(p).decision!=='unreviewed').length;document.getElementById('count').textContent=`${n} / ${posts.length} reviewed · ${posts.filter(p=>saved(p).decision==='keep').length} selected to keep`}
function render(){const q=document.getElementById('search').value.toLowerCase(),collection=document.getElementById('collection').value,status=document.getElementById('status').value;
const visible=posts.filter(p=>(!collection||p.collection===collection)&&(!status||saved(p).decision===status)&&`${p.title} ${p.description} ${p.slug}`.toLowerCase().includes(q));const list=document.getElementById('posts');list.replaceChildren();
for(const p of visible){const row=el('article'),copy=el('div');copy.append(el('p',`${p.collection==='blog'?'Technical post':'Personal writeup'} · ${p.date.slice(0,10)} · ~${p.approxWords.toLocaleString()} words · ${p.visualizations} visualizations · ${p.references} references`,'meta'),el('h2',p.title));if(p.legacyDraft)copy.append(el('p','Already a draft in the source repository','badge'));copy.append(el('p',p.description));if(p.pairedWith){const other=posts.find(o=>o.id===p.pairedWith);copy.append(el('p','Paired with: '+other.title,'pair'))}const links=el('p',undefined,'links');for(const [label,url] of [['Read original',p.liveUrl],['View source',p.sourceUrl]]){if(!url)continue;const a=el('a',label);a.href=url;a.target='_blank';a.rel='noopener';links.append(a,document.createTextNode('  '))}copy.append(links);
const choice=el('div',undefined,'choice'),label=el('label','Migration decision'),select=el('select');select.id='decision-'+p.id.replaceAll('/','-');select.setAttribute('aria-label','Decision for '+p.title);label.htmlFor=select.id;for(const value of statuses){const o=el('option',value);o.value=value;select.append(o)}select.value=statuses.includes(saved(p).decision)?saved(p).decision:'unreviewed';const notes=el('textarea');notes.value=saved(p).notes;notes.placeholder='What to change, keep, or check';notes.setAttribute('aria-label','Notes for '+p.title);select.addEventListener('change',()=>{decisions[p.id]={decision:select.value,notes:notes.value};persist();counts();if(status)render()});notes.addEventListener('input',()=>{decisions[p.id]={decision:select.value,notes:notes.value};persist()});choice.append(label,select,notes);row.append(copy,choice);list.append(row)}if(!visible.length)list.append(el('p','No matching pieces.','empty'));counts()}
for(const id of ['search','collection','status'])document.getElementById(id).addEventListener(id==='search'?'input':'change',render);
document.getElementById('revision').textContent='Source revision: '+data.sourceRevision+' · No post bodies have been imported into the portfolio.';
document.getElementById('export').addEventListener('click',()=>{const output={sourceRepository:data.sourceRepository,sourceRevision:data.sourceRevision,decisions:posts.map(p=>({id:p.id,title:p.title,...saved(p)}))};const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download='blog-decisions.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});render();
</script></body></html>'''
(OUT / "index.html").write_text(template.replace("__PAYLOAD__", payload))
print(json.dumps({"posts": len(posts), "technical": sum(p["collection"] == "blog" for p in posts),
                  "writeups": sum(p["collection"] == "writeups" for p in posts),
                  "drafts": sum(p["legacyDraft"] for p in posts),
                  "pairs": sum(bool(p.get("companion")) for p in posts),
                  "review": str(OUT / "index.html")}, indent=2))
