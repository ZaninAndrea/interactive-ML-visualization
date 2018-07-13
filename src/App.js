import React, { Component } from "react";
import Perceptron from "./Perceptron";
import LinePlot from "./LinePlot";
import {
  generateDataDiagonal,
  generateDataNiceDiagonal
} from "./network/dataset";

export default class App extends Component {
  constructor(){
    super()

    this.state = { accuracyHistory: [] }
  }

  render() {
    return (
      <div>
        <Perceptron
          scatterPlot
          accuracy
          next
          fullLoop
          schema
          generateData={generateDataDiagonal}
          pushToAccuracyHistory={ el => this.setState(({accuracyHistory})=>({
            accuracyHistory: [...accuracyHistory, el]
          }))}
        />
        <LinePlot data={this.state.accuracyHistory} />
      </div>
    )
  }
}
