import react from '@vitejs/plugin-react';
import { getThemeVariables } from 'antd/dist/theme';
import { defineConfig } from 'vite';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        modifyVars: getThemeVariables({}),
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
    ],
  },
});
