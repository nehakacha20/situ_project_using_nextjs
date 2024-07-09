// .storybook/main.ts

import type { StorybookConfig } from '@storybook/react';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
