import gql from 'graphql-tag';

export type CommentType = {
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
  replies: Array<CommentType>;
};

export const GET_COMMENTS = gql`
  query GetComments($post_id: ID!) {
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
  }
`;

export const GET_COMMENTS_COUNT = gql`
  query GetCommentsCount($post_id: ID!) {
    commentsCount(post_id: $post_id)
  }
`;

export type CreateCommentType = {
  post_id: number;
  reply_comment_id?: number;
  writer: string;
  password: string;
  comment: string;
};
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
    ) {
      id
    }
  }
`;

export const CONFIRM_PASSWORD = gql`
  query ConfirmPassword($comment_id: ID!, $password: String!) {
    confirmPassword(comment_id: $comment_id, password: $password) {
      email
    }
  }
`;

export type UpdateCommentType = {
  comment_id: number;
  email?: string;
  comment: string;
};
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($comment_id: ID!, $email: String, $comment: String!) {
    updateComment(comment_id: $comment_id, email: $email, comment: $comment)
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($comment_id: ID!) {
    removeComment(comment_id: $comment_id)
  }
`;
