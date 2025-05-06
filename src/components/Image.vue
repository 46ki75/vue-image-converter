<template>
  <div class="container">
    <div class="header">
      <ElmMdiIcon :d="mdiImage" size="1.25rem" color="gray" />
      <ElmInlineText :text="filename" />
    </div>
    <div class="image-container">
      <img class="image" :src="src" :alt="`${filename} (user contents)`" />
    </div>
    <div class="control">
      <transition>
        <ElmDotLoadingIcon v-if="loading" size="1rem" />
      </transition>

      <ElmMdiIcon
        class="icon-enable"
        :d="mdiDownload"
        size="1.25rem"
        color="#6987b8"
        @click="() => downloadFile({ url: src, filename })"
      />

      <ElmMdiIcon
        :class="
          loading ? ['icon-base', 'icon-disable'] : ['icon-base', 'icon-enable']
        "
        :d="mdiTrashCanOutline"
        size="1.25rem"
        color="#c56565"
        @click="handleDelete(filename)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiImage, mdiDownload, mdiTrashCanOutline } from "@mdi/js";
import { ElmDotLoadingIcon, ElmInlineText, ElmMdiIcon } from "@elmethis/core";

withDefaults(
  defineProps<{
    src: string;
    filename: string;
    loading: boolean;
    handleDelete: (filename: string) => void;
  }>(),
  {
    loading: false,
  }
);

const downloadFile = async ({
  url,
  filename,
}: {
  url: string;
  filename: string;
}) => {
  let link: HTMLAnchorElement | undefined;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();

    link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    if (link) URL.revokeObjectURL(link.href);
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 12rem;
  padding: 0;
  margin: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.125rem rgba(black, 0.3);
}

.header {
  box-sizing: border-box;
  background-color: rgba(gray, 0.1);
  border-bottom: 1px solid rgba(gray, 0.3);
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-self: flex-start;
  align-items: center;
  gap: 0.25rem;
}

.image-container {
  height: 8rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  --bg-dot-color: #e6e6e6;

  [data-theme="dark"] & {
    --bg-dot-color: #333;
  }

  background-image: radial-gradient(var(--bg-dot-color) 1px, transparent 1px);
  background-size: 10px 10px;
}

.image {
  display: block;
  user-select: none;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.control {
  box-sizing: border-box;
  width: 100%;
  padding: 0.125rem 0.25rem;
  background-color: rgba(gray, 0.1);
  border-top: 1px solid rgba(gray, 0.3);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
}

.icon-base {
  padding: 0.125rem;
  border-radius: 0.125rem;
  transition: background-color 100ms, opacity 100ms, transform 100ms;
}

.icon-enable {
  cursor: pointer;

  &:hover {
    background-color: rgba(gray, 0.2);
  }

  &:active {
    opacity: 0.5;
    transform: translateX(1px) translateY(1px);
  }
}

.icon-disable {
  cursor: progress;
  opacity: 0.25;

  &:hover {
    background-color: transparent;
  }

  &:active {
    opacity: 0.25;
    transform: none;
  }
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
