import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port: 5172, // must be a port other than 5173
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  }
})
