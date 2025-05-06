<template>
  <div :class="$style.wrapper">
    <ElmToggleTheme />

    <transition
      mode="out-in"
      :class="$style.container"
      :enter-from-class="$style['v-enter-from']"
      :enter-active-class="$style['v-enter-active']"
      :enter-to-class="$style['v-enter-to']"
      :leave-from-class="$style['v-leave-from']"
      :leave-active-class="$style['v-leave-active']"
      :leave-to-class="$style['v-leave-to']"
    >
      <ImageContainer :empty="files.length === 0">
        <File
          v-for="file in files"
          :file="file"
          :loading="loading"
          @delete="handleDelete"
        />
      </ImageContainer>
    </transition>

    <ImageSelect v-model="files" />

    <ElmArrowIcon :loading="loading" direction="down" />

    <Convert :loading="loading" />

    <ElmArrowIcon :loading="loading" direction="down" />

    <ElmButton block @click="toggle">Toggle</ElmButton>
    <ElmButton block @click="deleteAll">Delete All</ElmButton>
  </div>
</template>

<script setup lang="ts">
import { ElmToggleTheme, ElmButton, ElmArrowIcon } from "@elmethis/core";
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

<style module lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 500ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
