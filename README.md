# 🌟 PDAAS

_Powered by Injective — Decentralized Spot and Derivatives Exchange UI_

![Injective Logo](public/icon.svg)

## ✨ Features

- Modern and intuitive design
- Trade with ease and flexibility
- Latest development and security practices
- Awesome to use!

---

## 📚 Getting Started

This repository is self‑contained and vendors the shared `injective-ui` layer, so you can run it without fetching external layers.

1. Clone the repository

```bash
git clone git@github.com:InjectiveLabs/pdaas.git
cd pdaas
yarn
```

2. Optional: copy environment variables template and adjust values

```bash
cp .env.example .env
```

3. Run the app locally (uses the vendored Injective UI layer)

```bash
LOCAL_LAYER=true PORT=3000 HOST=0.0.0.0 yarn dev
```

Notes:
- `LOCAL_LAYER=true` forces Nuxt to use the vendored `injective-ui` layer in this repo instead of fetching `github:InjectiveLabs/injective-ui/layer#master`.
- You can omit `PORT`/`HOST` if you prefer defaults; they are shown here to bind on `http://localhost:3000`.
- If you previously saw “Cannot extend config from github:InjectiveLabs/injective-ui/layer#master”, ensure `LOCAL_LAYER=true` is set when running locally.

## 📖 Documentation

This project is built using Nuxt and TailwindCSS and is powered by the [injective-ts monorepo](https://github.com/InjectiveLabs/injective-ts/). It vendors the shared `injective-ui` layer for a smooth, self‑contained local development experience while retaining upstream Injective compatibility.

You can run the app locally without having to set up a relayer. Use the `public` network in your `VITE_NETWORK` `.env` configuration variable and run `yarn dev`. You can find available networks (predefined endpoint sets) [here](https://github.com/InjectiveLabs/injective-ts/blob/17b1aa5df39d5724baf6262b276980cf722a1cba/packages/networks/src/types.ts#L1). Using these endpoints (from the `public` network) gives 40% of trading fees to the community spend pool.

### Deployment

You can deploy this Nuxt 3 app using your preferred provider (Vercel, Netlify, Cloudflare Pages, or AWS S3/CloudFront). For static sites, use `yarn generate`; for server rendering, use `nuxi build` and your platform's adapter.

See the official Nuxt docs for deployment guides.

### Nuxt3

This project runs on Nuxt 3. You shouldn’t need any migration steps; just follow the Getting Started section above.

---

## ⛑ Support

Reach out to us at one of the following places!

- Website at <a href="https://injective.com" target="_blank">`injective.com`</a>
- Website at <a href="https://injectivelabs.org" target="_blank">`injectivelabs.org`</a>
- Twitter at <a href="https://twitter.com/Injective_" target="_blank">`@Injective`</a>
- Twitter at <a href="https://twitter.com/InjectiveLabs" target="_blank">`@InjectiveLabs`</a>
- Discord at <a href="https://discord.com/invite/NK4qdbv" target="_blank">`Injective Discord`</a>
- Telegram at <a href="https://t.me/joininjective" target="_blank">`Injective Telegram`</a>


---

## 🔓 License

Copyright © 2021 - 2025 Injective Foundation (https://injectivelabs.org/)

<img src="public/icon.svg" alt="Injective" style="width: 120px; max-width: 100%; height: auto" />

Originally released by Injective Foundation under: <br />
Apache License <br />
Version 2.0, January 2004 <br />
http://www.apache.org/licenses/

<p>&nbsp;</p>
<div align="center">
  <sub><em>Powering the future of decentralized finance.</em></sub>
</div>
