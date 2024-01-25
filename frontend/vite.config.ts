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
      { find: '@styled-system', replacement: path.resolve(__dirname, 'styled-system') },
      { find: '~bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap') },
    ],
  },
  define: {
    'import.meta.env.SERVER_IP': JSON.stringify(process.env.SERVER_IP || 'localhost'),
  },
});
