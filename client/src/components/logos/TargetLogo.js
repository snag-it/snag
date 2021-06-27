import React from 'react';

function TargetLogo({ width = '50px', height = '50px' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 300">
      <path
        fill="#FFF"
        stroke="#E50024"
        strokeWidth="50"
        d="M149 25a125 125 0 102 0zm2 100a25 25 0 11-2 0z"></path>
    </svg>
  );
}

export default TargetLogo;
