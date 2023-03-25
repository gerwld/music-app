import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  base: '/music-app/',
 define: {
  APP_VERSION: JSON.stringify(process.env.npm_package_version),
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
