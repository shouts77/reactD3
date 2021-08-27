import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function CircleWaveD3() {
  const ref = useRef();

  useEffect(() => {
    //base setting
    const width = 960;
    const height = 500;
    const angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

    // base svg setting
    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    // attaching main chart
    const path = svg
      .select('.plot-area')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('fill', 'none')
      .attr('stroke-width', 10)
      .attr('stroke-linejoin', 'round')
      .selectAll('path')
      .data(['cyan', 'magenta', 'yellow'])
      .enter()
      .append('path')
      .attr('stroke', (d) => d)
      .style('mix-blend-mode', 'darken')
      .datum(function (d, i) {
        return d3
          .radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function (a) {
            return a;
          })
          .radius(function (a) {
            var t = d3.now() / 1000;
            return (
              200 +
              Math.cos(a * 8 - (i * 2 * Math.PI) / 3 + t) *
                Math.pow((1 + Math.cos(a - t)) / 2, 3) *
                32
            );
          });
      });

    d3.timer(function () {
      path.attr('d', (d) => d(angles));
    });
  });
  return (
    <>
      <svg
        ref={ref}
        style={{
          height: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="plot-area" />
      </svg>
    </>
  );
}
