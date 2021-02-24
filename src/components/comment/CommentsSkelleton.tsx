import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';

interface CommentsSkelletonProps {}

function CommentsSkelleton(props: CommentsSkelletonProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Block>
      <Paragraph
        css={css`
          height: 2rem;
          margin-top: 3rem;
        `}
      />
      <Paragraph
        css={css`
          margin-top: 1rem;
          height: 12rem;
        `}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <CommentCardBlock key={`comments_skelleton_${i}`} darkmode={darkmode}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Paragraph
              key={`comment_card_text_${i}`}
              css={css`
                height: 1rem;
                margin-bottom: 1rem;
              `}
            />
          ))}
        </CommentCardBlock>
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentCardBlock = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default CommentsSkelleton;
