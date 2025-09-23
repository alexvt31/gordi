import { defineConfig } from 'vite'

export default defineConfig({
  base: '/gordi/',  // <- pon aquí el nombre exacto de tu repo
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
