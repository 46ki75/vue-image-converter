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
      <ElmMdiIcon
        class="icon"
        :d="mdiDownload"
        size="1.25rem"
        color="#6987b8"
        @click="() => downloadFile({ url: src, filename })"
      />
      <ElmMdiIcon
        class="icon"
        :d="mdiTrashCanOutline"
        size="1.25rem"
        color="#c56565"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiImage, mdiDownload, mdiTrashCanOutline } from "@mdi/js";
import { ElmInlineText, ElmMdiIcon } from "@elmethis/core";

withDefaults(defineProps<{ src: string; filename: string }>(), {});

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
  width: 16rem;
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
  background-color: rgba(gray, 0.05);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image {
  display: block;
  max-height: 12rem;
  user-select: none;
}

.control {
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem;
  background-color: rgba(gray, 0.1);
  border-top: 1px solid rgba(gray, 0.3);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
}

.icon {
  padding: 0.125rem;
  border-radius: 0.125rem;
  cursor: pointer;
  transition: background-color 100ms, opacity 100ms, transform 100ms;

  &:hover {
    background-color: rgba(gray, 0.2);
  }

  &:active {
    opacity: 0.5;
    transform: translateX(1px) translateY(1px);
  }
}
</style>
