import { PostData } from './post';
import gql from 'graphql-tag';

export interface SeriesData {
  id: number;
  series_name: string;
  posts: Array<PostData>;
}

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
