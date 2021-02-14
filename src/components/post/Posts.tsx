import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { GET_POSTS, PostType } from '../../graphql/post';
import useError from '../../lib/hooks/useError';
import media, { mediaQuery } from '../../lib/styles/media';
import { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import PostCard from './PostCard';
import PostsSkelleton from './PostsSkelleton';

type PostsProps = {};

const { useEffect } = React;
function Posts(props: PostsProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
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
    <Block darkmode={darkmode}>
      {tag && <h3>#{tag}</h3>}
      <GridBlock>
        {data?.posts.map((post) => (
          <PostCard key={`post_${post.id}`} post={post} />
        ))}
      </GridBlock>
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  /* ${(props) =>
    props.darkmode
      ? css`
          background: ${darkmodeBackground.main};
        `
      : css`
          background: white;
        `}; */
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
  ${mediaQuery(600)} {
    grid-auto-rows: 36rem;
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
