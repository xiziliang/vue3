import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

const proxyEnv = process.env.PROXY_ENV || 'dev';

const rootPath = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(rootPath, 'src'),
      '~@': path.resolve(rootPath, 'src'),
    }
  },
  plugins: [vue()],
  server: {
    host:"0.0.0.0",
    port: 3000,
    open: true,
  }
})
