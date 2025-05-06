<template>
  <div :class="$style.wrapper">
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
      <ImageContainer :empty="files.length === 0" :text="'No Image Selected'">
        <File
          v-for="file in files"
          :file="file"
          :loading="loading"
          @delete="handleSelectedFilesDelete"
        />
      </ImageContainer>
    </transition>

    <ImageSelect v-model="files" />

    <ElmArrowIcon :loading="loading" direction="down" />

    <Convert
      v-model:loading="loading"
      v-model:files="files"
      v-model:converted-files="convertedFiles"
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
      <ImageContainer :empty="convertedFiles.length === 0" :text="'No Results'">
        <File
          v-for="file in convertedFiles"
          :file="file"
          :loading="loading"
          @delete="handleConvertedFilesDelete"
        />
      </ImageContainer>
    </transition>

    <ElmButton block @click="deleteAll">Delete All</ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmToggleTheme, ElmButton, ElmArrowIcon } from "@elmethis/core";
import Convert from "./ConvertControl.vue";
import ImageContainer from "./ImageContainer.vue";
import File from "./FileToImage.vue";
import { ref } from "vue";
import ImageSelect from "./ImageSelect.vue";

import transitionStyle from "../transition.module.scss";

const loading = ref(false);

const files = ref<File[]>([]);

const convertedFiles = ref<File[]>([]);

const handleSelectedFilesDelete = (filename: string) => {
  files.value = files.value.filter((file) => file.name !== filename);
};

const handleConvertedFilesDelete = (filename: string) => {
  convertedFiles.value = convertedFiles.value.filter(
    (file) => file.name !== filename
  );
};

const deleteAll = () => {
  files.value = [];
  convertedFiles.value = [];
};
</script>

<style module lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
