import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';

interface PostCardSkelletonProps {}

function PostCardSkelleton(props: PostCardSkelletonProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Block darkmode={darkmode}>
      <Paragraph
        css={css`
          flex: 10;
        `}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <Paragraph
          key={`post_card_skelleton_${i}`}
          css={css`
            flex: 1;
            margin: 1rem 0.25rem 0 0.25rem;
          `}
        />
      ))}
      <Paragraph
        css={css`
          flex: 3;
          margin-top: 1rem;
        `}
      />
    </Block>
  );
}

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
`;

export default PostCardSkelleton;
