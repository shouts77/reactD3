import React, { useEffect, useRef } from "react";
import { useD3 } from '/home/node/react-d3/src/hooks/useD3';
import * as d3 from "d3";

const width = 300;
const height = 300;
const adjmargin = 100;


function ScatterChartD3({data}) {
  const ref = useD3(
    (svg) => {
      const color = "steelblue";
      const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        
      // const svg = d3.select(ref.current)
      //               .append("svg")
      //               .attr("viewBox", [0, 0, width, height]);

      const x = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.x)])
                  .range([margin.left, width - margin.right - adjmargin]);

      svg.select(".x-axis")
         .append("g")
         .attr("transform", `translate(0,${height - margin.bottom - adjmargin})`)
         .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.y)])
                  .range([height - margin.bottom - adjmargin, margin.top]);

      svg.select(".y-axis")
         .append("g")
         .attr("transform", `translate(${margin.left},0)`)
         .call(d3.axisLeft(y));

      svg.select(".plot-area")
         .selectAll("circle")
         .data(data)
         .join("circle")
              .attr("fill", color)
              .attr("cx", (d) => x(d.x))
              .attr("cy", (d) => y(d.y))
              .attr("r", 3);
        },
        [data.length]
      );

  return (
    <>
    <svg
      ref={ref}
      viewBox={`0 0 ${height} ${width}`}
      style={{
        height: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </>
  );
}

export default ScatterChartD3;