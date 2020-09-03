import {
  ImageSize,
  Format,
  SrcSet,
  addQueryString,
  getQueryString,
  QueryStringProps,
} from '@axelekwall/image-shared';
import defaults from './defaults';

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

export type GetSanitySource = (
  props: GetSanitySourceProps
) => {
  src: string;
  lowResSrc?: string;
  srcSets: Array<SrcSet>;
  size: ImageSize;
};

export interface GetSanityUrlProps extends QueryStringProps {
  baseUrl: string;
}

export type GetSanityUrl = (config: GetSanityUrlProps) => string;

const getSanityUrl: GetSanityUrl = ({ baseUrl, ...props }) =>
  addQueryString(baseUrl, getQueryString(props));

export const getSanitySource: GetSanitySource = ({
  baseUrl,
  size,
  blurUp,
  quality,
  fluid = false,
  sizes,
  ...rest
}) => {
  const { formats, width, widths, resolutions } = { ...rest, ...defaults };
  const urlConfig = {
    baseUrl,
    size,
    quality,
  };

  // src
  const src = getSanityUrl({ baseUrl, format: 'original', size });

  // lofResSrc
  const lowResSrc = blurUp
    ? getSanityUrl({
        baseUrl,
        size: { width: 30 },
        format: 'original',
        quality: 50,
      })
    : undefined;

  // srcSets
  const srcSets: Array<SrcSet> = formats.map(({ type, name }) => {
    let srcSet = '';
    const options = { type, sizes };
    if (fluid) {
      widths.forEach((w, i) => {
        srcSet = `${i > 0 ? `${srcSet}, ` : ''}${getSanityUrl({
          ...urlConfig,
          format: name,
          resolution: w,
        })} ${w * (size.width !== undefined ? size.width : width)}w`;
        if (!options.sizes) {
          options.sizes = `(max-width: ${
            size.width !== undefined ? size.width : width
          }px) 100vw, ${size.width !== undefined ? size.width : width}px`;
        }
      });
    } else {
      resolutions.forEach((r, i) => {
        srcSet = `${i > 0 ? `${srcSet},` : ''}${getSanityUrl({
          ...urlConfig,
          format: name,
          resolution: r,
        })} ${r}x`;
      });
    }
    return {
      srcSet,
      ...options,
    };
  });

  return {
    src,
    lowResSrc,
    srcSets,
    size,
  };
};
