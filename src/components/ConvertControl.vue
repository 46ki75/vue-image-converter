<template>
  <div :class="$style.container">
    <div :class="$style['button-container']">
      <ElmButton
        v-for="format in IMAGE_FORMATS"
        :key="format"
        block
        :disabled="loading || inputImages.length === 0"
        @click="convert(format as ImageFormat)"
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
          :text="`Converting ${progress} of ${inputImages.length} images...`"
        />
      </div>

      <div v-else-if="status === 'COMPLETE'">
        <ElmInlineText text="Conversion complete!" />
      </div>
    </transition>

    <ElmProgress
      :value="progress"
      :max="progress === 0 ? 1 : inputImages.length"
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

import transitionStyle from "../transition.module.scss";
import { type ImageFormat, IMAGE_FORMATS } from "../type";
import type { Status } from "../useImageConverter";

defineProps<{
  status: Status;
  loading: boolean;
  progress: number;
  inputImages: File[];
  outputImages: File[];
  convert: (format: ImageFormat) => Promise<void>;
}>();
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
