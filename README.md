# Web Image Converter

This repository provides an implementation example of [web-image-converter](https://www.npmjs.com/package/web-image-converter), which enables client-side image conversion using WebAssembly—without the need for a server.

The project is published as a library mainly for personal use, driven by my preference for modularization and generalization. It's not intended for production-scale use, but rather as a personal utility.

## ⚠️ Web Worker & Vite Limitation

When loading a Web Worker script via `new Worker()`, Vite resolves TypeScript files automatically during development. However, this resolution **does not work correctly when building a library**—the paths break during production bundling.

To address this, both the **Web Worker script** and the **WASM module** used by `web-image-converter` must be **injected externally**. As a result, `web-image-converter` is not strictly required—any module implementing the same interface can be passed to the composition function `useImageConverter`.

---

## Usage

### Install External Dependencies

Install the following packages:

- `vue-image-converter`: A high-level wrapper for image conversion
- `comlink`: Simplifies message-passing with Web Workers
- `web-image-converter`: The WebAssembly-based image conversion engine

```bash
npm i vue-image-converter comlink web-image-converter
```

---

### Create a Web Worker Script

Create a file at `src/worker.ts`. This is the code that will run inside the Web Worker:

```ts
import * as Comlink from "comlink";
import init, { png, jpeg, webp, bmp } from "web-image-converter";

let initialized: boolean = false;

const workerApi = {
  async init() {
    if (!initialized) {
      await init();
      initialized = true;
    }
  },
  async png(bytes: Uint8Array): Promise<Uint8Array> {
    await workerApi.init();
    return png().convert(bytes);
  },
  async jpeg(bytes: Uint8Array): Promise<Uint8Array> {
    await workerApi.init();
    return jpeg().quality(80).convert(bytes);
  },
  async webp(bytes: Uint8Array): Promise<Uint8Array> {
    await workerApi.init();
    return webp().convert(bytes);
  },
  async bmp(bytes: Uint8Array): Promise<Uint8Array> {
    await workerApi.init();
    return bmp().convert(bytes);
  },
};

Comlink.expose(workerApi);
```

---

### Load and Wrap the Worker

In `src/imageConverterFunctionMap.ts`, load the Web Worker using Vite’s native `new URL()` support. Vite will automatically resolve and bundle the TypeScript worker correctly in development.

```ts
import * as Comlink from "comlink";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

export const imageConverterFunctionMap = Comlink.wrap<{
  init(): Promise<void>;
  png(bytes: Uint8Array): Promise<Uint8Array>;
  jpeg(bytes: Uint8Array): Promise<Uint8Array>;
  bmp(bytes: Uint8Array): Promise<Uint8Array>;
  webp(bytes: Uint8Array): Promise<Uint8Array>;
}>(worker);
```

---

### Use the Composable in Vue

Pass the `imageConverterFunctionMap` to the `ImageConverter` component or the `useImageConverter` composable.

```vue
<template>
  <ImageConverter :imageConverterFunctionMap="imageConverterFunctionMap" />
</template>

<script setup lang="ts">
import { ImageConverter } from "vue-image-converter";
import { imageConverterFunctionMap } from "./imageConverterFunctionMap";
</script>
```

---

### Vite WASM Handling in Dev

During development, Vite sometimes fails to serve `.wasm` files with the correct MIME type, resulting in an HTML response instead of binary. To avoid this, exclude `web-image-converter` from Vite’s dependency optimization. This workaround is unnecessary in production, as long as the `.wasm` file is properly hosted and the path is correct.

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ["web-image-converter"],
  },
});
```
