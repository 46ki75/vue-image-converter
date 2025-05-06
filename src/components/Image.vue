<template>
  <div class="container">
    <div class="header"></div>
    <img :src="src" alt="user contents" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ src: string }>(), {});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.header {
  background-color: rgba(gray, 0.1);
}
</style>
