const { rand, range, svgPlot } = require("./utilities");

const generateData = (pointGenerator, labeler) => {
  const dataset = range(0, 100).map(pointGenerator);
  const labels = dataset.map(labeler);

  return { dataset, labels };
};

export function generateDataNiceDiagonal() {
  // generate random points
  const pointGenerator = () => {
    let x = 0;
    let y = 0;

    // avoid points too close to the diagonal line
    while (Math.abs(x - y) < 0.1) {
      x = rand(-1, 1);
      y = rand(-1, 1);
    }

    return [x, y];
  };

  // give the correct label
  const labeler = el => (el[1] > el[0] ? 1 : -1);

  return generateData(pointGenerator, labeler);
}

export function generateDataDiagonal() {
  // generate random points
  const pointGenerator = () => {
    let x = rand(-1, 1);
    let y = rand(-1, 1);

    return [x, y];
  };

  // give the correct label
  const labeler = el => (el[1] > el[0] ? 1 : -1);

  return generateData(pointGenerator, labeler);
}
