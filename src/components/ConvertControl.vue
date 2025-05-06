<template>
  <div :class="$style.container">
    <ElmButton
      v-for="format in formats"
      :key="format"
      block
      :disabled="loading || files.length === 0"
      @click="handleConvert(format)"
    >
      <ElmMdiIcon :d="mdiImageSync" color="gray" size="1.25rem" />
      <ElmInlineText :text="format" />
    </ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmButton, ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiImageSync } from "@mdi/js";

import * as Comlink from "comlink";

const worker = new Worker(new URL("../worker.ts", import.meta.url), {
  type: "module",
});

const api = Comlink.wrap<{
  init(): Promise<void>;
  png(bytes: Uint8Array): Promise<Uint8Array>;
  jpeg(bytes: Uint8Array): Promise<Uint8Array>;
  bmp(bytes: Uint8Array): Promise<Uint8Array>;
  webp(bytes: Uint8Array): Promise<Uint8Array>;
}>(worker);

type ImageFormat = "BMP" | "JPEG" | "PNG" | "WEBP";

const formats: ImageFormat[] = ["BMP", "JPEG", "PNG", "WEBP"] as const;

const loading = defineModel<boolean>("loading", { default: false });

const files = defineModel<File[]>("files", { default: [] });

const convertedFiles = defineModel<File[]>("convertedFiles", { default: [] });

const replaceExtension = (path: string, newExt: string): string => {
  const ext = newExt.startsWith(".") ? newExt : "." + newExt;
  const index = path.lastIndexOf(".");
  if (index === -1 || path.slice(index).includes("/")) {
    return path + ext;
  }
  return path.slice(0, index) + ext;
};

const handleConvert = async (format: ImageFormat) => {
  if (files.value.length === 0) return;

  loading.value = true;
  convertedFiles.value = [];

  try {
    await api.init();

    switch (format) {
      case "BMP": {
        for (const file of files.value) {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const uint8array = await api.bmp(bytes);
          const blob = new Blob([uint8array], { type: "image/bmp" });
          const newFileName = replaceExtension(file.name, "bmp");
          const result = new File([blob], newFileName, { type: "image/bmp" });
          convertedFiles.value.push(result);
        }
        break;
      }

      case "JPEG": {
        for (const file of files.value) {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const uint8array = await api.jpeg(bytes);
          const blob = new Blob([uint8array], { type: "image/jpeg" });
          const newFileName = replaceExtension(file.name, "jpg");
          const result = new File([blob], newFileName, { type: "image/jpeg" });
          convertedFiles.value.push(result);
        }
        break;
      }

      case "PNG": {
        for (const file of files.value) {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const uint8array = await api.png(bytes);
          const blob = new Blob([uint8array], { type: "image/png" });
          const newFileName = replaceExtension(file.name, "png");
          const result = new File([blob], newFileName, { type: "image/png" });
          convertedFiles.value.push(result);
        }
        break;
      }

      case "WEBP": {
        for (const file of files.value) {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const uint8array = await api.webp(bytes);
          const blob = new Blob([uint8array], { type: "image/webp" });
          const newFileName = replaceExtension(file.name, "webp");
          const result = new File([blob], newFileName, { type: "image/webp" });
          convertedFiles.value.push(result);
        }
        break;
      }
    }
  } catch (e) {
    // TODO:
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
