import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // Ensure the @/ path alias resolves to src/. The alias is also in
    // vite.config.ts, but that file uses __dirname (CJS shim) which may
    // not survive Storybook's config merge in a type:module project.
    // Push onto the array to preserve any existing aliases.
    config.resolve = config.resolve || {};
    const aliases = Array.isArray(config.resolve.alias)
      ? config.resolve.alias
      : [];
    aliases.push({ find: '@', replacement: resolve(__dirname, '../src') });
    config.resolve.alias = aliases;

    // When deploying to GitHub Pages the site lives at /CompoMo/ — set the
    // Vite base path so all asset URLs (JS chunks, CSS, fonts) resolve correctly.
    if (process.env.STORYBOOK_BASE_URL) {
      config.base = process.env.STORYBOOK_BASE_URL;
    }
    return config;
  },
};

export default config;
