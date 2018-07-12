import React, { Component } from "react";
import { guess } from "./network/network";

export default function({
  datapoints,
  correctLabels,
  weights,
  highlightedPoint
}) {
  let m = -weights[0] / weights[1];

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
              ? 8
              : 4
          }
          fill={guess(el, weights) === 1 ? "red" : "blue"}
          strokeWidth="3"
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
