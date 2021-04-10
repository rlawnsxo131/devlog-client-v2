import { memo } from 'react';
import { css } from '@emotion/react';
import media from '../../lib/styles/media';
import palette, { buttonColorMap } from '../../lib/styles/palette';

type ColorType = 'darkGray' | 'red' | 'indigo';
type SizeType = 'default' | 'responsive';

interface ButtonProps {
  name?: string;
  value?: any;
  color?: ColorType;
  size?: SizeType;
  inline?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  children: React.ReactNode;
}

function Button({
  name,
  value,
  color = 'darkGray',
  size = 'default',
  inline = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      name={name}
      value={value}
      onClick={onClick}
      css={block(color, size, inline)}
    >
      {children}
    </button>
  );
}

const block = (color: ColorType, size: SizeType, inline: boolean) => css`
  cursor: pointer;
  outline-color: ${palette.indigo9};
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  font-weight: bold;
  color: ${buttonColorMap[color].color};
  background: ${buttonColorMap[color].background};
  &:focus,
  &:hover {
    background: ${buttonColorMap[color].hoverBackground};
  }
  ${size === 'default'
    ? css`
        padding: 0.5rem 1rem 0.5rem 1rem;
      `
    : css`
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        width: 100%;
      `}
  ${inline &&
  css`
    margin-left: 0.5rem;
  `}
  ${media.xsmall} {
    font-size: 0.9rem;
  }
  ${media.medium} {
    font-size: 1rem;
  }
`;

export default memo(Button);
