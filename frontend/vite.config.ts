import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
  },
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@styled-system', replacement: path.resolve(__dirname, 'styled-system') },
    ],
  },
});
