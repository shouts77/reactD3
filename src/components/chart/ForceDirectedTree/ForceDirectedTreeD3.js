import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ForceDirectedTreeD3() {
  const ref = useRef();

  useEffect(() => {
    //base setting
    const width = 960;
    const height = 960;
    const adjustvalue = width / 2;
    const color = function (i) {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return (i) => scale(i.index);
    };

    // base svg setting
    // const canvas = document.querySelector('canvas');
    // const context = canvas.getContext('2d');
    // const width = canvas.width;
    // const height = canvas.height;

    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    // force chart settings (links, nodes, functions)
    const nodes = d3.range(1000).map(function (i) {
      return {
        index: i,
      };
    });

    const links = d3.range(nodes.length - 1).map(function (i) {
      return {
        source: Math.floor(Math.sqrt(i)),
        target: i + 1,
      };
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(links).distance(20).strength(1))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x + adjustvalue)
        .attr('y1', (d) => d.source.y + adjustvalue)
        .attr('x2', (d) => d.target.x + adjustvalue)
        .attr('y2', (d) => d.target.y + adjustvalue);

      node.attr('cx', (d) => d.x + adjustvalue).attr('cy', (d) => d.y + adjustvalue);
    });

    const drag = (simulation) => {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
    };

    // attaching main chart
    const link = svg
      .select('.plot-area')
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', color())
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg
      .select('.plot-area')
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('fill', color())
      .attr('r', 5)
      .call(drag(simulation));
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
