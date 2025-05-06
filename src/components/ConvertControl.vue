<template>
  <div :class="$style.container">
    <div :class="$style['button-container']">
      <ElmButton
        v-for="format in formats"
        :key="format"
        block
        :disabled="loading || selectedFiles.length === 0"
        @click="handleConvert(format)"
      >
        <ElmMdiIcon :d="mdiImageSync" color="gray" size="1.25rem" />
        <ElmInlineText :text="format" />
      </ElmButton>
    </div>

    <transition
      mode="out-in"
      :class="$style.container"
      :enter-from-class="transitionStyle['v-enter-from']"
      :enter-active-class="transitionStyle['v-enter-active']"
      :enter-to-class="transitionStyle['v-enter-to']"
      :leave-from-class="transitionStyle['v-leave-from']"
      :leave-active-class="transitionStyle['v-leave-active']"
      :leave-to-class="transitionStyle['v-leave-to']"
    >
      <div v-if="status === 'IDLE'">
        <ElmInlineText text="Select images" />
      </div>

      <div v-else-if="status === 'INIT_WASM'">
        <ElmInlineText text="Initializing WebAssembly..." />
      </div>

      <div v-else-if="status === 'CONVERTING'">
        <ElmInlineText
          :text="`Converting ${progress} of ${selectedFiles.length} images...`"
        />
      </div>

      <div v-else-if="status === 'COMPLETE'">
        <ElmInlineText text="Conversion complete!" />
      </div>
    </transition>

    <ElmProgress
      :value="progress"
      :max="progress === 0 ? 1 : selectedFiles.length"
      :color="loading ? '#6987b8' : '#59b57c'"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ElmButton,
  ElmInlineText,
  ElmMdiIcon,
  ElmProgress,
} from "@elmethis/core";
import { mdiImageSync } from "@mdi/js";

import * as Comlink from "comlink";
import { nextTick, ref } from "vue";

import transitionStyle from "../transition.module.scss";
import { convertImageWithWebWorker } from "../util";

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

const progress = ref<number>(0);

type Status = "IDLE" | "INIT_WASM" | "CONVERTING" | "COMPLETE";
const status = ref<Status>("IDLE");

const selectedFiles = defineModel<File[]>("selected-files", { default: [] });

const convertedFiles = defineModel<File[]>("converted-files", { default: [] });

const handleConvert = async (format: ImageFormat) => {
  if (selectedFiles.value.length === 0) return;

  loading.value = true;
  progress.value = 0;
  convertedFiles.value = [];

  try {
    status.value = "INIT_WASM";
    await api.init();

    status.value = "CONVERTING";

    const promises = Promise.all(
      selectedFiles.value.map((file) =>
        convertImageWithWebWorker({ file, format }).then((result) => {
          progress.value = progress.value + 1;
          return result;
        })
      )
    );
    const results = await promises;
    await nextTick();
    convertedFiles.value = results;
  } catch (e) {
    // TODO:
    console.error(e);
  } finally {
    loading.value = false;
    status.value = "COMPLETE";
  }
};
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
