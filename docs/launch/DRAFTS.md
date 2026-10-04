# Launch drafts — DO NOT PUBLISH YET

Status: drafts for review. Order of publishing is the author's call.
Suggested sequence: Dev.to (Tue) → Show HN (Wed/Thu 14:00–16:00 UTC) → X thread same day as HN → Reddit the day after.

Before posting anything:
- [ ] Replace `PLACEHOLDER` Tally URL in `index.html` and `README.md`
- [ ] Verify Kuula / Matterport current pricing (numbers below are from memory)
- [ ] Confirm `https://davidmajzik.github.io/statictour/` and `/editor.html` load
- [ ] Do one full round-trip yourself in the hosted editor on a fresh browser profile

---

## 1. Hacker News — Show HN

**Title** (≤ 80 chars, no marketing adjectives, HN strips them anyway):

> Show HN: StaticTour – 360° virtual tours as static files, no cloud, no subscription

Alt titles:
> Show HN: A 360° tour editor that outputs a folder you host yourself
> Show HN: Self-hosted virtual tours (Pannellum editor, exports a ZIP)

**URL:** `https://github.com/DavidMajzik/statictour`
(Link the repo, not the landing page. HN readers trust a README more than a landing page, and stars are the metric.)

**First comment** (post immediately after submitting — this is what people actually read):

> I built this for a nursing home that wanted a virtual walk-through on their website without a monthly bill. Every product I looked at (Kuula, Matterport, Theasys, Lapentor) is a hosted subscription: the tour lives on their servers and dies when you stop paying. For a place that needs one tour to keep working for five years, that's the wrong model.
>
> So: the editor is a single 40 KB HTML file built on Pannellum. You drop in equirectangular panoramas, click doors to place arrows, pick an entry view per room, and download a ZIP. The ZIP is `index.html` + Pannellum (vendored) + `tour.json` + the images. Upload the folder anywhere that serves static files. No runtime dependencies, no tracking, no API keys. The images are resized and re-encoded in the browser; nothing is uploaded anywhere during editing.
>
> Live example (the nursing home, 17 rooms): https://www.tamaszotthon.hu/virtualis-seta
> Editor, hosted on GitHub Pages: https://davidmajzik.github.io/statictour/editor.html
>
> Things I'd like to hear about:
> - Is the "download a folder" workflow acceptable to non-technical users, or is that already too much? My test user (a 60-year-old office manager) managed with cPanel, but that's n=1.
> - I'm considering a hosted version at €0.50/tour for people who don't want a repo. Same output. Is per-tour pricing sane for this, or does everyone just expect a subscription?
>
> MIT licensed. Keep it, fork it, sell tours made with it.

**Tone notes:** no exclamation marks, no "excited to share", no emojis. Lead with the problem. Admit n=1. Ask two concrete questions. Don't mention Vatidator unless asked.

**Reply templates for predictable comments:**

- *"Why not just use Pannellum directly?"* → You can; Pannellum has no editor though. The config JSON with yaw/pitch per hotspot is the painful part. This is the editor + packaging. If you're comfortable writing the JSON by hand, you don't need this.
- *"Why would anyone pay €0.50 for an MIT repo?"* → They wouldn't, and that's fine. The hosted version is for the dentist who doesn't know what a repo is. Open core; the free part is genuinely complete.
- *"Matterport does 3D scanning, this is just panoramas."* → Correct. This is the Google-Street-View style, not a 3D mesh. Different product, different price point (zero).
- *"What about info hotspots / floor plans?"* → Not yet. On the roadmap if people want them. Open an issue.
- *"CDN dependency in the editor?"* → Yes, the editor loads Pannellum and JSZip from a CDN. The *exported tour* has zero external requests. Vendoring into the editor is a one-line change if that matters to you.

---

## 2. Dev.to article

**Title:** I built a 360° virtual tour maker for a nursing home. Now it's open source.

**Tags:** `#javascript` `#opensource` `#webdev` `#showdev`

**Cover image:** `docs/live-tour.jpg`

---

A nursing home in my town asked me for a "virtual walk-through" on their website. Their reasoning was simple: families choosing a care home want to see the rooms before they visit, and the home didn't have a budget for a photographer every year.

I did what everyone does: googled "virtual tour software". Kuula, Matterport, Theasys, Lapentor, 3DVista. All of them good. All of them a monthly subscription where the tour lives on the vendor's servers.

That's wrong for this customer. A nursing home needs a tour that works for five years with zero maintenance. They are not going to log into a SaaS dashboard. They are definitely not going to notice the card expired and the tour went dark.

So I built something that outputs a folder.

## What it does

StaticTour is a single HTML file (~40 KB) that runs in your browser:

1. Drop in 360° panoramas (equirectangular JPG/PNG, 2:1 aspect ratio, straight from a Ricoh Theta or Insta360).
2. Click on a door, pick which room it leads to. Repeat. Set the entry view for each room.
3. Download `tour.zip`.

The ZIP contains `index.html`, Pannellum (vendored), `tour.json`, and the images. Unzip it, upload the folder to any static host, open `/tour/`. That's the product.

Here's the nursing home's tour, 17 rooms, running from a cheap shared host: https://www.tamaszotthon.hu/virtualis-seta

## What's inside

The whole thing is vanilla JS, no framework, no bundler. The only "build step" is a 12-line Node script that inlines the viewer template into the editor so the editor stays one file.

A few things that turned out to matter:

**Client-side image processing.** 360° cameras produce 8192×4096 JPGs at 10+ MB each. The editor draws them onto a canvas at 6144 px wide (2 × 4096, the safe WebGL texture limit on older phones) and re-encodes at 85% quality. A 17-room tour lands around 30 MB total. Nothing is uploaded during editing – `createImageBitmap` + `canvas.toBlob` do all the work locally.

