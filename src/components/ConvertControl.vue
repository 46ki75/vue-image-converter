<template>
  <div :class="$style.container">
    <ElmButton
      v-for="variant in variants"
      :key="variant"
      block
      :disabled="loading"
      @click="() => {}"
    >
      <ElmMdiIcon :d="mdiImageSync" color="gray" size="1.25rem" />
      <ElmInlineText :text="variant" />
    </ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmButton, ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiImageSync } from "@mdi/js";

const variants: Array<"BMP" | "JPEG" | "PNG" | "WEBP"> = [
  "BMP",
  "JPEG",
  "PNG",
  "WEBP",
] as const;

withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
