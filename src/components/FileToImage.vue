<template>
  <Image
    v-if="url"
    :src="url"
    :filename="file.name"
    :loading="loading"
    :handleDelete="handleDelete"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Image from "./Image.vue";

const props = defineProps<{
  file: File;
  loading: boolean;
  handleDelete: (filename: string) => void;
}>();

const url = ref<string | undefined>();

onMounted(async () => {
  const buffer = await props.file.arrayBuffer();
  const blob = new Blob([buffer]);
  url.value = URL.createObjectURL(blob);
});

onUnmounted(() => {
  if (url.value) {
    URL.revokeObjectURL(url.value);
  }
});
</script>
