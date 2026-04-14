import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // Mirror the @/ path alias from the library's vite.config.ts so story
    // imports like `@/components/Text` resolve correctly inside Storybook.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...((config.resolve.alias as Record<string, string>) || {}),
      '@': resolve(__dirname, '../src'),
    };

    // When deploying to GitHub Pages the site lives at /CompoMo/ — set the
    // Vite base path so all asset URLs (JS chunks, CSS, fonts) resolve correctly.
    if (process.env.STORYBOOK_BASE_URL) {
      config.base = process.env.STORYBOOK_BASE_URL;
    }
    return config;
  },
};

export default config;
