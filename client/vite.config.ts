import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path, { join } from 'path';
import fs from 'fs';

const baseUrl = '/api/'
const server = 'http://localhost:9831'

const whiteListUrl = [
  `${baseUrl}__vite_ping`,
  `${baseUrl}css/`,
  `${baseUrl}images/`,
  `${baseUrl}fonts/`,
  `${baseUrl}icons/`,
  `${baseUrl}@vite/`,
  `${baseUrl}@react`,
  `${baseUrl}src/`,
  `${baseUrl}node_modules`,
]

const match = (originalUrl) => whiteListUrl.some(whiteUrl => originalUrl.startsWith(whiteUrl))

export default defineConfig({
  server: {
    open: '/',
    proxy: {
      '^/api*': {
        target: baseUrl,
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.originalUrl === `/api`) {
            return baseUrl
          }
          if (req.originalUrl === baseUrl || match(req.originalUrl)) {
            return req.originalUrl
          }
        }
      },
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: (a) =>
          a.name.endsWith(".tsx") ? a.name : "[name].js",
        chunkFileNames: (a) =>
          a.name.endsWith(".tsx") ? a.name : "[name].js",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const [, module] = /node_modules\/(@?[a-z0-9-]+?[a-z0-9-]+)/.exec(
              id
            );
            const path = join(
              process.cwd(),
              "node_modules",
              module,
              "package.json"
            );
            if (fs.existsSync(path)) {
              try {
                const packageJson = require(path);
                const version = packageJson.version;
                return `@vendor/${module}_${version}.js`;
              } catch (error) {
                console.error(error)
              }
            }
          }
        },
      },
      treeshake: true
    },
    outDir: './dist/',
    chunkSizeWarningLimit: 1500
  },
  base: baseUrl,
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src')
  //   },
  // },
  plugins: [react()]
});
