import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';

interface PostCardSkelletonProps {}

function PostCardSkelleton(props: PostCardSkelletonProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <div css={block(darkmode)}>
      <Paragraph
        style={css`
          flex: 10;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        `}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <Paragraph
          key={`post_card_skelleton_${i}`}
          style={css`
            flex: 1;
            margin: 1rem 0.25rem 0 0.25rem;
          `}
        />
      ))}
      <Paragraph
        style={css`
          flex: 3;
          margin-top: 1rem;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        `}
      />
    </div>
  );
}

const block = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  ${darkmode
    ? css`
        box-shadow: 1px 1px 5px 2px ${palette.gray9};
      `
    : css`
        box-shadow: 1px 1px 5px 2px ${palette.gray1};
      `};
`;

export default PostCardSkelleton;
