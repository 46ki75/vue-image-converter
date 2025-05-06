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

    <div :class="$style['button-container']">
      <ElmButton block :disabled="loading" @click="() => fileInputRef?.click()">
        <ElmMdiIcon :d="mdiImagePlus" size="1.25rem" />
        <ElmInlineText text="Select File" />
      </ElmButton>

      <ElmButton block :disabled="loading" @click="() => (inputImages = [])">
        <ElmMdiIcon :d="mdiImageOff" color="#c56565" size="1.25rem" />
        <ElmInlineText color="#c56565" text="Clear All" />
      </ElmButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElmButton, ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiAlert, mdiImagePlus, mdiImageOff } from "@mdi/js";
import { ref } from "vue";
import type { useImageConverter } from "../useImageConverter";

const props = defineProps<{
  loading: boolean;
  inputImages: File[];
  handleImageSelect: ReturnType<typeof useImageConverter>["handleImageSelect"];
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);

const error = ref<string | null>(null);

const handleFileChange = async () => {
  error.value = null;
  const formFiles = fileInputRef.value?.files;
  if (formFiles && fileInputRef.value) {
    props.handleImageSelect(formFiles);

    fileInputRef.value.value = "";
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

.button-container {
  display: flex;
  gap: 0.5rem;
}
</style>
