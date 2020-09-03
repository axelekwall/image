export interface ImageSize {
  width?: number;
  height?: number;
}

export interface SrcSet {
  srcSet: string;
  type: string;
}

export interface Format {
  type: string;
  name: FormatName;
}

export type Fit = 'crop' | 'scale' | 'pad' | 'fill';
export type SanityFit = 'min' | 'max' | 'clip' | 'fillmax' | Fit;
export type ContentfulFit = 'pad' | Fit;

export type FormatName = 'jpg' | 'png' | 'webp' | 'original';

export interface QueryStringProps {
  size?: ImageSize;
  fit?: ContentfulFit;
  format: FormatName;
  quality?: number;
  resolution?: number;
}
