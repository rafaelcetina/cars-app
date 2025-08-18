import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: '10.0.1.10'
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte()],
  env: {
    schema: {
      OPENAI_API_KEY: envField.string({
        context: 'server',
        access: 'secret'
      })
    },
    
  }
});