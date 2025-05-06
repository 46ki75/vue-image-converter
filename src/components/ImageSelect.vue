<template>
  <form>
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      multiple
      @change="handleFileChange"
    />
    <button type="submit">変換</button>
  </form>

  <div v-for="file in selectedFiles">{{ file.name }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);

const selectedFiles = defineModel<File[]>({ default: [] });

const handleFileChange = async () => {
  const files = fileInput.value?.files;
  if (files) {
    for (const file of files) {
      selectedFiles.value.push(file);
    }
  }
};
</script>
