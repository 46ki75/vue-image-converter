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

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

body {
  transition: background-color 200ms;
  background-color: #f2f2f2;

  [data-theme="dark"] & {
    background-color: #262626;
  }
}
</style>

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
