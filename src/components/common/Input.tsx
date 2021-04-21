import { memo } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface InputProps {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

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
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={inputRef}
      css={block(darkmode)}
    />
  );
}

const block = (darkmode: boolean) => css`
  all: unset;
  outline: none;
  padding: 0.5rem;
  border-radius: 4px;
  /* font-size: 1rem; */
  ${darkmode
    ? css`
        border: 1px solid ${palette.gray6};
        background: ${darkmodeBackground.main};
      `
    : css`
        border: 1px solid ${palette.gray2};
        background: ${palette.white}; ;
      `}
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${palette.gray5};
  }
`;

export default memo(Input);
