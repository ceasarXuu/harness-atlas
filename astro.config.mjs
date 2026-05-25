import { defineConfig } from "astro/config";

export default defineConfig({
  base: "/harness-atlas/",
  output: "static",
  build: {
    format: "file",
  },
});
