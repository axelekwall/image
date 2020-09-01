// Button.stories.tsx

import React, { FC } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Image from './Image';

export default {
  title: 'Image',
  component: Image,
} as Meta;


export const Default: FC = () => <Image />
