import * as Comlink from "comlink";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const api = Comlink.wrap<{
  init(): Promise<void>;
  png(bytes: Uint8Array): Promise<Uint8Array>;
  jpeg(bytes: Uint8Array): Promise<Uint8Array>;
  bmp(bytes: Uint8Array): Promise<Uint8Array>;
  webp(bytes: Uint8Array): Promise<Uint8Array>;
}>(worker);

const replaceExtension = (path: string, newExt: string): string => {
  const ext = newExt.startsWith(".") ? newExt : "." + newExt;
  const index = path.lastIndexOf(".");
  if (index === -1 || path.slice(index).includes("/")) {
    return path + ext;
  }
  return path.slice(0, index) + ext;
};

const toBmp = async (file: File): Promise<File> => {
  await api.init();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const uint8array = await api.bmp(bytes);
  const blob = new Blob([uint8array], { type: "image/bmp" });
  const newFileName = replaceExtension(file.name, "bmp");
  const result = new File([blob], newFileName, { type: "image/bmp" });
  return result;
};

const toJpeg = async (file: File): Promise<File> => {
  await api.init();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const uint8array = await api.jpeg(bytes);
  const blob = new Blob([uint8array], { type: "image/jpeg" });
  const newFileName = replaceExtension(file.name, "jpg");
  const result = new File([blob], newFileName, { type: "image/jpeg" });
  return result;
};

export const toPng = async (file: File): Promise<File> => {
  await api.init();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const uint8array = await api.png(bytes);
  const blob = new Blob([uint8array], { type: "image/png" });
  const newFileName = replaceExtension(file.name, "png");
  const result = new File([blob], newFileName, { type: "image/png" });
  return result;
};

const toWebp = async (file: File): Promise<File> => {
  await api.init();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const uint8array = await api.webp(bytes);
  const blob = new Blob([uint8array], { type: "image/webp" });
  const newFileName = replaceExtension(file.name, "webp");
  const result = new File([blob], newFileName, { type: "image/webp" });
  return result;
};

export type ImageFormat = "BMP" | "JPEG" | "PNG" | "WEBP";

export const convertImageWithWebWorker = async ({
  file,
  format,
}: {
  file: File;
  format: ImageFormat;
}): Promise<File> => {
  switch (format) {
    case "BMP": {
      return await toBmp(file);
    }

    case "JPEG": {
      return await toJpeg(file);
    }

    case "PNG": {
      return await toPng(file);
    }

    case "WEBP": {
      return await toWebp(file);
    }
  }
};
