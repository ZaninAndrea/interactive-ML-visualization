import React from "react";

export const rand = (a, b) => Math.random() * (b - a) + a;
export const range = (a, b) => {
  let arr = [];
  for (let i = a; i < b; i++) {
    arr.push(i);
  }
  return arr;
};
