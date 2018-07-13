const { rand, range, svgPlot } = require("./utilities");

export function scalarProduct(input, weights) {
  return input.reduce((acc, curr, idx) => acc + curr * weights[idx], 0);
}
// matrix multiplication between inuts and weights,
// then use a stepper function as activator
export function guess(input, weights) {
  return scalarProduct(input, weights) > 0 ? 1 : -1;
}

// trains the weights on a single point
function updateWeights(weights, point, label) {
  const guessResult = guess(point, weights);
  const error = label - guessResult;

  const newWeights = weights.map((weight, idx) => weight + point[idx] * error);

  return newWeights;
}

// interates the dataset <rounds> times updating the weights
export function train(dataset, labels, rounds) {
  // initialize to random weights
  let trainedWeights = [rand(0, 1), rand(0, 1)];

  for (let _ = 0; _ < rounds; _++) {
    trainedWeights = dataset.reduce(
      (weights, point, idx) => updateWeights(weights, point, labels[idx]),
      trainedWeights
    );
  }

  return trainedWeights;
}

export function* interactiveTrain(dataset, labels, initialWeights) {
  let trainedWeights = initialWeights;
  let round = 1;
  yield { weights: trainedWeights, round: 1 };

  while (true) {
    for (let i = 0; i < dataset.length; i++) {
      const element = dataset[i];
      yield { highlightedPoint: element };

      const oldWeights = trainedWeights;
      trainedWeights = updateWeights(trainedWeights, element, labels[i]);

      if (
        oldWeights[0] !== trainedWeights[0] ||
        oldWeights[1] !== trainedWeights[1]
      )
        yield { weights: trainedWeights };
    }

    yield { round: ++round };
  }
}

// test the trained weights: calculate accuracy and show labels plot
export function accuracy(weights, testDataset, testLabels) {
  const correctLabelsCount = testDataset.reduce(
    (acc, point, idx) =>
      acc + (guess(point, weights) === testLabels[idx] ? 1 : 0),
    0
  );
  const accuracy = correctLabelsCount / testDataset.length;

  return accuracy;
}
