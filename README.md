# 360 túra app

Virtuális séta (360°-os „room tour”) készítő a [tamaszotthon.hu](https://www.tamaszotthon.hu) weboldalhoz.
Havidíj és külső szolgáltató nélkül: a kész túra a saját tárhelyen fut ([Pannellum](https://pannellum.org) nézővel).

## Használat

1. Nyisd meg dupla kattintással a **`szerkeszto.html`**-t (internet kell hozzá).
2. Húzd be a 360°-os képeket (2:1 arányú JPG/PNG), nevezd át a helyiségeket.
3. **➕ Nyíl elhelyezése** → kattints az ajtóra → válaszd ki, hova vezessen.
   **📷 Belépési nézet** → ebbe az irányba néz a látogató, amikor belép.
4. **💾 Kész túra letöltése** → `seta.zip`
5. cPanel → Fájlkezelő → `public_html` → Feltöltés → jobb klikk a zip-en → Kibontás.
   A túra: `https://www.tamaszotthon.hu/seta/`

A `seta.zip`-et tartsd meg: a **📂 Korábbi túra megnyitása** gombbal visszatölthető és szerkeszthető.

### Beágyazás egy oldalba

```html
<div style="position:relative;width:100%;aspect-ratio:16/9;min-height:380px;border-radius:12px;overflow:hidden;">
  <iframe src="/seta/" title="Virtuális séta" style="position:absolute;inset:0;width:100%;height:100%;border:0;"
          allow="fullscreen; gyroscope; accelerometer" allowfullscreen loading="lazy"></iframe>
</div>
```

## Felépítés

| Fájl | Mi ez |
|---|---|
| `szerkeszto.html` | A kész, önálló szerkesztő (**generált**, ne kézzel szerkeszd) |
| `src/szerkeszto.src.html` | A szerkesztő forrása |
| `src/nezo-sablon.html` | A látogatói néző sablonja (ebből lesz a zip-ben az `index.html`) |
| `build.js` | Összeállítja a `szerkeszto.html`-t: `node build.js` |

A letöltött `seta.zip` tartalma: `index.html` (néző, a túra adataival), `pannellum.js/css`,
`tura.json` (a szerkesztő ebből nyitja vissza), `kepek/` (6144 px-es panorámák + sáv-bélyegképek).

Technikai részletek: a képek 6144 px szélesre kicsinyítve (2× 4096 textúra → régebbi telefonokon is megy),
JPEG 85%; a verziószám minden letöltéskor változik, így a böngésző-gyorsítótár nem mutat régi képet.
