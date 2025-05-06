<script setup lang="ts">
import { ElmToggleTheme } from "@elmethis/core";
import Image from "./components/Image.vue";
</script>

<template>
  <ElmToggleTheme />
  <Image
    filename="untitled"
    src="https://avatars.githubusercontent.com/u/85323087?s=400&u=2867edf10c412da0ac9ddff6ff0581e92e79e563&v=4"
  />
  <Image
    filename="untitled"
    src="https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  />
</template>

<style lang="scss">
body {
  transition: background-color 200ms;
  background-color: #f2f2f2;

  [data-theme="dark"] & {
    background-color: #262626;
  }
}
</style>
