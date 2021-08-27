import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function RandomDotsD32() {
  const ref = useRef();

  useEffect(() => {
    //base setting
    const width = 1600;
    const height = 900;
    const adjmargin = 0;
    const n = 100;

    const randInt = function (min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return (Math.random() * (max - min) + min) | 0;
    };

    const opacityValue = async function* () {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        yield Math.random();
      }
    };

    // async function* generateSequence() {
    //   while (true) {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     yield Math.random();
    //   }
    // }

    (async () => {
      let generator = opacityValue();
      for await (let value of generator) {
        console.log(value); // 1, 2, 3, 4, 5
      }
    })();

    const color = d3.scaleOrdinal(
      [0, n],
      [
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#33a02c',
        '#fb9a99',
        '#e31a1c',
        '#fdbf6f',
        '#ff7f00',
        '#cab2d6',
        '#6a3d9a',
        '#ffff99',
        '#b15928',
      ],
    );

    const margin = { top: 30, right: 0, bottom: 30, left: 40 };

    // dataset
    const dataset = [];

    for (let i = 0; i < n; ++i) {
      let newNumber1 = randInt(1600);
      let newNumber2 = randInt(900);
      dataset.push([newNumber1, newNumber2]);
    }

    // x value scaling
    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d[0];
        }),
      ])
      .range([margin.left, width - margin.right - adjmargin]);

    // y value scaling
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d[1];
        }),
      ])
      .range([height - margin.bottom - adjmargin, margin.top]);

    // r value scaling
    const r = d3
      .scaleSqrt()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d[1];
        }),
      ])
      .range([0, 30]);

    // base svg setting
    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    // attaching main chart
    svg
      .select('.plot-area')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d[0]))
      .attr('cy', (d) => y(d[1]))
      .attr('r', (d) => r(d[1]))
      .style('fill', (d, i) => color(i))
      .style('opacity', 1);
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
