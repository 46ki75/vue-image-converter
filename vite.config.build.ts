import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.ts"),
      name: "vue-image-converter",
      fileName: "vue-image-converter",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@elmethis/core",
        "@mdi/js",
        "@vueuse/core",
        "comlink",
        "web-image-converter",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].mjs",
      },
    },
  },
});
