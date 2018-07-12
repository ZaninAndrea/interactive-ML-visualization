import React from "react";

export const rand = (a, b) => Math.random() * (b - a) + a;
export const range = (a, b) => {
  let arr = [];
  for (let i = a; i < b; i++) {
    arr.push(i);
  }
  return arr;
};

export function svgPlot(
  datapoints,
  labels,
  correctLabels,
  trainedWeights,
  highlightedPoint
) {
  let m = -trainedWeights[0] / trainedWeights[1];

  return (
    <svg width="400" height="400">
      {datapoints.map((el, idx) => (
        <circle
          key={el}
          cx={el[0] * 200 + 200}
          cy={200 - el[1] * 200}
          r={
            highlightedPoint &&
            el[0] === highlightedPoint[0] &&
            el[1] === highlightedPoint[1]
              ? 6
              : 3
          }
          fill={labels[idx] === 1 ? "red" : "blue"}
          strokeWidth="2"
          stroke={correctLabels[idx] === 1 ? "red" : "blue"}
        />
      ))}
      <line x1="0" y1="400" x2="400" y2="0" strokeWidth="1" stroke="black" />
      <line
        x1="0"
        y1={200 - m * -200}
        x2="400"
        y2={200 - m * 200}
        strokeWidth="2"
        stroke="green"
      />
    </svg>
  );
}
