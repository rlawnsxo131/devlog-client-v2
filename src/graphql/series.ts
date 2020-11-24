import { PostType } from './post';
import gql from 'graphql-tag';

export type SeriesType = {
  id: number;
  series_name: string;
  posts: Array<PostType>;
  __typename?: string;
};

export const GET_SERIES = gql`
  {
    series {
      id
      series_name
      posts {
        id
        post_header
      }
    }
  }
`;
