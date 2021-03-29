import { css } from '@emotion/react';
import media, { mediaQuery } from '../../lib/styles/media';
import Paragraph from '../common/Paragraph';

interface PostSkelletonProps {}

function PostSkelleton(props: PostSkelletonProps) {
  return (
    <div css={block}>
      <Paragraph
        style={css`
          height: 2.5rem;
          margin-top: 2.1775rem;
          margin-bottom: 2.1775rem;
        `}
      />
      <div css={tagsWrapper}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Paragraph
            key={`post_detail_skelleton_tag_${i}`}
            style={css`
              width: 5rem;
              height: 1.5rem;
              margin-right: 1rem;
              border-radius: 0.25rem;
            `}
          />
        ))}
      </div>
      <Paragraph
        style={css`
          height: 20rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        `}
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <Paragraph
          key={`post_detil_skelleton_${i}`}
          style={css`
            height: 1.5rem;
            margin-top: 0.5rem;
          `}
        />
      ))}
      <Paragraph
        style={css`
          height: 10rem;
          margin-top: 1rem;
        `}
      />
    </div>
  );
}

const block = css`
  display: flex;
  flex-direction: column;
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 736px;
  }
  ${mediaQuery(800)} {
    width: 768px;
  }
`;

const tagsWrapper = css`
  flex: 1.5;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

export default PostSkelleton;
