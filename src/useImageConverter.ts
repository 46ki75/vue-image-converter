import { nextTick, ref, watch } from "vue";
import type { ImageFormat } from "./type";
import { api, convertImageWithWebWorker } from "./util";

export type Status = "IDLE" | "INIT_WASM" | "CONVERTING" | "COMPLETE";

export const useImageConverter = () => {
  const status = ref<Status>("IDLE");
  const loading = ref<boolean>(false);
  const progress = ref<number>(0);

  const inputImages = ref<File[]>([]);
  const outputImages = ref<File[]>([]);

  const resetInputImages = () => {
    inputImages.value = [];
  };

  const resetOupputImages = () => {
    outputImages.value = [];
  };

  const removeInputImage = (fileName: string) => {
    inputImages.value = inputImages.value.filter(
      (image) => image.name !== fileName
    );
  };

  const removeOupputImage = (fileName: string) => {
    outputImages.value = outputImages.value.filter(
      (image) => image.name !== fileName
    );
  };

  const convert = async (format: ImageFormat): Promise<void> => {
    if (inputImages.value.length === 0) return;

    loading.value = true;
    progress.value = 0;
    outputImages.value = [];

    try {
      status.value = "INIT_WASM";
      await api.init();

      status.value = "CONVERTING";

      const promises = Promise.all(
        inputImages.value.map((file) =>
          convertImageWithWebWorker({ file, format }).then((result) => {
            progress.value = progress.value + 1;
            return result;
          })
        )
      );
      const results = await promises;
      await nextTick();
      outputImages.value = results;
    } catch (e) {
      // TODO:
      console.error(e);
    } finally {
      loading.value = false;
      status.value = "COMPLETE";
    }
  };

  watch(
    () => inputImages.value.length,
    () => {
      progress.value = 0;
    }
  );

  return {
    status,
    loading,
    progress,
    inputImages,
    outputImages,
    resetInputImages,
    resetOupputImages,
    removeInputImage,
    removeOupputImage,
    convert,
  };
};
