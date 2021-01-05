import gql from 'graphql-tag';

export type SeriesPostType = {
  series_id: number;
  series_name: string;
  post_id: number;
  url_slug: string;
  post_header: string;
};

export type PostType = {
  id: number;
  post_header: string;
  post_body: string;
  short_description: string;
  preview_description: string;
  thumnail?: string;
  open_yn?: boolean;
  series_id: number;
  url_slug: string;
  released_at: Date;
  tags: Array<string>;
  comments_count: number;
  series_posts: Array<SeriesPostType>;
};

export const GET_POST = gql`
  query Post($url_slug: String!) {
    post(url_slug: $url_slug) {
      id
      post_header
      post_body
      short_description
      thumnail
      open_yn
      series_id
      url_slug
      released_at
      tags
      series_posts {
        series_id
        series_name
        post_id
        url_slug
        post_header
      }
    }
  }
`;

export const GET_POSTS = gql`
  query Posts($tag: String) {
    posts(tag: $tag) {
      id
      post_header
      short_description
      preview_description
      thumnail
      series_id
      url_slug
      released_at
      tags
      comments_count
    }
  }
`;
