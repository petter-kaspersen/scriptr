import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg width={21} height={22} viewBox="0 0 21 22" {...props}>
      <defs>
        <filter
          x="-48%"
          y="-48%"
          width="196%"
          height="196%"
          filterUnits="objectBoundingBox"
          id="prefix__a"
        >
          <feOffset dy={2} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation={2}
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        filter="url(#prefix__a)"
        transform="translate(-1.957 -3.679)"
        fill="none"
        fillRule="evenodd"
      >
        <image
          x={6.208}
          y={6.447}
          width={12.674}
          height={12.776}
          xlinkHref="data:image/png;base64,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"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
