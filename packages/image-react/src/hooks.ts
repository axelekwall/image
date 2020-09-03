import {
  useRef,
  useEffect,
  CSSProperties,
  RefObject,
  useCallback,
  useState,
  useMemo,
} from 'react';

import { ImageSize, Format, SrcSet } from './types';
import defaults from './defaults';
import urlBuilder from './urlBuilder'

interface UseSanityImageProps {
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

type UseSanityImage = (
  config: UseSanityImageProps
) => {
  src: string;
  lowResSrc?: string;
  srcSets: Array<SrcSet>;
  size: ImageSize;
};

export const useSanityImage: UseSanityImage = ({
  baseUrl,
  size,
  blurUp,
  quality,
  fluid = false,
  sizes,
  ...rest
}) => {
  const { formats, width, widths, resolutions } = { ...rest, ...defaults };
  const urlConfig = useMemo(
    () => ({
      baseUrl,
      size,
      quality,
    }),
    [size, baseUrl, quality]
  );
  const src = useMemo<string>(
    () =>
      urlBuilder.getSanityUrl({
        baseUrl,
        format: 'original',
        size,
      }),
    [baseUrl, size]
  );
  const lowResSrc = useMemo<string | undefined>(
    () =>
      blurUp
        ? urlBuilder.getSanityUrl({
            baseUrl,
            size: { width: 30 },
            format: 'original',
            quality: 50,
          })
        : undefined,
    [baseUrl]
  );
  const srcSets = useMemo<Array<SrcSet>>(
    () =>
      formats.map(({ type, name }) => {
        let srcSet = '';
        const options = { type, sizes };
        if (fluid) {
          widths.forEach((w, i) => {
            srcSet = `${i > 0 ? `${srcSet}, ` : ''}${urlBuilder.getSanityUrl({
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
            srcSet = `${i > 0 ? `${srcSet},` : ''}${urlBuilder.getSanityUrl({
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
      }),
    [formats, baseUrl]
  );
  return { src, srcSets, lowResSrc, size };
};

interface UseContentfulImageProps {
  baseUrl: string;
  size: ImageSize;
  formats?: Array<Format>;
}

type UseContentfulImage = (
  config: UseContentfulImageProps
) => {
  src: string;
  lowResSrc: string;
  srcSets: Array<SrcSet>;
  size: ImageSize;
};

export const useContentfulImage: UseContentfulImage = ({
  baseUrl,
  size,
  formats = defaults.formats,
}) => {
  const src = useMemo<string>(
    () =>
      urlBuilder.getContentfulUrl({
        baseUrl,
        format: 'original',
      }),
    [baseUrl, size]
  );
  const lowResSrc = useMemo<string>(
    () =>
      urlBuilder.getContentfulUrl({
        baseUrl,
        size: { width: 30 },
        format: 'jpg',
        quality: 50,
      }),
    [baseUrl]
  );
  const srcSets = useMemo<Array<SrcSet>>(
    () =>
      formats.map(({ type, name }) => ({
        srcSet: `${urlBuilder.getContentfulUrl({
          size,
          baseUrl,
          format: name,
        })}, 
    ${urlBuilder.getContentfulUrl({
      size,
      baseUrl,
      format: name,
      resolution: 1.5,
    })} 1.5x, 
    ${urlBuilder.getContentfulUrl({
      size,
      baseUrl,
      format: name,
      resolution: 2,
    })} 2x`,
        type,
      })),
    [formats, baseUrl]
  );
  return { src, srcSets, lowResSrc, size };
};

type UseIEObjectFitPolyfill = (
  style: CSSProperties
) => {
  imgRef: RefObject<HTMLImageElement>;
  polyfillStyle: CSSProperties;
};

export const useIEObjectFitPolyfill: UseIEObjectFitPolyfill = ({
  objectFit,
  objectPosition,
}) => {
  const imgRef = useRef(null);
  useEffect(() => {
    const testImg = document.createElement('img');
    if (
      typeof testImg.style.objectFit === 'undefined' ||
      typeof testImg.style.objectPosition === 'undefined'
    ) {
      import('object-fit-images').then(({ default: ObjectFitImages }) => {
        ObjectFitImages(imgRef.current);
      });
    }
  }, [imgRef]);
  return {
    imgRef,
    polyfillStyle: {
      objectFit,
      objectPosition,
      fontFamily: `object-fit: ${objectFit}; object-position: ${objectPosition}`,
    },
  };
};

type UseImgLazyLoad = (
  url?: string
) => { loaded: boolean; preloaded: boolean; onLoaded: () => void };

export const useImgLazyLoad: UseImgLazyLoad = (url) => {
  const lazyLoad = typeof url !== 'undefined';
  const [loaded, setLoaded] = useState(!lazyLoad);
  const [preloaded, setPreloaded] = useState(!lazyLoad);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  useEffect(() => {
    if (typeof url === 'undefined') return;
    const lowImg = new Image();
    lowImg.src = url;
    lowImg.onload = (): void => {
      setPreloaded(true);
    };
  }, [url, setPreloaded, lazyLoad]);
  return { loaded, preloaded, onLoaded };
};
