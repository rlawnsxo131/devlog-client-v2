import styled from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import PostCardSkelleton from './PostCardSkelleton';

interface PostsSkelletonProps {}

function PostsSkelleton(props: PostsSkelletonProps) {
  return (
    <Block>
      {Array.from({ length: 9 }).map((_, i) => (
        <PostCardSkelleton key={`post_card_skelleton_${i}`} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  width: 100%;
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

export default PostsSkelleton;
