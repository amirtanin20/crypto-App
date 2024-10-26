import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // یا آدرس IP محلی
    port: 4000, // پورتی که می‌خواهید استفاده کنید
  },
})
