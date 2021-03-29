import { css, SerializedStyles } from '@emotion/react';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';

interface ParagraphProps {
  style?: SerializedStyles;
}

function Paragraph({ style }: ParagraphProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return <div css={block(darkmode, style)} />;
}

const block = (darkmode: boolean, style?: SerializedStyles) => css`
  display: block;
  background: ${darkmode ? palette.gray7 : palette.gray1};
  animation: ${transitions.shining} 1s ease-in-out infinite;
  ${style}
`;

export default Paragraph;
