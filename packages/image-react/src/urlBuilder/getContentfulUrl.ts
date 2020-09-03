import {
  addQueryString,
  getQueryString,
  QueryStringProps,
} from '@axelekwall/image-shared';

export interface GetContentfulUrlProps extends QueryStringProps {
  baseUrl: string;
}

export type GetContentfulUrl = (config: GetContentfulUrlProps) => string;

const getContentfulUrl: GetContentfulUrl = ({ baseUrl, ...props }) => {
  return addQueryString(baseUrl, getQueryString(props), 'https:');
};

export default getContentfulUrl;
