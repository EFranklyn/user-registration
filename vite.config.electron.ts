import vue from "@vitejs/plugin-vue";
import { BuildOptions, InlineConfig } from "vite";
import packageJSON from "./package.json";
import { Configuration } from "vite-plugin-electron";


const PATH_MAIN_ELECTRON = "electron/main.ts";
const PATH_PRELOAD_ELECTRON = "electron/preload.ts";
const PATH_MAIN_ELECTRON_DIST = "dist-electron/main";
const PATH_PRELOAD_ELECTRON_DIST = "dist-electron/preload";
const sourcemap: boolean = !!process.env.VSCODE_DEBUG;
const isBuild: boolean = process.argv.slice(2).includes("build");

interface Options {
  startup: (argv?: string[]) => Promise<void>;
  reload: () => void;
}

const onstart = (options: Options): void => {
  if (process.env.VSCODE_DEBUG) {
    console.info("[startup] Electron App");
  } else {
    options.startup();
  }
};

const reloadPageWhenPreloadScriptsBuildIsComplete = (
  options: Options
): void => {
  options.reload();
};

const defaultInlineConfigViteBuild: BuildOptions = {
  sourcemap,
  minify: isBuild,
  rollupOptions: {
    external: Object.keys(packageJSON.dependencies)
  }
};

const getConfigViteForElectronMain = (): InlineConfig => {
  return {
    build: {
      ...defaultInlineConfigViteBuild,
      outDir: PATH_MAIN_ELECTRON_DIST
    }
  };
};

const getConfigViteForElectronPreload = (): InlineConfig => {
  return {
    plugins: [vue()],
    build: {
      ...defaultInlineConfigViteBuild,
      outDir: PATH_PRELOAD_ELECTRON_DIST
    }
  };
};
const electronConfig: Configuration | Configuration[] = [
  {
    entry: PATH_MAIN_ELECTRON,
    onstart,
    vite: getConfigViteForElectronMain()
  },
  {
    entry: PATH_PRELOAD_ELECTRON,
    onstart: reloadPageWhenPreloadScriptsBuildIsComplete,
    vite: getConfigViteForElectronPreload()
  }
  
];

export { electronConfig };
