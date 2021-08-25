import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function BarChartD3({ data }) {
  const ref = useRef();

  useEffect(() => {
    //base setting
    const width = 500;
    const height = 500;
    const adjmargin = 200;
    const color = 'steelblue';
    const margin = { top: 10, right: 30, bottom: 30, left: 30 };

    // x value scaling
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // y value scaling
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom - adjmargin, margin.top]);

    // creating xAxis
    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom - adjmargin})`).call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].name)
          .tickSizeOuter(1),
      );

    // creating yAxis
    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', -margin.left)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text(data.y)
            .attr('transform', `translate(0,-5)`),
        );

    // base svg setting
    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    // attaching main chart
    svg
      .select('.plot-area')
      .append('g')
      .attr('fill', color)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth());

    // attaching Axis
    svg.select('.x-axis').append('g').call(xAxis).style('font-size', '0.4rem');
    svg.select('.y-axis').append('g').call(yAxis).style('font-size', '0.4rem');
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
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
}
