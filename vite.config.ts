import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePresetOptions } from "vite";
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    react(),
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
});
