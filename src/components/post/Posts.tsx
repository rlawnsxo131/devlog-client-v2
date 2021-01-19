import { useQuery } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { GET_POSTS, PostType } from '../../graphql/post';
import useError from '../../lib/hooks/useError';
import media, { mediaQuery } from '../../lib/styles/media';
import PostCard from './PostCard';
import PostsSkelleton from './PostsSkelleton';

type PostsProps = {};

const { useEffect } = React;
function Posts(props: PostsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ posts: Array<PostType> }>(
    GET_POSTS,
  );

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <PostsSkelleton />;
  if (error) return null;

  return (
    <Block>
      {data?.posts.map((post) => (
        <PostCard key={`post_${post.id}`} post={post} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: grid;
  ${media.xsmall} {
    grid-auto-rows: 24rem;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem 0;
  }
  ${mediaQuery(420)} {
    grid-auto-rows: 30rem;
    grid-template-columns: repeat(1, 1fr);
  }
  ${media.small} {
    grid-auto-rows: 28rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1rem;
  }
  ${media.medium} {
    grid-auto-rows: 22rem;
    grid-template-columns: repeat(3, 1fr);
  }
  ${media.large} {
    grid-auto-rows: 24rem;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default Posts;
