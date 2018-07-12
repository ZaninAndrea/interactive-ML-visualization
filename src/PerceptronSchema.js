import React from "react";
import { guess, scalarProduct } from "./network/network";

export default function({ point, weights }) {
  return (
    <svg width="400" height="400">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor="white" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <line
        key="weightX"
        x1="50"
        y1="100"
        x2="200"
        y2="200"
        strokeWidth={3}
        stroke="black"
      />
      <line
        key="weightY"
        x1="50"
        y1="300"
        x2="200"
        y2="200"
        strokeWidth={3}
        stroke="black"
      />
      <line
        key="activator"
        x1="200"
        y1="200"
        x2="350"
        y2="200"
        strokeWidth={3}
        stroke="black"
      />
      <circle key="inputX" cx={50} cy={100} r={40} fill="black" />
      <circle key="inputY" cx={50} cy={300} r={40} fill="black" />
      <circle key="scalarProduct" cx={200} cy={200} r={40} fill="black" />
      <circle
        key="output"
        cx={350}
        cy={200}
        r={40}
        fill={
          point && weights
            ? guess(point, weights) === 1
              ? "red"
              : "blue"
            : "black"
        }
      />
      <text key="inputXtext" x="50" y="100" className="svg-dot-labels">
        {point ? Math.round(point[0] * 100) / 100 : "X"}
      </text>
      <text key="inputYtext" x="50" y="300" className="svg-dot-labels">
        {point ? Math.round(point[1] * 100) / 100 : "Y"}
      </text>
      <text
        filter="url(#solid)"
        key="weightXtext"
        x="125"
        y="150"
        className="svg-line-labels"
      >
        {weights ? Math.round(weights[0] * 100) / 100 : "X weight"}
      </text>
      <text
        filter="url(#solid)"
        key="weightYtext"
        x="125"
        y="250"
        className="svg-line-labels"
      >
        {weights ? Math.round(weights[1] * 100) / 100 : "Y weight"}
      </text>
      <text key="productText" x="200" y="200" className="svg-dot-labels">
        {point && weights
          ? Math.round(scalarProduct(point, weights) * 100) / 100
          : "product"}
      </text>
      <text key="outputText" x="350" y="200" className="svg-dot-labels">
        {point && weights ? guess(point, weights) : "output"}
      </text>
    </svg>
  );
}
