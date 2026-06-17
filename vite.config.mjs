import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8085,
  },
  build: {
    rollupOptions: {
      // SimpliiGood multi-page site. Home (index) is the brand division-chooser;
      // simplii-green is the consumer/retail experience; texture/about/food-service
      // share public/site.css + public/site.js.
      input: {
        main: resolve(__dirname, 'index.html'),
        green: resolve(__dirname, 'simplii-green.html'),
        texture: resolve(__dirname, 'texture.html'),
        about: resolve(__dirname, 'about.html'),
        foodservice: resolve(__dirname, 'food-service.html'),
      },
    },
  },
});
