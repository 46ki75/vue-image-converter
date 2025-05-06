<template>
  <div v-if="empty" :class="$style.empty">
    <ElmMdiIcon :d="mdiImageOff" color="gray" size="1.5rem" />
    <ElmInlineText :text="text" color="gray" />
  </div>

  <transition-group
    v-else
    tag="div"
    :class="$style.container"
    :enter-from-class="transitionStyle['v-enter-from']"
    :enter-active-class="transitionStyle['v-enter-active']"
    :enter-to-class="transitionStyle['v-enter-to']"
    :leave-from-class="transitionStyle['v-leave-from']"
    :leave-active-class="transitionStyle['v-leave-active']"
    :leave-to-class="transitionStyle['v-leave-to']"
  >
    <slot></slot>
  </transition-group>
</template>

<script setup lang="ts">
import { ElmInlineText, ElmMdiIcon } from "@elmethis/core";
import { mdiImageOff } from "@mdi/js";

import transitionStyle from "../transition.module.scss";

defineProps<{
  text: string;
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
</style>
