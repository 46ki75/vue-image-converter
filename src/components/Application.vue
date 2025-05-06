<template>
  <div :class="$style.wrapper" ref="dropZoneRef">
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
import { ElmToggleTheme, ElmArrowIcon } from "@elmethis/core";
import Convert from "./ConvertControl.vue";
import ImageContainer from "./ImageContainer.vue";
import File from "./FileToImage.vue";
import ImageSelect from "./ImageSelect.vue";

import transitionStyle from "../transition.module.scss";
import { useImageConverter } from "../useImageConverter";

import { ref } from "vue";
import { useDropZone } from "@vueuse/core";

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

useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/webp", "image/bmp", "image/png"],
  multiple: true,
  preventDefaultForUnhandled: false,
});
</script>

<style module lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
