import { defineConfig, Plugin } from 'vite';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const copyIndexFilesPlugin = (): Plugin => ({
  name: 'copy-index-files',
  configResolved(_config) {
    void _config;
  },
  writeBundle() {
    const root = process.cwd();
    const srcDir = join(root, 'index_files');
    const destDir = join(root, 'dist', 'index_files');

    if (!existsSync(srcDir)) {
      return;
    }

    if (existsSync(destDir)) {
      rmSync(destDir, { recursive: true, force: true });
    }

    cpSync(srcDir, destDir, { recursive: true });
  },
});

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  plugins: [copyIndexFilesPlugin()],
});


