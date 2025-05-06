<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <ImageConverter :use-image-converter-function="api" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageConverter from "./components/Application.vue";
import { api } from "./util";
</script>

<style module lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  max-width: calc(12.75rem * 5);
}
</style>
