import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

type DefaultTagProps = {
  name: string;
};

function DefaultTag({ name }: DefaultTagProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return <Block darkmode={darkmode}>{name}</Block>;
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  color: ${palette.indigo9};
  font-weight: 600;
  background: ${(props) => (props.darkmode ? palette.gray8 : palette.gray1)};
  border-radius: 1rem;
  ${media.xsmall} {
    font-size: 0.9rem;
  }
  ${media.small} {
    font-size: 1rem;
  }
`;

export default DefaultTag;
