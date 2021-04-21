import { css } from '@emotion/react';
import media, { mediaQuery } from '../../lib/styles/media';

interface PostCardGridLayoutProps {
  children: React.ReactNode;
}

function PostCardGridLayout({ children }: PostCardGridLayoutProps) {
  return <div css={block}>{children}</div>;
}

const block = css`
  width: 100%;
  display: grid;
  ${media.xsmall} {
    grid-auto-rows: 21rem;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem 0;
  }
  ${mediaQuery(375)} {
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
    grid-auto-rows: 21rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem 1rem;
  }
  ${media.large} {
    grid-auto-rows: 24rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem 1.5rem;
  }
`;

export default PostCardGridLayout;
