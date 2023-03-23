import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://material-star-production.up.railway.app",
      "/r": {
        target: "https://material-star-production.up.railway.app",
        ws: true,
      },
    },
  },
  plugins: [react()],
})
