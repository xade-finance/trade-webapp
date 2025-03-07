import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
        "process.env": process.env,
    },
  optimizeDeps: {
    exclude: ['chunk-UUUESP7M']
  }
});
