# the Apate Project
A browser-based realtime image process application.

## ⚠️ Warning
This is an **experimental** project and is still in development. BUGs may exist. APIs and features may change.

## Technologies
This project is based on those technologies:
* [Rust](https://www.rust-lang.org/)
* [WebAssembly](https://webassembly.org/)
* [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)
* [TypeScript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Mobx](https://mobx.js.org/README.html)

## Preview

![](https://pic.downk.cc/item/5e21c12f2fb38b8c3c414550.png)
![](https://pic.downk.cc/item/5e21c12f2fb38b8c3c414552.png)
![](https://pic.downk.cc/item/5e21c12f2fb38b8c3c414554.png)
![](https://pic.downk.cc/item/5e21c12f2fb38b8c3c414556.png)

## Features
- [ ] Basic features
    - [ ] Import images
    - [x] Using example image
    - [ ] Export image
    - [ ] Save image locally
    - [ ] History
    - [ ] Save edit config locally
    - [ ] Export edit config
    - [ ] Crop image
    - [x] RGB Histogram

- [ ] Image edit
    - [x] Saturation
    - [x] Vibrance
    - [x] Color Temperature
    - [x] Tint
    - [x] Brightness
    - [x] Exposure
    - [x] Contrast
    - [ ] Highlight
    - [ ] Shadow
    - [ ] HSL & HSV
    - [ ] Alpha

- [ ] Curve support
    - [ ] RGB curve
    - [ ] HSL & HSV curve

- [ ] Filter & Lookup-table support
    - [x] Built-in filters
    - [x] Save built-in filters locally
    - [x] Parse Adobe cube 3D lut
    - [x] Apply lut
    - [x] Generate filter's snapshots for preview
    - [ ] Import lut
    - [ ] Export lut
    - [ ] Save imported lut locally

- [ ] Performance optimization
    - [ ] Multi threads
    - [ ] Shared memory
