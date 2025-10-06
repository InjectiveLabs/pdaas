# 🌟 Injective Helix

_Helix | The Premier Decentralized Spot and Derivatives Exchange_

[Get a taste of the UI](https://helixapp.com)

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

The `injective-helix` UI is built using Nuxt and TailwindCSS and is powered by the [injective-ts monorepo](https://github.com/InjectiveLabs/injective-ts/). This repo vendors the shared `injective-ui` layer for a smooth, self‑contained local development experience while retaining upstream Injective compatibility.

You can always boot the dex locally on your own laptop without having to set up a relayer. You can use the `public` network in your `VITE_NETWORK` `.env` configuration variable and run the `yarn run dev` command. You can find all of the available networks (i.e - predefined set of endpoints) [here](https://github.com/InjectiveLabs/injective-ts/blob/17b1aa5df39d5724baf6262b276980cf722a1cba/packages/networks/src/types.ts#L1). Using these endpoints (from the `public`) network gives the 40% of the trading fees to the community spend pool.

### Deployment

The `injective-helix` uses AWS for deployment. There is a CD pipeline set in the `.github/workflow/mainnet.yml` file. Deployment to AWS is done to a S3 bucket which is served through Cloudfront to the end user. Using `yarn generate` we are generating static html pages that are served through cloud front.

More details about how to deploy a Nuxt project can be found on their docs.

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
- Telegram at <a href="https://t.me/helixapp" target="_blank">`Helix Telegram`</a>

---

## 🔓 License

Copyright © 2021 - 2024 Injective Foundation (https://injectivelabs.org/)

<a href="https://iili.io/mNneZN.md.png"><img src="https://iili.io/mNneZN.md.png" style="width: 300px; max-width: 100%; height: auto" />

Originally released by Injective Foundation under: <br />
Apache License <br />
Version 2.0, January 2004 <br />
http://www.apache.org/licenses/

<p>&nbsp;</p>
<div align="center">
  <sub><em>Powering the future of decentralized finance.</em></sub>
</div>
