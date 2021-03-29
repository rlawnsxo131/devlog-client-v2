import { css } from '@emotion/react';
import palette from '../../../lib/styles/palette';

interface MenuIconProps {
  height: number;
  width: number;
  onClick: () => void;
  className: string;
  darkmode: boolean;
}

function MenuIcon({
  height,
  width,
  onClick,
  className,
  darkmode,
}: MenuIconProps) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height={height}
      width={width}
      viewBox="0 0 24 24"
      className={className}
      css={block(darkmode)}
    >
      <g className={className}>
        <path className={className} d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g className={className}>
        <g className={className}>
          <g className={className}>
            <path
              className={className}
              d="M6,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S7.1,10,6,10z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

const block = (darkmode: boolean) => css`
  border-radius: 100%;
  box-shadow: 1px 1px 5px 2px ${darkmode ? 'black' : palette.gray5};
  &:hover {
    box-shadow: 1px 1px 10px 2px ${darkmode ? 'black' : palette.gray5};
  }
`;

export default MenuIcon;
