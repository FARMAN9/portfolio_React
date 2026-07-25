import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three') || id.includes('@react-spring')) {
            return 'three-scene';
          }
          if (id.includes('node_modules/react') || id.includes('react-router-dom') || id.includes('@reduxjs/toolkit')) {
            return 'react-vendor';
          }
          if (id.includes('src/Components/Admin')) {
            return 'admin';
          }
          if (id.includes('src/Components/Chatbot')) {
            return 'chatbot';
          }
        },
      },
    },
  },
})
