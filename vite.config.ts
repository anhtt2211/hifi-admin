import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginImp from 'vite-plugin-imp';
import reactRefresh from '@vitejs/plugin-react-refresh';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    modules: {
      // localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        // /@/xxxx  =>  src/xxx
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      { find: /^~/, replacement: '' },
    ],
  },
});
