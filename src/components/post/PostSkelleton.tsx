import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import Paragraph from '../common/Paragraph';

type PostSkelletonProps = {};

function PostSkelleton(props: PostSkelletonProps) {
  return (
    <Block>
      <Paragraph
        css={css`
          flex: 2.5;
          margin-top: 2.1775rem;
          margin-bottom: 2.1775rem;
        `}
      />
      <TagsWrapper>
        {Array.from({ length: 4 }).map((_, i) => (
          <Paragraph key={`post_detail_skelleton_tag_${i}`} css={tagCss} />
        ))}
      </TagsWrapper>
      {Array.from({ length: 20 }).map((_, i) => (
        <Paragraph key={`post_detil_skelleton_${i}`} css={textCss} />
      ))}
      <Paragraph
        css={css`
          flex: 3;
        `}
      />
    </Block>
  );
}

const textCss = css`
  flex: 1;
  margin-top: 0.5rem;
`;

const tagCss = css`
  width: 3rem;
  height: 1.5rem;
  margin-right: 1rem;
  border-radius: 0.25rem;
`;

const Block = styled.div`
  height: 85vh;
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
