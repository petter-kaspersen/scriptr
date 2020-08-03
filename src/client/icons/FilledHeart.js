import * as React from 'react';

function SvgComponent({width = 25, height} = 25) {
  return (
    <svg viewBox="0 0 140 140" width={width} height={height} >
      <path
        d="M135.917 29.61a38.395 38.395 0 00-60.935-9.975L70 24.191l-4.824-4.393a38.045 38.045 0 00-33.18-10.535A37.753 37.753 0 004.083 29.604a37.333 37.333 0 007.059 43.57L65.817 129.5a5.833 5.833 0 008.365 0l54.6-56.222a37.415 37.415 0 007.135-43.668z"
        fill="#da4747"
      />
    </svg>
  );
}

export default SvgComponent;
