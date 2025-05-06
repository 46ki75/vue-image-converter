<template>
  <div :class="$style.wrapper" ref="dropZoneRef">
    <div
      :class="$style.dropzone"
      ref="dropZoneRef"
      :style="{
        opacity: isOverDropZone ? 1 : 0,
      }"
    >
      <div :class="$style['dropzone-inner']">
        <ElmMdiIcon :d="mdiTooltipImage" size="2rem" />
        <ElmInlineText size="2rem" text="Drop files here to upload" />
      </div>
    </div>

    <ElmToggleTheme />

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
      <ImageContainer
        :empty="inputImages.length === 0"
        :text="'No Image Selected'"
      >
        <File
          v-for="file in inputImages"
          :key="file.name"
          :file="file"
          :loading="loading"
          @delete="removeInputImage(file.name)"
        />
      </ImageContainer>
    </transition>

    <ImageSelect
      :inputImages="inputImages"
      :loading="loading"
      :handleImageSelect="handleImageSelect"
      :resetInputImages="resetInputImages"
    />

    <ElmArrowIcon :loading="loading" direction="down" />

    <Convert
      :status="status"
      :loading="loading"
      :progress="progress"
      :inputImages="inputImages"
      :outputImages="outputImages"
      :convert="convert"
    />

    <ElmArrowIcon :loading="loading" direction="down" />

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
      <ImageContainer :empty="outputImages.length === 0" :text="'No Results'">
        <File
          v-for="file in outputImages"
          :key="file.name"
          :file="file"
          :loading="loading"
          @delete="removeOupputImage(file.name)"
        />
      </ImageContainer>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  ElmToggleTheme,
  ElmArrowIcon,
  ElmInlineText,
  ElmMdiIcon,
} from "@elmethis/core";
import Convert from "./ConvertControl.vue";
import ImageContainer from "./ImageContainer.vue";
import File from "./FileToImage.vue";
import ImageSelect from "./ImageSelect.vue";

import transitionStyle from "../transition.module.scss";
import { useImageConverter } from "../useImageConverter";

import { ref } from "vue";
import { useDropZone } from "@vueuse/core";
import { mdiTooltipImage } from "@mdi/js";

const {
  loading,
  inputImages,
  outputImages,
  status,
  progress,
  handleImageSelect,
  resetInputImages,
  removeInputImage,
  removeOupputImage,
  convert,
} = useImageConverter();

const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  if (files) handleImageSelect(files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/webp", "image/bmp", "image/png"],
  multiple: true,
  preventDefaultForUnhandled: false,
});
</script>

<style module lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.dropzone {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
  transition: opacity 200ms;

  background-color: rgba(#aebed9, 0.9);
  [data-theme="dark"] & {
    background-color: rgba(#3c557f, 0.9);
  }
}

.dropzone-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0.8;
}
</style>