**Thumbnails cropped from the entry view.** The strip at the bottom shows a thumbnail per room. Cropping the panorama at yaw 0 gives you a random wall. Cropping it at the entry view the author chose gives you the view the visitor will actually see when they arrive. The panorama is drawn three times side by side so the crop wraps around the seam.

**Round-trip editing.** `tour.json` is the full editor state, so you can re-open any exported ZIP, add rooms, move arrows, and export again. The nursing home did exactly that two weeks after launch.

**Reachability check.** Breadth-first search from the start room over the arrow graph. Rooms you can't reach get a warning. Trivial to implement, caught a real mistake on the first tour.

**Cache busting.** Every export stamps a version into the image URLs. Without this, re-uploading an edited tour shows visitors the old images for a day.

## Pannellum does the heavy lifting

The WebGL viewer is [Pannellum](https://pannellum.org/) by Matthew Petroff. It's MIT, it's 100 KB, it handles touch, gyroscope, fullscreen and keyboard. StaticTour is the editor and packaging around it. If you're happy writing Pannellum's scene config JSON by hand, you don't need StaticTour at all.

## Pricing (the honest version)

The repo is MIT. Free, fork it, sell tours made with it to your clients.

I'm considering a hosted version for people who don't want to touch a repo: open a link, build the tour, pay €0.50 per export. No subscription. Same self-hosted output. There's a waitlist on the [landing page](https://davidmajzik.github.io/statictour/) – I'll build it if enough people sign up, and I'll leave it alone if they don't.

## Try it

- Editor (runs in your browser, nothing uploaded): https://davidmajzik.github.io/statictour/editor.html
- Repo: https://github.com/DavidMajzik/statictour
- Live tour: https://www.tamaszotthon.hu/virtualis-seta

If you build one, I'd like to see it.

---

## 3. X / Twitter thread

**1/**
I built a 360° virtual tour maker for a nursing home because every existing product is a $20/month subscription where the tour lives on someone else's server.

It outputs a folder. You host it. It's open source now.

🧵

**2/**
The problem: a care home, a dentist, a church, a small hotel needs ONE tour that keeps working for 5 years.

Kuula, Matterport, Theasys all stop working the day the card expires. That's not a feature these customers want.

**3/**
StaticTour is a single 40 KB HTML file.

→ drop in 360° panoramas
→ click doors, place arrows
→ download tour.zip

Unzip, upload to any static host. Done. No account, no API key, no tracking.

[screenshot: docs/live-tour.jpg]

**4/**
Built on Pannellum (MIT, WebGL, 100 KB). Images are resized in the browser with canvas – nothing is uploaded during editing.

Live example, 17 rooms, served from a cheap shared host:
https://www.tamaszotthon.hu/virtualis-seta

**5/**
It's MIT. Use it for clients. Fork it. Rebrand it.

Repo: https://github.com/DavidMajzik/statictour
Editor: https://davidmajzik.github.io/statictour/editor.html

**6/**
Thinking about a hosted version at €0.50 per tour (no subscription) for people who don't want a repo.

If that sounds useful, there's a waitlist. If nobody signs up, the free repo stays and I go back to my day job.

https://davidmajzik.github.io/statictour/

**Notes:** post 3/ with the image attached. Pin the thread. Reply to yourself with the HN link once it's up.

---

## 4. Reddit

### r/webdev

**Title:** I open-sourced a 360° virtual tour editor that exports static files (no SaaS, no subscription)

**Body:**

Built this for a nursing home client who wanted a virtual walk-through without a monthly fee. Every product on the market (Kuula, Matterport, Theasys…) is a hosted subscription, so I wrote an editor that outputs a folder instead.

- Single 40 KB HTML file, vanilla JS, built on Pannellum
- Drop in equirectangular panoramas, click doors to place arrows, download a ZIP
- ZIP = `index.html` + Pannellum + `tour.json` + images. Upload anywhere static. Zero runtime deps, zero tracking.
- Images resized client-side, nothing uploaded during editing
- Re-open the ZIP later to edit

Live example (17 rooms): https://www.tamaszotthon.hu/virtualis-seta
Repo (MIT): https://github.com/DavidMajzik/statictour
Hosted editor: https://davidmajzik.github.io/statictour/editor.html

If you do client work and have ever been asked for a "virtual tour", I'd like to know whether the download-a-folder workflow is something you'd actually hand to a client, or whether you'd want it hosted.

### r/SideProject (or r/sidehustle — check rules first, r/sidehustle bans self-promo in some forms)

**Title:** Open-sourced my client project as a tool: self-hosted 360° virtual tours, considering €0.50/tour hosted version

**Body:**

Made a 360° tour editor for a nursing home client. It exports a static folder you upload to your own server — no subscription, which is the opposite of everything else in this space (Kuula $16+/mo, Matterport $10+/mo).

Released the repo as MIT this week. The free version is complete, not crippled.

Next step I'm weighing: a hosted version at €0.50 per exported tour (or €9.99/mo unlimited for agencies). Target is freelance web devs who get asked for "a virtual tour" once a year and don't want another subscription.

Repo: https://github.com/DavidMajzik/statictour
Landing + waitlist: https://davidmajzik.github.io/statictour/

Question for this sub: is per-tour micro-pricing something you'd trust, or does it feel like a trap compared to a flat monthly fee?

**Notes:** Reddit hates links-only posts. Both bodies end with a real question. Reply to every comment in the first 2 hours.
