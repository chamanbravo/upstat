import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const BACKEND_URL = "http://localhost:8000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        // setting origin in headers is important
        // becuase it returns csrf failed (does not trust the origin error)
        target: BACKEND_URL,
        changeOrigin: true,
        headers: {
          origin: BACKEND_URL,
        },
      },
      "/admin/": {
        // same configuration as /api/
        target: BACKEND_URL,
        changeOrigin: true,
        headers: {
          origin: BACKEND_URL,
        },
      },
      "/static/": {
        // setting origin header is not required because
        // static urls are all GET and does not use csrftoken
        changeOrigin: true,
        target: BACKEND_URL,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
