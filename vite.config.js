import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import path from "path";
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  base: '/music-app/',
 define: {
  APP_VERSION: JSON.stringify(process.env.npm_package_version),
 },
 css: {
  postcss: {
    plugins: [
      autoprefixer({}) // add options if needed
    ],
  }
},
 server: {
  proxy: {
   "/api": {
    // target: "http://onlinestats.info:8000/",
    changeOrigin: true,
    secure: false,
   },
  },
 },
 resolve: {
  alias: {
   "@": path.resolve(__dirname, "./src"),
  },
 },
})
