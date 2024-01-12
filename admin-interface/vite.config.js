import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      vue2Dependencies: ['@vue-leaflet/vue-leaflet'],
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['router-link', 'LMap'].includes(tag),
        }
      }
    }),
  ],
  server: {    // <-- this object is added
    host: true,
    port: 1338
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

