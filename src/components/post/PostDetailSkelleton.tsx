import * as React from 'react';
import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import Pharagraph from '../common/Pharagraph';

type PostDetailSkelletonProps = {};

function PostDetailSkelleton(props: PostDetailSkelletonProps) {
  return (
    <Block>
      <Pharagraph
        css={css`
          flex: 2.5;
          margin-bottom: 1.5rem;
        `}
      />
      <TagsWrapper>
        {Array.from({ length: 4 }).map((_, i) => (
          <Pharagraph key={`post_detail_skelleton_tag_${i}`} css={tagCss} />
        ))}
      </TagsWrapper>
      {Array.from({ length: 20 }).map((_, i) => (
        <Pharagraph key={`post_detil_skelleton_${i}`} css={textCss} />
      ))}
      <Pharagraph
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
`;

export default PostDetailSkelleton;
