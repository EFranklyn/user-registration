import { rmSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import { electronConfig } from "./vite.config.electron";

export default defineConfig(() => {
  rmSync("dist-electron", { recursive: true, force: true });

  const electronPlugin =
    process.env.ELECTRON_HEADLESS !== "true" ? electron(electronConfig) : null;

  return {
    plugins: [vue({}), electronPlugin],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url))
        },
        {
          find: "@electron",
          replacement: fileURLToPath(new URL("./electron", import.meta.url))
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/scss/styles";'
        }
      }
    },
    clearScreen: false,
    build: { minify: false }
  };
});
