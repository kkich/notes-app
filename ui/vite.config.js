import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

function htmlVuePlugin() {
  return {
    name: 'html-vue-plugin',
    transform(src, id) {
      if (id.endsWith('.html?vue')) {
        const match = src.match(/<template>([\s\S]*)<\/template>/)
        const inner = match ? match[1].trim() : src
        const safe = inner
          .replace(/`/g, '\\`')
          .replace(/\$\{/g, '\\${')

        return {
          code: `export default \`${safe}\``,
          map: null,
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    htmlVuePlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
