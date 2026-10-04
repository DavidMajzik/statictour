# StaticTour

**Build a 360° virtual tour in your browser. Download a folder. Upload it anywhere. Done.**

No account. No cloud. No monthly fee. The tour is a handful of static files that live on *your* server, forever.

[![Live demo](docs/live-tour.jpg)](https://www.tamaszotthon.hu/virtualis-seta)

**[▶ Live demo](https://www.tamaszotthon.hu/virtualis-seta)** – a real nursing home in Hungary, 17 rooms, built with this editor and served as plain static files from a cheap shared host. &nbsp;·&nbsp; **[🧭 Open the editor](https://davidmajzik.github.io/statictour/editor.html)** – runs entirely in your browser, nothing is uploaded.

---

## Why this exists

Every virtual tour product on the market is a hosted SaaS: Kuula ($16–29/mo), Matterport ($10–69/mo), Theasys, Lapentor, 3DVista… You pay every month, your tour lives on their servers, and if you stop paying – or they shut down – it's gone. For a hotel, a dentist, a church, a nursing home or an art gallery that needs *one tour that works for five years*, that model is wrong.

StaticTour is the opposite:

| | Hosted SaaS tours | StaticTour |
|---|---|---|
| Where does the tour live? | Their cloud | **Your server** (any static host) |
| Monthly fee | $10–70 | **$0** |
| Account required | Yes | **No** |
| Works if the vendor disappears | No | **Yes** – it's just HTML + JPG |
| Your images uploaded to a third party | Yes | **Never** – everything happens in your browser |
| Embed on your site | iframe to their domain | iframe to **your own** `/tour/` folder |
| Tracking / analytics scripts injected | Usually | **None** |

It was built for a nursing home that didn't want a subscription. Then it turned out that's what most small businesses want.

## How it works

1. **Drop in your 360° panoramas** – equirectangular JPG/PNG (2:1 aspect ratio, straight from a Ricoh Theta, Insta360, GoPro Max or any 360° camera app). Images are resized to 6144 px and re-encoded in the browser; nothing leaves your machine.
2. **Place arrows** – click on a door, pick which room it leads to. Set the entry view for each room. Built-in checks warn you about unreachable rooms.
3. **Download `tour.zip`** – unzip it, upload the `tour/` folder to your web server (FTP, cPanel, Netlify drop, GitHub Pages, S3, whatever). Open `/tour/`. That's the tour.

The ZIP is self-contained: `index.html` (viewer), `pannellum.js` + `pannellum.css` (vendored, no CDN at runtime), `tour.json` (the data – re-open it in the editor to keep editing), `images/` (panoramas + thumbnails).

## Features

- **Zero backend** – editor and viewer are plain HTML + vanilla JS. No build step for users, no npm, no framework.
- **Self-hosted output** – the exported tour has no external requests at all. Works offline, works on an intranet, works from a USB stick.
- **Mobile-first viewer** – touch to look around, gyroscope support, thumbnail strip, full-screen, pinch zoom.
- **Keyboard accessible** – arrow keys to pan, thumbnails are real `<button>`s with labels.
- **Embed-ready** – the editor hands you a responsive `<iframe>` snippet after export. When embedded, the viewer shows an "open full screen" link.
- **Round-trip editing** – re-open any exported `tour.zip` in the editor, add rooms, move arrows, export again. Cache-busting version stamp on every export so visitors never see stale images.
- **Sanity checks** – warns about rooms with no arrows and rooms you can't reach from the start room.
- **One file** – the whole editor is a single 40 KB `editor.html`. Fork it, rebrand it, ship it to your client.

## Quick start

**Just use it:** open **[the hosted editor](https://davidmajzik.github.io/statictour/editor.html)**. It's the same file as in this repo, served from GitHub Pages.

**Run it locally:**

```bash
git clone https://github.com/DavidMajzik/statictour.git
cd statictour
node build.js        # inlines src/viewer-template.html into editor.html
# then open editor.html in a browser – that's it
```

The editor needs an internet connection only to load Pannellum and JSZip from a CDN (and to vendor Pannellum into your ZIP on export). Your images never go anywhere.

**Repo layout:**

| Path | What |
|---|---|
| `editor.html` | The built, self-contained editor (generated – don't edit by hand) |
| `src/editor.src.html` | Editor source |
| `src/viewer-template.html` | The viewer that ends up as `index.html` inside every exported tour |
| `build.js` | 12-line build script: merges the template into the editor |
| `index.html` | Landing page (GitHub Pages) |
| `docs/` | Screenshots |

## Pricing

**This repo is free and MIT-licensed. Use it, fork it, sell tours made with it. No strings.**

A hosted version is coming for people who don't want to touch a repo: open a link, build the tour, pay **€0.50 per exported tour** – or €4.50 for 10, €6 for 20, €9.99/month if you build tours for a living. No subscription required for the one-off prices. Same self-hosted output, same "it lives on your server" promise.

**[→ Join the waitlist](https://tally.so/r/PLACEHOLDER)** if that sounds useful. I'll ship it if enough people want it.

## Tech stack

- [Pannellum](https://pannellum.org/) 2.5.6 – the WebGL panorama viewer (MIT)
- [JSZip](https://stuk.github.io/jszip/) 3.10 – ZIP creation in the browser (MIT)
- Canvas API for client-side resizing / thumbnail crops
- Vanilla JS, no framework, no bundler. `build.js` is the only Node usage and it's 12 lines.

## Roadmap

Depends entirely on whether anyone besides me wants this. Candidates, in rough order:

- [ ] Info hotspots (text / image popups on a panorama)
- [ ] Floor plan overlay with "you are here"
- [ ] Custom accent colour + logo in the export
- [ ] Hosted editor with per-tour pricing (see above)
- [ ] WordPress plugin

Open an issue if you need one of these – or something else.

## Contributing

PRs welcome. Keep it dependency-free and keep `editor.html` a single file. Run `node build.js` after editing anything in `src/`.

## Credits

- [Matthew Petroff](https://mpetroff.net/) for Pannellum
- [Stuart Knightley](https://github.com/Stuk) for JSZip
- [TÁMASZ Idősek Otthona](https://www.tamaszotthon.hu) for being the first real-world tour

## License

[MIT](LICENSE) © 2026 Dávid Majzik
