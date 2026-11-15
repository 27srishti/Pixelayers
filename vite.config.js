import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Relative base + fixed file names, so the build can be hosted anywhere (and dropped into a static host as is).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: { entryFileNames: 'assets/site.js', chunkFileNames: 'assets/[name].js', assetFileNames: 'assets/site[extname]' },
    },
  },
});
