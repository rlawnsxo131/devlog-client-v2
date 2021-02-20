type MenuIconProps = {
  fill: string;
  height: number;
  width: number;
  onClick: () => void;
  className: string;
};

function MenuIcon({ fill, height, width, onClick, className }: MenuIconProps) {
  return (
    <svg
      fill={fill}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      className={className}
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

export default MenuIcon;
