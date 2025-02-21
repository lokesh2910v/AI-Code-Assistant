import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';




export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: Number(process.env.PORT) || 3000, // Use the Render-assigned port
    host: '0.0.0.0' // Required for Render to detect the open port
  },
  resolve: {
    alias: {
      'react-monaco-editor': 'react-monaco-editor/lib/editor',
    },
  },
});