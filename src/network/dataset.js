const { rand, range, svgPlot } = require("./utilities");

function generateData() {
  // generate random points
  const dataset = range(0, 100).map(() => {
    const x = rand(-1, 1);
    const y = rand(-1, 1);
    return [x, y];
  });

  // give the correct label
  const labels = dataset.map(el => (el[1] > el[0] ? 1 : -1));

  return { dataset, labels };
}

export default generateData;
