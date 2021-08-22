import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ScatterChartD3({data}) {
  const ref = useRef();

  useEffect(() => {
    const width = 400;
    const height = 400;
    const adjmargin = 100;
    const color = "steelblue";
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        
    const svg = d3.select(ref.current)
                  .attr("viewBox", [0, 0, width, height]);

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
    }
  );

  return (
    <>
      <svg
        ref={ref}
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