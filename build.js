// Build script: inlines the viewer template into a single, self-contained editor.html.
// Run: node build.js
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'src', 'editor.src.html'), 'utf8');
const tpl = fs.readFileSync(path.join(__dirname, 'src', 'viewer-template.html'), 'utf8');
// Escape "</" and "<!--" so the template can live inside a <script> block as a JS string literal
// without the HTML parser closing the script early.
const literal = JSON.stringify(tpl).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');
const out = src.replace('__VIEWER_TEMPLATE__', () => literal);
if (out === src) throw new Error('Placeholder __VIEWER_TEMPLATE__ not found in src/editor.src.html');
fs.writeFileSync(path.join(__dirname, 'editor.html'), out);
console.log('OK → editor.html (' + Math.round(out.length / 1024) + ' KB)');
