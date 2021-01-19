import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';

type PharagraphProps = {
  css?: FlattenSimpleInterpolation;
};

function Pharagraph({ css }: PharagraphProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return <Block darkmode={darkmode} css={css} />;
}

const Block = styled.div<{
  darkmode: boolean;
  css?: FlattenSimpleInterpolation;
}>`
  display: block;
  background: ${(props) => (props.darkmode ? palette.gray7 : palette.gray1)};
  animation: ${transitions.shining} 1s ease-in-out infinite;
  ${(props) => props.css && props.css}
`;

export default Pharagraph;
