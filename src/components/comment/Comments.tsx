import { memo, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Comment, GET_COMMENTS } from '../../graphql/comment';
import useError from '../../lib/hooks/useError';
import media from '../../lib/styles/media';
import CommentCards from './CommentCards';
import CommentsSkelleton from './CommentsSkelleton';
import CommentWrite from './CommentWrite';

interface CommentsProps {
  post_id: number;
}

function Comments({ post_id }: CommentsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{
    comments: Array<Comment>;
    commentsCount: number;
  }>(GET_COMMENTS, {
    variables: {
      post_id,
    },
  });

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <CommentsSkelleton />;
  if (error) return null;

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
  margin-top: 3rem;
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
