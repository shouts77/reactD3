import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function RainbowPackD3() {
  const ref = useRef();

  useEffect(() => {
    //base setting
    const width = 960;
    const height = 960;
    const size = Math.max(width, height);
    const color = d3.scaleSequential([0, 2 * Math.PI], d3.interpolateRainbow);

    // base svg setting
    const svg = d3.select(ref.current).attr('viewBox', [-width / 2, -height / 2, width, height]);

    // circles
    const circles = d3
      .packSiblings(
        d3
          .range(2000)
          .map(d3.randomUniform(8, 26))
          .map((r) => ({ r })),
      )
      .filter((d) => -500 < d.x && d.x < 500 && -500 < d.y && d.y < 500);

    // attaching main chart
    svg
      .select('.plot-area')
      .append('g')
      .selectAll('circle')
      .data(circles)
      .join('circle')
      .style('fill', (d) => color((d.angle = Math.atan2(d.y, d.x))))
      .attr('cx', (d) => Math.cos(d.angle) * (size / Math.SQRT2 + 30))
      .attr('cy', (d) => Math.sin(d.angle) * (size / Math.SQRT2 + 30))
      .attr('r', (d) => d.r - 0.25)
      .transition()
      .ease(d3.easeCubicOut)
      .delay((d) => Math.sqrt(d.x * d.x + d.y * d.y) * 10)
      .duration(1000)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);
  }, []);
  return (
    <>
      <svg
        ref={ref}
        style={{
          height: '100%',
          marginRight: '10px',
          marginLeft: '10px',
        }}
      >
        <g className="plot-area" />
      </svg>
    </>
  );
}
