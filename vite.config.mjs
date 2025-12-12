import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  base: "/ThreejsWebsite/", // Ensure assets are looked for in the correct subdirectory on GitHub Pages
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

