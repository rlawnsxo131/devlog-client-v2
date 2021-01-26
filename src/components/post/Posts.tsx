import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';
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
  const { tag } = useParams<{ tag?: string }>();
  const { loading, error, data } = useQuery<
    { posts: Array<PostType> },
    { tag?: string }
  >(GET_POSTS, {
    variables: {
      tag,
    },
  });

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <PostsSkelleton />;
  if (error) return null;

  return (
    <Block>
      {tag && <h3>#{tag}</h3>}
      <GridBlock>
        {data?.posts.map((post) => (
          <PostCard key={`post_${post.id}`} post={post} />
        ))}
      </GridBlock>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const GridBlock = styled.div`
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
