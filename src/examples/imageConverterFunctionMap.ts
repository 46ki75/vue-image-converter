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
