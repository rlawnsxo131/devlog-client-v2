import { css } from '@emotion/react';
import media, { mediaQuery } from '../../lib/styles/media';
import Paragraph from '../common/Paragraph';

interface PostSkeletonProps {}

function PostSkeleton(props: PostSkeletonProps) {
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
            key={`post_detail_skeleton_tag_${i}`}
            style={css`
              width: 5rem;
              height: 1.5rem;
              margin: 0.125rem 1rem 0 0;
              border-radius: 0.25rem;
            `}
          />
        ))}
      </div>
      <div css={thumnail}>
        <Paragraph
          style={css`
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}
          className="thumbnail-skeleton"
        />
      </div>
      <div css={content}>
        {Array.from({ length: 30 }).map((_, i) => (
          <Paragraph
            key={`post_detil_skeleton_${i}`}
            className="content-skeleton"
          />
        ))}
      </div>
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

const thumnail = css`
  position: relative;
  padding-top: 52.35%;
  .thumbnail-skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const content = css`
  margin-top: 2rem;
  .content-skeleton {
    ${media.xsmall} {
      height: 1.125rem;
      & + .content-skeleton {
        margin-top: 0.725rem;
      }
    }
    ${mediaQuery(560)} {
      height: 1.5rem;
      & + .content-skeleton {
        margin-top: 1rem;
      }
    }
    ${media.medium} {
      height: 1.725rem;
      & + .content-skeleton {
        margin-top: 1.125rem;
      }
    }
  }
`;

const tagsWrapper = css`
  flex: 1.5;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

export default PostSkeleton;
