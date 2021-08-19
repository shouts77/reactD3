import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HelloD3 = () => {
  const ref = useRef();

  useEffect(() => {
    draw();
  });

  const draw = () => {
    d3.select(ref.current).append('p').text('Hello World');
    d3.select('svg')
      .append('g')
      .attr('transform', 'translate(250, 0)')
      .append('rect')
      .attr('width', 500)
      .attr('height', 500)
      .attr('fill', 'tomato');
  };

  return (
    <div className="HelloD3" ref={ref}>
      <svg width="500" height="500">
        <g transform="translate(0, 0)">
          <rect width="500" height="500" fill="green" />
        </g>
      </svg>
    </div>
  );
};

export default HelloD3;
