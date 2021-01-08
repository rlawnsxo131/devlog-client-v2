import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

type TextAreaProps = {
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const { memo } = React;
function TextArea({ name, value, placeholder, onChange }: TextAreaProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <TextareaBlock
      darkmode={darkmode}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

const TextareaBlock = styled.textarea<{ darkmode: boolean }>`
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
    props.darkmode
      ? css`
          border: 1px solid ${palette.gray6};
          background: ${darkmodeBackground.main};
        `
      : css`
          border: 1px solid ${palette.gray2};
          background: white;
        `}
`;

export default memo(TextArea);
