import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";
const htmlPath=new URL("../src/index.html",import.meta.url);
test("identidad aprobada y cotización asistida",async()=>{
 const html=await readFile(htmlPath,"utf8");
 assert.match(html,/Impulsamos lo que/);
 assert.match(html,/te hace <em>crecer\.<\/em>/);
 assert.match(html,/https:\/\/wa\.me\/c\/59169715194/);
 assert.equal((html.match(/class="family"/g)||[]).length,6);
 assert.doesNotMatch(html,/Tigre|distribuidor autorizado|mejores precios|\bNIT\b/iu);
 for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.match(html,new RegExp('id="'+id+'"'));
 for(const [,path] of html.matchAll(/(?:src|href)="(assets\/[^"]+|styles\.css)"/g))await access(new URL("../src/"+path,import.meta.url));
 assert.match(html,/Precio, presentación, compatibilidad y disponibilidad se confirman/);
});
