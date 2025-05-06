import { nextTick, ref, watch } from "vue";
import type { ImageFormat } from "./type";

export type Status = "IDLE" | "INIT_WASM" | "CONVERTING" | "COMPLETE";

export const useImageConverter = ({
  init,
  png,
  jpeg,
  bmp,
  webp,
}: {
  init(): Promise<void>;
  png(bytes: Uint8Array): Promise<Uint8Array>;
  jpeg(bytes: Uint8Array): Promise<Uint8Array>;
  bmp(bytes: Uint8Array): Promise<Uint8Array>;
  webp(bytes: Uint8Array): Promise<Uint8Array>;
}) => {
  const status = ref<Status>("IDLE");
  const loading = ref<boolean>(false);
  const progress = ref<number>(0);

  const inputImages = ref<File[]>([]);
  const outputImages = ref<File[]>([]);

  const resetInputImages = () => {
    if (!loading.value) inputImages.value = [];
  };

  const resetOupputImages = () => {
    if (!loading.value) outputImages.value = [];
  };

  const removeInputImage = (fileName: string) => {
    if (!loading.value)
      inputImages.value = inputImages.value.filter(
        (image) => image.name !== fileName
      );
  };

  const removeOupputImage = (fileName: string) => {
    if (!loading.value)
      outputImages.value = outputImages.value.filter(
        (image) => image.name !== fileName
      );
  };

  const handleSingleImageSelect = (file: File) => {
    if (
      inputImages.value.every((inputImage) => inputImage.name !== file.name)
    ) {
      inputImages.value.push(file);
    }
  };

  const handleImageSelect = (file: File | File[] | FileList) => {
    if (Array.isArray(file)) {
      file.forEach(handleSingleImageSelect);
    } else if (file instanceof FileList) {
      Array.from(file).forEach(handleSingleImageSelect);
    } else if (file instanceof File) {
      handleSingleImageSelect(file);
    }
  };

  const replaceExtension = (path: string, newExt: string): string => {
    const ext = newExt.startsWith(".") ? newExt : "." + newExt;
    const index = path.lastIndexOf(".");
    if (index === -1 || path.slice(index).includes("/")) {
      return path + ext;
    }
    return path.slice(0, index) + ext;
  };

  const toBmp = async (file: File): Promise<File> => {
    await init();
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const uint8array = await bmp(bytes);
    const blob = new Blob([uint8array], { type: "image/bmp" });
    const newFileName = replaceExtension(file.name, "bmp");
    const result = new File([blob], newFileName, { type: "image/bmp" });
    return result;
  };

  const toJpeg = async (file: File): Promise<File> => {
    await init();
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const uint8array = await jpeg(bytes);
    const blob = new Blob([uint8array], { type: "image/jpeg" });
    const newFileName = replaceExtension(file.name, "jpg");
    const result = new File([blob], newFileName, { type: "image/jpeg" });
    return result;
  };

  const toPng = async (file: File): Promise<File> => {
    await init();
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const uint8array = await png(bytes);
    const blob = new Blob([uint8array], { type: "image/png" });
    const newFileName = replaceExtension(file.name, "png");
    const result = new File([blob], newFileName, { type: "image/png" });
    return result;
  };

  const toWebp = async (file: File): Promise<File> => {
    await init();
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const uint8array = await webp(bytes);
    const blob = new Blob([uint8array], { type: "image/webp" });
    const newFileName = replaceExtension(file.name, "webp");
    const result = new File([blob], newFileName, { type: "image/webp" });
    return result;
  };

  const convertImageWithWebWorker = async ({
    file,
    format,
  }: {
    file: File;
    format: ImageFormat;
  }): Promise<File> => {
    switch (format) {
      case "BMP": {
        return await toBmp(file);
      }

      case "JPEG": {
        return await toJpeg(file);
      }

      case "PNG": {
        return await toPng(file);
      }

      case "WEBP": {
        return await toWebp(file);
      }
    }
  };

  const convert = async (format: ImageFormat): Promise<void> => {
    if (inputImages.value.length === 0) return;

    loading.value = true;
    progress.value = 0;
    outputImages.value = [];

    try {
      status.value = "INIT_WASM";
      await init();

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
    handleImageSelect,
    resetInputImages,
    resetOupputImages,
    removeInputImage,
    removeOupputImage,
    convert,
  };
};
