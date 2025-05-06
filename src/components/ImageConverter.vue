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
      <ImageContainer :empty="files.length === 0">
        <File
          v-for="file in files"
          :file="file"
          :loading="loading"
          @delete="handleDelete"
        />
      </ImageContainer>
    </transition>

    <ImageSelect v-model="files" />

    <ElmArrowIcon :loading="loading" direction="down" />

    <Convert :loading="loading" />

    <ElmArrowIcon :loading="loading" direction="down" />

    <ElmButton block @click="toggle">Toggle</ElmButton>
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

const handleDelete = (filename: string) => {
  files.value = files.value.filter((file) => file.name !== filename);
};

const deleteAll = () => {
  files.value = [];
};

const toggle = () => {
  loading.value = !loading.value;
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
