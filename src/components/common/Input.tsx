import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

type InputProps = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
};

const { memo } = React;
function Input({
  type,
  name,
  placeholder,
  value,
  onChange,
  inputRef,
}: InputProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <InputBlock
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={inputRef}
      darkmode={darkmode}
    />
  );
}

const InputBlock = styled.input<{ darkmode: boolean }>`
  all: unset;
  border-radius: 4px;
  padding: 0.5rem;
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
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${palette.gray5};
  }
`;

export default memo(Input);
