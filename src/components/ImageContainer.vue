<template>
  <div v-if="empty" :class="$style.empty">
    <ElmMdiIcon :d="mdiImageOff" color="gray" size="1.5rem" />
    <ElmInlineText text="No Image Selected" color="gray" />
  </div>

  <transition-group
    v-else
    tag="div"
    :class="$style.container"
    :enter-from-class="$style['v-enter-from']"
    :enter-active-class="$style['v-enter-active']"
    :enter-to-class="$style['v-enter-to']"
    :leave-from-class="$style['v-leave-from']"
    :leave-active-class="$style['v-leave-active']"
    :leave-to-class="$style['v-leave-to']"
  >
    <slot></slot>
  </transition-group>
</template>

<script setup lang="ts">
import { ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiImageOff } from "@mdi/js";

defineProps<{
  empty: boolean;
}>();
</script>

<style module lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.empty {
  width: 100%;
  height: 11.5rem;
  border: 1px dashed rgba(gray, 0.8);
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 300ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
