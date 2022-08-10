import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const proxyEnv = process.env.PROXY_ENV || 'dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host:"0.0.0.0",
    port: 3000,
    open: true,
  }
})
