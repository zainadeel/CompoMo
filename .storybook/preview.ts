import type { Preview } from '@storybook/react-vite';
import '@ds-mo/tokens';
import '@ds-mo/tokens/reset';
import '@ds-mo/tokens/globals';
import '@ds-mo/tokens/utilities';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Toggle light/dark theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',

    backgrounds: {
      value: 'light'
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const html = document.documentElement;
      html.setAttribute('data-theme', theme);

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#f0f0f0' },
        dark: { name: 'dark', value: '#1a1a1a' },
        white: { name: 'white', value: '#ffffff' }
      }
    },
  },
};

export default preview;
