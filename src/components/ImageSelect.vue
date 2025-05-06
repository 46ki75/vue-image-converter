<template>
  <div>
    <input
      hidden
      type="file"
      accept="image/*"
      ref="fileInputRef"
      multiple
      @change="handleFileChange"
    />

    <ElmButton block @click="() => fileInputRef?.click()">
      <ElmMdiIcon :d="mdiImagePlus" size="1.25rem" />
      <ElmInlineText text="Select File" />
    </ElmButton>

    <div v-if="error != null" class="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmButton, ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiImagePlus } from "@mdi/js";
import { ref } from "vue";

const fileInputRef = ref<HTMLInputElement | null>(null);

const files = defineModel<File[]>({ default: [] });

const error = ref<string | null>(null);

const handleFileChange = async () => {
  error.value = null;
  const selectedFiles = fileInputRef.value?.files;
  if (selectedFiles) {
    for (const selectedFile of selectedFiles) {
      if (files.value.every((file) => file.name !== selectedFile.name)) {
        files.value.push(selectedFile);
      } else {
        error.value = "This file has already been selected.";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.error {
  color: #c56565;
}
</style>
