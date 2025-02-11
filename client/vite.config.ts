import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
  },
  server: { proxy: { "/api": "http://localhost:3000" } },
});
