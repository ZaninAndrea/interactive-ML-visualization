import React, { Component } from "react";
import ScatterPlot from "./ScatterPlot";
import PerceptronSchema from "./PerceptronSchema";
import "./App.css";
import generateData from "./network/dataset";
import { train, accuracy, interactiveTrain } from "./network/network";

const compareWeights = (a, b) => a[0] === b[0] && a[1] === b[1];
const wait = millisecs =>
  new Promise((resolve, reject) => setTimeout(resolve, millisecs));

class App extends Component {
  constructor() {
    super();

    const { dataset: trainDataset, labels: trainLabels } = generateData();
    const { dataset: testDataset, labels: testLabels } = generateData();

    const weightsGenerator = interactiveTrain(trainDataset, trainLabels);
    this.state = {
      weightsGenerator,
      ...weightsGenerator.next().value,
      testDataset,
      testLabels,
      trainDataset,
      trainLabels
    };
  }

  handleNext = async () => {
    let weightsUnchanged = true;

    this.setState({ training: true });

    while (weightsUnchanged) {
      await wait(100);

      weightsUnchanged = await new Promise((resolve, reject) => {
        this.setState(({ weights, weightsGenerator }) => {
          const update = weightsGenerator.next().value;

          if (!update.weights) resolve(true);
          else if (!weights) resolve(false);
          else resolve(compareWeights(update.weights, weights));

          return update;
        });
      });
    }

    this.setState({ training: false });
  };

  handleFullLoop = async () => {
    this.setState({ training: true });

    let endRound = false;
    while (!endRound) {
      await wait(25);

      endRound = await new Promise((resolve, reject) => {
        this.setState(({ weights, weightsGenerator, round }) => {
          const update = weightsGenerator.next().value;

          resolve(update.round && update.round !== round);

          return update;
        });
      });
    }

    this.setState({ training: false });
  };

  render() {
    const accuracyResult = accuracy(
      this.state.weights,
      this.state.trainDataset,
      this.state.trainLabels
    );

    return (
      <div className="App">
        <ScatterPlot
          datapoints={this.state.trainDataset}
          correctLabels={this.state.trainLabels}
          highlightedPoint={this.state.highlightedPoint}
          weights={this.state.weights}
        />
        <PerceptronSchema
          point={this.state.highlightedPoint}
          weights={this.state.weights}
        />
        <br />Accuracy: {accuracyResult}
        <br />
        <button onClick={this.handleNext} disabled={this.state.training}>
          NEXT
        </button>
        <button onClick={this.handleFullLoop} disabled={this.state.training}>
          FULL LOOP
        </button>
        <br />
        Round: {this.state.round}
      </div>
    );
  }
}

export default App;
