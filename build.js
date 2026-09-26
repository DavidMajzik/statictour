// A szerkesztő összeállítása: a néző-sablont beleégeti egyetlen, önálló szerkeszto.html-be.
// Futtatás: node build.js
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'src', 'szerkeszto.src.html'), 'utf8');
const tpl = fs.readFileSync(path.join(__dirname, 'src', 'nezo-sablon.html'), 'utf8');
const literal = JSON.stringify(tpl).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');
const out = src.replace('__VIEWER_TEMPLATE__', () => literal);
if (out === src) throw new Error('Hiányzik a __VIEWER_TEMPLATE__ helyőrző');
fs.writeFileSync(path.join(__dirname, 'szerkeszto.html'), out);
console.log('OK → szerkeszto.html (' + Math.round(out.length / 1024) + ' KB)');
