<template>
  <transition-group
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
