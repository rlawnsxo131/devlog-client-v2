import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette, { darkModeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

type TextAreaProps = {
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({ name, value, onChange }: TextAreaProps) {
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );
  return (
    <TextareaBlock
      darkMode={darkMode}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

const TextareaBlock = styled.textarea<{ darkMode: boolean }>`
  all: unset;
  resize: none;
  padding: 1rem 1rem 1.5rem 1rem;
  outline: none;
  border-radius: 4px;
  min-height: 6.125rem;
  line-height: 1.75;
  ::placeholder {
    color: ${palette.gray5};
  }
  ${(props) =>
    props.darkMode
      ? css`
          border: 1px solid ${palette.gray6};
          background: ${darkModeBackground.main};
        `
      : css`
          border: 1px solid ${palette.gray2};
          background: white;
        `}
`;

export default TextArea;
