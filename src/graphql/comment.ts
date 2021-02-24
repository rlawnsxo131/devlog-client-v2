import gql from 'graphql-tag';

export interface Comment {
  id: number;
  post_id: number;
  level: number;
  has_replies: boolean;
  reply_comment_id?: number;
  deleted: boolean;
  writer: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  edited_at?: Date;
  replies: Array<Comment>;
}

export const GET_COMMENTS = gql`
  query Comments($post_id: ID!) {
    comments(post_id: $post_id) {
      id
      post_id
      level
      has_replies
      reply_comment_id
      deleted
      writer
      comment
      created_at
      updated_at
      edited_at
      replies {
        id
        post_id
        level
        has_replies
        reply_comment_id
        deleted
        writer
        comment
        created_at
        updated_at
        edited_at
        replies {
          id
          post_id
          level
          has_replies
          reply_comment_id
          deleted
          writer
          comment
          created_at
          updated_at
          edited_at
        }
      }
    }
    commentsCount(post_id: $post_id)
  }
`;

export interface CreateComment {
  post_id: number;
  reply_comment_id?: number;
  writer: string;
  password: string;
  comment: string;
}
export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $post_id: ID!
    $reply_comment_id: ID
    $writer: String!
    $password: String!
    $comment: String!
  ) {
    createComment(
      post_id: $post_id
      reply_comment_id: $reply_comment_id
      writer: $writer
      password: $password
      comment: $comment
    )
  }
`;

export interface UpdateComment {
  comment_id: number;
  writer?: string;
  password: string;
  email?: string;
  comment: string;
}
export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $comment_id: ID!
    $password: String!
    $writer: String
    $email: String
    $comment: String!
  ) {
    updateComment(
      comment_id: $comment_id
      password: $password
      writer: $writer
      email: $email
      comment: $comment
    )
  }
`;

export interface RemoveComment {
  comment_id: number;
  possword: string;
}
export const REMOVE_COMMENT = gql`
  mutation RemoveComment($comment_id: ID!, $password: String!) {
    removeComment(comment_id: $comment_id, password: $password)
  }
`;
