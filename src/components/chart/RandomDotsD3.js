import React, { useRef, useEffect } from 'react';
import { Runtime, Inspector } from '@observablehq/runtime'; // for embedding observablehq chart
import notebook from '@shouts77/random-dots'; // for embedding observablehq chart

function RandomDots() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, (name) => {
      if (name === 'chart') return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={chartRef} />
      <p>
        Credit: <a href="https://observablehq.com/@shouts77/random-dots">Random Dots by shouts</a>
      </p>
    </>
  );
}

export default RandomDots;
