<template>
  <Image
    :src="url"
    :filename="file.name"
    :loading="loading"
    @delete="emit('delete', file.name)"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Image from "./Image.vue";

const props = defineProps<{
  file: File;
  loading: boolean;
}>();

const url = ref<string | undefined>();

const emit = defineEmits<{
  (e: "delete", filename: string): void;
}>();

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
