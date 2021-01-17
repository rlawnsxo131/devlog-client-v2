import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Pharagraph from '../common/Pharagraph';

type PostCardSkelletonProps = {};

function PostCardSkelleton(props: PostCardSkelletonProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Block darkmode={darkmode}>
      <Pharagraph
        css={css`
          flex: 10;
        `}
      />
      <Pharagraph css={textCss} />
      <Pharagraph css={textCss} />
      <Pharagraph css={textCss} />
      <Pharagraph css={textCss} />
      <Pharagraph css={textCss} />
      <Pharagraph
        css={css`
          flex: 3;
          margin-top: 1rem;
        `}
      />
    </Block>
  );
}

const textCss = css`
  flex: 1;
  margin: 1rem 0.25rem 0 0.25rem;
`;

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.darkmode
      ? css`
          box-shadow: 1px 1px 5px 2px ${palette.gray9};
        `
      : css`
          box-shadow: 1px 1px 5px 2px ${palette.gray1};
        `};
  /* border: 1px solid black; */
`;

export default PostCardSkelleton;
