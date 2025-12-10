import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  publicDir: "assets",
  server: {
    open: true,
    port: 3002,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})

