import { memo, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { CommentData, GET_COMMENTS } from '../../graphql/comment';
import useError from '../../lib/hooks/useError';
import media from '../../lib/styles/media';
import CommentCards from './CommentCards';
import CommentsSkelleton from './CommentsSkelleton';
import CommentWrite from './CommentWrite';

interface CommentsProps {
  post_id: number;
}

function getCommentsCount(comments: Array<CommentData>) {
  let commentsCount = 0;
  if (comments.length) {
    commentsCount += comments.length;
    comments.forEach((v, i) => {
      if (v.replies) {
        commentsCount += v.replies.length;
        v.replies.forEach((v) => {
          if (v.replies) {
            commentsCount += v.replies.length;
          }
        });
      }
    });
  }
  return commentsCount;
}

function Comments({ post_id }: CommentsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{
    comments: Array<CommentData>;
    commentsCount: number;
  }>(GET_COMMENTS, {
    variables: {
      post_id,
    },
  });
  const commentsCount = useMemo(() => {
    if (!data) return 0;
    return getCommentsCount(data.comments);
  }, [data]);

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <CommentsSkelleton />;
  if (error) return null;

  return (
    <Block>
      <CommentsCount>{commentsCount}개의 댓글</CommentsCount>
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
