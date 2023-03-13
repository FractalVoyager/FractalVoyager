// not sure if I want the css sizes too
const canvasToComplex = (x, y, width, height) => {
  return [(x + -width / 2) / (width / 2), -(y + -height / 2) / (height / 2)];
};

export { canvasToComplex };
