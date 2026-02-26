import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar dados dos prompts em chunk próprio (~2MB)
          if (id.includes("prompts.json")) {
            return "prompts-data";
          }
          // Separar streamdown e suas dependências pesadas (mermaid, shiki, cytoscape)
          if (
            id.includes("streamdown") ||
            id.includes("mermaid") ||
            id.includes("shiki") ||
            id.includes("cytoscape") ||
            id.includes("katex") ||
            id.includes("marked")
          ) {
            return "markdown-renderer";
          }
          // Separar Radix UI em chunk próprio
          if (id.includes("@radix-ui")) {
            return "ui-components";
          }
          // Separar React e React DOM
          if (id.includes("react-dom") || (id.includes("/react/") && id.includes("node_modules"))) {
            return "react-vendor";
          }
          // Separar recharts
          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts";
          }
          // Separar framer-motion
          if (id.includes("framer-motion")) {
            return "animations";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
