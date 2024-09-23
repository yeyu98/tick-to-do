/*
 * @Author: yeyu98
 * @Date: 2024-09-12 21:10:16
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-23 20:15:42
 * @Description:
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    open: true,
  },
})
