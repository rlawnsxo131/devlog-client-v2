import { Post } from './post';
import gql from 'graphql-tag';

export type Series = {
  id: number;
  series_name: string;
  posts: Array<Post>;
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
        url_slug
      }
    }
  }
`;
