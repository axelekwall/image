import { Format, ImageSize, SrcSet } from './types';

export interface GetSanitySourceProps {
  baseUrl: string;
  size: ImageSize;
  blurUp?: boolean;
  fluid?: boolean;
  quality?: number;
  formats?: Array<Format>;
  sizes?: string;
  resolutions?: Array<number>;
  widths?: Array<number>;
  width?: number;
}

export type GetSanitySource = (props: GetSanitySourceProps) => {
  src: string;
  lowResSrc?: string;
  srcSets: Array<SrcSet>;
  size: ImageSize;
};

export const getSanitySource: GetSanitySource = () => {


  return {
    src,
    lowResSrc,
    srcSets,
    size,
  };
};
