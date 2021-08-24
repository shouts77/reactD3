import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ScatterChartD3({ data }) {
  const ref = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const adjmargin = 0;
    const color = d3.scaleOrdinal(
      data.map((d) => d.category),
      d3.schemeCategory10,
    );

    const shape = d3.scaleOrdinal(
      data.map((d) => d.category),
      d3.symbols.map((s) => d3.symbol().type(s)()),
    );

    const margin = { top: 25, right: 20, bottom: 35, left: 40 };

    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .nice()
      .range([margin.left, width - margin.right - adjmargin]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', width)
            .attr('y', margin.bottom - 4)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'end')
            .text(data.x),
        );

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .nice()
      .range([height - margin.bottom - adjmargin, margin.top]);

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', -margin.left)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text(data.y),
        );

    const grid = (g) =>
      g
        .attr('stroke', 'currentColor')
        .attr('stroke-opacity', 0.1)
        .call((g) =>
          g
            .append('g')
            .selectAll('line')
            .data(x.ticks())
            .join('line')
            .attr('x1', (d) => 0.5 + x(d))
            .attr('x2', (d) => 0.5 + x(d))
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom),
        )
        .call((g) =>
          g
            .append('g')
            .selectAll('line')
            .data(y.ticks())
            .join('line')
            .attr('y1', (d) => 0.5 + y(d))
            .attr('y2', (d) => 0.5 + y(d))
            .attr('x1', margin.left)
            .attr('x2', width - margin.right),
        );

    svg
      .select('.plot-area')
      .append('g')
      .attr('stroke-width', 1.5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('transform', (d) => `translate(${x(d.x)},${y(d.y)})`)
      .attr('fill', (d) => color(d.category))
      .attr('d', (d) => shape(d.category));

    svg.select('.x-axis').append('g').call(xAxis).style('font-size', '0.7rem');
    svg.select('.y-axis').append('g').call(yAxis).style('font-size', '0.7rem');
    svg.select('.grid').append('g').call(grid);

    const keys = ['setosa', 'versicolor', 'virginica'];
    const legendColor = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10);
    const legendShape = d3.scaleOrdinal(
      keys.map((d) => d),
      d3.symbols.map((s) => d3.symbol().type(s)()),
    );
    console.log(legendShape('virginica'));

    const legendSize = 10;

    // svg
    //   .select('.legend')
    //   .append('g')
    //   .attr('stroke-width', 1.5)
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 10)
    //   .selectAll('mydots')
    //   .data(keys)
    //   .join('rect')
    //   .attr('x', (d, i) => 75 * i)
    //   .attr('y', 105) // 100 is where the first dot appears. 25 is the distance between dots
    //   .attr('width', legendSize)
    //   .attr('height', legendSize)
    //   .attr('transform', (d) => `translate(550, -100)`)
    //   .style('fill', (d) => legendColor(d));

    svg
      .select('.legend')
      .append('path')
      .attr('transform', `translate(550, 9)`)
      .attr('d', legendShape('setosa'))
      .style('fill', legendColor('setosa'));

    svg
      .select('.legend')
      .append('path')
      .attr('transform', `translate(625, 9)`)
      .attr('d', legendShape('versicolor'))
      .style('fill', legendColor('versicolor'));

    svg
      .select('.legend')
      .append('path')
      .attr('transform', `translate(700, 9)`)
      .attr('d', legendShape('virginica'))
      .style('fill', legendColor('virginica'));

    svg
      .select('.legend')
      .append('g')
      .attr('stroke-width', 1.5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .selectAll('mylabels')
      .data(keys)
      .enter()
      .append('text')
      .attr('x', (d, i) => 75 * i + legendSize * 1.2)
      .attr('y', 110) // 100 is where the first dot appears. 25 is the distance between dots
      .style('fill', (d) => legendColor(d))
      .text((d) => d)
      .attr('text-anchor', 'left')
      .attr('transform', (d) => `translate(550, -100)`)
      .style('alignment-baseline', 'middle');
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
        <g className="legend" />
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="grid" />
      </svg>
    </>
  );
}
