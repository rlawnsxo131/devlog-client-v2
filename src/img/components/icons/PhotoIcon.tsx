interface PhotoIconProps {
  fill?: string;
}

function PhotoIcon({ fill }: PhotoIconProps) {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M6.6,16.2l2-2.67 c0.2-0.27,0.6-0.27,0.8,0L11.25,16l2.6-3.47c0.2-0.27,0.6-0.27,0.8,0l2.75,3.67c0.25,0.33,0.01,0.8-0.4,0.8H7 C6.59,17,6.35,16.53,6.6,16.2z" />
      </g>
    </svg>
  );
}

export default PhotoIcon;
