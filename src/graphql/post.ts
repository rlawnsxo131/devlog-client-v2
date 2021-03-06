import gql from 'graphql-tag';

export interface SeriesPostData {
  series_id: number;
  series_name: string;
  post_id: number;
  url_slug: string;
  post_header: string;
}

export interface LinkPostData {
  id: number;
  url_slug: string;
  thumbnail: string;
  post_header: string;
}

export interface PostData {
  id: number;
  post_header: string;
  post_body: string;
  preview_description: string;
  thumbnail?: string;
  open_yn?: boolean;
  series_id: number;
  url_slug: string;
  released_at: Date;
  updated_at: Date;
  tags: Array<string>;
  series_posts: Array<SeriesPostData>;
  link_posts: Array<LinkPostData>;
}

export const GET_POST = gql`
  query Post($url_slug: String!) {
    post(url_slug: $url_slug) {
      id
      post_header
      post_body
      thumbnail
      open_yn
      series_id
      url_slug
      released_at
      tags
      preview_description
      series_posts {
        series_id
        series_name
        post_id
        url_slug
        post_header
      }
      link_posts {
        id
        post_header
        url_slug
        thumbnail
      }
    }
  }
`;

export const GET_POSTS = gql`
  query Posts($tag: String) {
    posts(tag: $tag) {
      id
      post_header
      preview_description
      thumbnail
      series_id
      url_slug
      released_at
      tags
    }
  }
`;
