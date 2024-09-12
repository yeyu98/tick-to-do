import { defineConfig } from 'vite'
import eslintPlugin from ''
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
})
