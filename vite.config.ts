import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import { resolve } from "path"
import Components from 'unplugin-vue-components/vite'
import VueSetupExtend from "vite-plugin-vue-setup-extend"
import path from 'path'
import fs from 'fs'

const getBuildConfig = (): any => {
  const is_build_file_url = path.resolve(__dirname, './build/.cache/is_build.json')
  if (fs.existsSync(is_build_file_url)) {
    const jsonData = JSON.parse(fs.readFileSync(is_build_file_url, 'utf-8'))
    if (jsonData.is_build) {
      return {
        build: {
          lib: {
            entry: jsonData.entry,
            name: jsonData.name,
            fileName: (format: any) => `${jsonData.package_name_prefix}${jsonData.package_url}.${format}.js`
          },
          rollupOptions: {
            external: ["vue", "monaco-editor"],
            output: {
              globals: { vue: "Vue", "monaco-editor": "monaco-editor" },
            }
          }
        }
      }
    } else {
      return {}
    }
  }
  return {}
}
// https://vite.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${resolve(__dirname, 'src/styles/var.less')}";`
        }
      }
    },
    esbuild: {
      pure: ["console.log", "debugger"] // 去除console.log和debugger
    },
    plugins: [
      vue(),
      VueSetupExtend(), // vue setup扩展，可以在 script 标签上直接挂 name 属性
      Components({}),
      vitePluginForArco({
        modifyVars: {
          hack: `true;@import (reference) '${resolve('/src/styles/arco.less')}';`,
        },
      })
    ],
    ...getBuildConfig()
  }
})
