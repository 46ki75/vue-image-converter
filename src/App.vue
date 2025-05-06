<template>
  <ElmToggleTheme />

  <ImageSelect v-model="files" />

  <ImageContainer>
    <File
      v-for="file in files"
      :file="file"
      :loading="loading"
      :handleDelete="handleDelete"
    />
  </ImageContainer>

  <Convert :loading="loading" />

  <ElmButton block @click="toggle">Toggle</ElmButton>
  <ElmButton block @click="deleteAll">Delete All</ElmButton>
</template>

<script setup lang="ts">
import { ElmToggleTheme, ElmButton } from "@elmethis/core";
import Convert from "./components/Convert.vue";
import ImageContainer from "./components/ImageContainer.vue";
import File from "./components/FileToImage.vue";
import { ref } from "vue";
import ImageSelect from "./components/ImageSelect.vue";

const loading = ref(false);

const files = ref<File[]>([]);

const handleDelete = (filename: string) => {
  files.value.filter((file) => file.name === filename);
};

const deleteAll = () => {
  files.value = [];
};

const toggle = () => {
  loading.value = !loading.value;
};
</script>

<style lang="scss">
body {
  transition: background-color 200ms;
  background-color: #f2f2f2;

  [data-theme="dark"] & {
    background-color: #262626;
  }
}
</style>
