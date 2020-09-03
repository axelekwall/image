import {
  addQueryString,
  getQueryString,
  QueryStringProps,
} from '@axelekwall/image-shared';

export interface GetSanityUrlProps extends QueryStringProps {
  baseUrl: string;
}

export type GetSanityUrl = (config: GetSanityUrlProps) => string;

const getSanityUrl: GetSanityUrl = ({ baseUrl, ...props }) => {
  return addQueryString(baseUrl, getQueryString(props));
};

export default getSanityUrl;
