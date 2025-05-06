<template>
  <div class="wrapper">
    <ElmToggleTheme />

    <ImageSelect v-model="files" />

    <ImageContainer>
      <File
        v-for="file in files"
        :file="file"
        :loading="loading"
        @delete="handleDelete"
      />
    </ImageContainer>

    <Convert :loading="loading" />

    <ElmButton block @click="toggle">Toggle</ElmButton>
    <ElmButton block @click="deleteAll">Delete All</ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmToggleTheme, ElmButton } from "@elmethis/core";
import Convert from "./ConvertControl.vue";
import ImageContainer from "./ImageContainer.vue";
import File from "./FileToImage.vue";
import { ref } from "vue";
import ImageSelect from "./ImageSelect.vue";

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

<style scoped lang="scss">
.wrapper {
  width: 100%;
}
</style>
