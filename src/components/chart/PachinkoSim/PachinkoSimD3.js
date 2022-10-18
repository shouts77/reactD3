import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function PachinkoSimD3() {
  const ref = useRef();

  useEffect(() => {
    
    function* gen() {
    //base setting
    const width = 300;
    const height = 300;
    const adjmargin = height / 2;
    const n = 300;
    const radius = 2;
    const dodge = dodger(radius * 2 + 1);
    const random = d3.randomNormal();
    const margin = { top: 0, right: 10, bottom: 20, left: 10 };
    const values = Float64Array.from({ length: n }, random);

    // base svg setting
    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    // x Axis
    const x = d3.scaleLinear(d3.extent(values), [margin.left, width - margin.right]).nice();
    svg
      .select('.x-axis')
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom - adjmargin})`)
      .call(d3.axisBottom(x))
      .style('font-size', '0.4rem');

    // dodger function
    function dodger(radius) {
      const radius2 = radius ** 2;
      const bisect = d3.bisector((d) => d.x);
      const circles = [];
      return (x) => {
        const l = bisect.left(circles, x - radius);
        const r = bisect.right(circles, x + radius, l);
        let y = 0;
        for (let i = l; i < r; ++i) {
          const { x: xi, y: yi } = circles[i];
          const x2 = (xi - x) ** 2;
          const y2 = (yi - y) ** 2;
          if (radius2 > x2 + y2) {
            y = yi + Math.sqrt(radius2 - x2) + 1e-6;
            i = l - 1;
            continue;
          }
        }
        circles.splice(bisect.left(circles, x, l, r), 0, { x, y });
        return y;
      };
    }

    // yield circles
    for (let i = 0; i < n; ++i) {
      //   if (i % 5 === 0) svg.node();
      const cx = x(values[i]);
      const cy = height - margin.bottom - adjmargin - dodge(cx) - radius - 1;

      // attaching main chart
      svg
        .select('.plot-area')
        .append('circle')
        .attr('cx', cx)
        .attr('cy', -400)
        .attr('r', radius)
        .attr('fill', 'steelblue')
        .transition()
        .duration(750)
        // .ease(d3.easeBounce)
        .attr('cy', cy);
    }
      yield svg.node()
    }
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
        <g className="x-axis" />
      </svg>
    </>
  );
}
