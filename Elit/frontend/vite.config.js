import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),chunkSplitPlugin()],
=======

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
})
