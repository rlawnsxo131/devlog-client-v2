import { memo } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface TextAreaProps {
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ name, value, placeholder, onChange }: TextAreaProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <textarea
      css={block(darkmode)}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

const block = (darkmode: boolean) => css`
  all: unset;
  padding: 1rem 1rem 1.5rem 1rem;
  border-radius: 4px;
  min-height: 6.125rem;
  line-height: 1.75;
  ::placeholder {
    color: ${palette.gray5};
  }
  ${darkmode
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
