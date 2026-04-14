import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // The @/ path alias is defined in vite.config.ts and auto-merged by
    // @storybook/builder-vite. Do NOT re-add it here — the merged
    // config.resolve.alias is an array, and spreading it as an object
    // destroys all existing aliases.

    // When deploying to GitHub Pages the site lives at /CompoMo/ — set the
    // Vite base path so all asset URLs (JS chunks, CSS, fonts) resolve correctly.
    if (process.env.STORYBOOK_BASE_URL) {
      config.base = process.env.STORYBOOK_BASE_URL;
    }
    return config;
  },
};

export default config;
