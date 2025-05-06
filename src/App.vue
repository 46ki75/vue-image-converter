<template>
  <ElmToggleTheme />

  <ImageContainer>
    <Image
      v-for="_ in new Array(10)"
      :loading="loading"
      filename="untitled"
      src="https://avatars.githubusercontent.com/u/85323087?s=400&u=2867edf10c412da0ac9ddff6ff0581e92e79e563&v=4"
    />

    <Image
      :loading="loading"
      filename="untitled"
      src="https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
    />
  </ImageContainer>

  <Convert :loading="loading" />

  <ElmButton @click="toggle">Toggle</ElmButton>
</template>

<script setup lang="ts">
import { ElmToggleTheme, ElmButton } from "@elmethis/core";
import Image from "./components/Image.vue";
import Convert from "./components/Convert.vue";
import ImageContainer from "./components/ImageContainer.vue";
import { ref } from "vue";

const loading = ref(false);

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
