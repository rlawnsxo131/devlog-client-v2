import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../../lib/styles/media';
import { buttonColorMap } from '../../lib/styles/palette';

type ColorType = 'darkGray' | 'pink';
type SizeType = 'default' | 'responsive';

type ButtonProps = {
  name?: string;
  value?: any;
  color?: ColorType;
  size?: SizeType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  children: React.ReactNode;
};

function Button({
  name,
  value,
  color = 'darkGray',
  size = 'default',
  onClick,
  children,
}: ButtonProps) {
  return (
    <Block
      name={name}
      value={value}
      color={color}
      size={size}
      onClick={onClick}
    >
      {children}
    </Block>
  );
}

const Block = styled.button<{
  color: ColorType;
  size: SizeType;
}>`
  all: unset;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  font-weight: bold;
  ${(props) => css`
    color: ${buttonColorMap[props.color].color};
    background: ${buttonColorMap[props.color].background};
    &:hover {
      cursor: pointer;
      background: ${buttonColorMap[props.color].hoverBackground};
    }
  `};
  ${(props) =>
    props.size === 'default'
      ? css`
          padding: 0.5rem 1rem 0.5rem 1rem;
        `
      : css`
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          width: 100%;
        `}
  & + & {
    margin-left: 0.825rem;
  }
  ${media.xsmall} {
    font-size: 0.9rem;
  }
  ${media.medium} {
    font-size: 1rem;
  }
`;

export default Button;
