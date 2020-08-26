// Button.stories.tsx

import React, { FC } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import ReactImage from './ReactImage';

export default {
  title: 'Image',
  component: ReactImage,
} as Meta;


export const Default: FC = () => <ReactImage />
