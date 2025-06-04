import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  resolve:{
    alias: {
      '@': Path.resolve(__dirname, 'src'),
      '@componets': Path.resolve(__dirname, 'src/components'),
    },
  }
});