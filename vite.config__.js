// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import electron from "vite-plugin-electron";


export default defineConfig({  
  plugins: [vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
        outDir: 'dist-electron/main/main.js',
        tsconfig: resolve(__dirname, 'electron/tsconfig.json') // Adicione esta linha
      },
      preload: {
        input: 'electron/preload.ts',
        tsconfig: resolve(__dirname, 'electron/tsconfig.json') // Adicione esta linha
      },
      buildTarget: 'electron-renderer'
    }),
  ],
  build: {
    outDir: 'dist-electron'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // Se você usa alias, por exemplo, "@/components"
    }
  },
})

