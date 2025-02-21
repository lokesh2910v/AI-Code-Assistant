import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';




export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port:3000, // Use Replit’s assigned port
    host: '0.0.0.0', // Allow external access
  },
  resolve: {
    alias: {
      'react-monaco-editor': 'react-monaco-editor/lib/editor',
    },
  },
});