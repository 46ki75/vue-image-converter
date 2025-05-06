<template>
  <div :class="$style.wrapper">
    <input
      hidden
      type="file"
      accept="image/*"
      ref="fileInputRef"
      multiple
      @change="handleFileChange"
    />

    <div v-if="error != null" :class="$style.error">
      <ElmMdiIcon :d="mdiAlert" size="1.25rem" color="#c56565" />
      <ElmInlineText :text="error" color="#c56565" />
    </div>

    <ElmButton block @click="() => fileInputRef?.click()">
      <ElmMdiIcon :d="mdiImagePlus" size="1.25rem" />
      <ElmInlineText text="Select File" />
    </ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmButton, ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiAlert, mdiImagePlus } from "@mdi/js";
import { ref } from "vue";

const fileInputRef = ref<HTMLInputElement | null>(null);

const files = defineModel<File[]>({ default: [] });

const error = ref<string | null>(null);

const handleFileChange = async () => {
  error.value = null;
  const selectedFiles = fileInputRef.value?.files;
  if (selectedFiles && fileInputRef.value) {
    for (const selectedFile of selectedFiles) {
      if (files.value.every((file) => file.name !== selectedFile.name)) {
        files.value.push(selectedFile);
        fileInputRef.value.value = "";
      } else {
        error.value = "This file has already been selected.";
      }
    }
  }
};
</script>

<style module lang="scss">
.wrapper {
  width: 100%;
}

.error {
  margin-block: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
