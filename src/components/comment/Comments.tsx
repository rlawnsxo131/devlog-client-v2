import { useQuery } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { CommentType, GET_COMMENTS } from '../../graphql/comment';
import media from '../../lib/styles/media';
import CommentCards from './CommentCards';
import CommentWrite from './CommentWrite';

type CommentsProps = {
  post_id: number;
};

const { memo } = React;
function Comments({ post_id }: CommentsProps) {
  const { loading, error, data } = useQuery<{
    comments: Array<CommentType>;
    commentsCount: number;
  }>(GET_COMMENTS, {
    variables: {
      post_id,
    },
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <Block>
      <CommentsCount>{data?.commentsCount}개의 댓글</CommentsCount>
      <CommentWrite post_id={post_id} />
      <CommentCards replies={data?.comments} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  margin-bottom: 10rem;
  ${media.xsmall} {
    font-size: 1rem;
  }
  ${media.small} {
    font-size: 1.125rem;
  }
`;

const CommentsCount = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

export default memo(Comments);
