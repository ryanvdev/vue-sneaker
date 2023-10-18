import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
    },
    build: {
        outDir: path.resolve(__dirname, '../docs/'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
});
