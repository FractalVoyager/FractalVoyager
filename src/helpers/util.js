// not sure if I want the css sizes too
const canvasToComplex = (x, y, width, height) => {
  return [(x + -width / 2) / (width / 2), -(y + -height / 2) / (height / 2)];
};

const complexToCanvas = (re, im, width, height) => {
  console.log("In util", re, im, width, height);
  return [(re * width) / 2 + width / 2, (-im * height) / 2 + height / 2];
};

export { canvasToComplex, complexToCanvas };
