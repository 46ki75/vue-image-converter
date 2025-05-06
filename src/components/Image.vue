<template>
  <div class="container">
    <div class="header">
      <ElmMdiIcon :d="mdiImage" size="1.25rem" color="gray" />
      <ElmInlineText :text="name" />
    </div>
    <div class="image-container">
      <img class="image" :src="src" :alt="`${name} (user contents)`" />
    </div>
    <div class="control">
      <ElmMdiIcon :d="mdiTrashCanOutline" size="1.25rem" color="#c56565" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiImage, mdiTrashCanOutline } from "@mdi/js";
import { ElmInlineText, ElmMdiIcon } from "@elmethis/core";

withDefaults(defineProps<{ src: string; name: string }>(), {});
</script>

<style scoped lang="scss">
.container {
  padding: 0;
  margin: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.125rem rgba(black, 0.3);
}

.header {
  box-sizing: border-box;
  background-color: rgba(gray, 0.1);
  border-bottom: 1px solid rgba(gray, 0.1);
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-self: flex-start;
  align-items: center;
  gap: 0.25rem;
}

.image-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  display: block;
  max-height: 12rem;
}

.control {
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem;
  background-color: rgba(gray, 0.1);
  border-top: 1px solid rgba(gray, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
}
</style>
