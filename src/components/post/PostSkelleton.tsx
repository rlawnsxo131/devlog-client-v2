import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import Paragraph from '../common/Paragraph';

interface PostSkelletonProps {}

function PostSkelleton(props: PostSkelletonProps) {
  return (
    <Block>
      <Paragraph
        css={css`
          height: 2.5rem;
          margin-top: 2.1775rem;
          margin-bottom: 2.1775rem;
        `}
      />
      <TagsWrapper>
        {Array.from({ length: 3 }).map((_, i) => (
          <Paragraph
            key={`post_detail_skelleton_tag_${i}`}
            css={css`
              width: 5rem;
              height: 1.5rem;
              margin-right: 1rem;
              border-radius: 0.25rem;
            `}
          />
        ))}
      </TagsWrapper>
      <Paragraph
        css={css`
          height: 20rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        `}
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <Paragraph
          key={`post_detil_skelleton_${i}`}
          css={css`
            height: 1.5rem;
            margin-top: 0.5rem;
          `}
        />
      ))}
      <Paragraph
        css={css`
          height: 10rem;
          margin-top: 1rem;
        `}
      />
    </Block>
  );
}

const Block = styled.div`
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

const TagsWrapper = styled.div`
  flex: 1.5;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

export default PostSkelleton;
