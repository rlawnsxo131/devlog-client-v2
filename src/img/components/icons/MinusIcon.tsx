interface MinusIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

function MinusIcon({ fill, width, height }: MinusIconProps) {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      viewBox="0 0 24 24"
      width={height}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
}

export default MinusIcon;
