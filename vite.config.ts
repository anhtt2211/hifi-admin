import react from '@vitejs/plugin-react';
import { getThemeVariables } from 'antd/dist/theme';
import { defineConfig } from 'vite';

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
});
