<template>
  <ElmArrowIcon :loading="loading" />
  <div></div>
</template>

<script setup lang="ts">
import { ElmArrowIcon } from "@elmethis/core";

withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);
</script>
