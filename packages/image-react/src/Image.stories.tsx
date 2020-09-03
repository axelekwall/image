// Button.stories.tsx

import React, { FC } from 'react';
import { Meta } from '@storybook/react';
import Image from './Image';

export default {
  title: 'Image',
  component: Image,
} as Meta;

export const Default: FC = () => <div>Hej</div>;
