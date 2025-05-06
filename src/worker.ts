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
    return jpeg().convert(bytes);
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
