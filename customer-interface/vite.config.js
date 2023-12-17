import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {    // <-- this object is added
    host: true,
    port: 1339
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }/*,
  define: {
    'process.env': {
      AUTH0_DOMAIN: "dev-yl46b5m8hfqpht5q.us.auth0.com",
      AUTH0_CLIENT_ID: "sD3sE4NcrhKampbYzR0wzpf3spojmDx5",
      AUTH0_REDIRECT_URI: "http://localhost:1339/home",
      BACKEND: "http://localhost:1337"
    }
  }*/
})
