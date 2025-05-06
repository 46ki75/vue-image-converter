<template>
  <img :src="src" alt="user contents" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ src: string }>(), {});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
