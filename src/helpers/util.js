/* 
Usefull functions used in a variety of components
*/
const canvasToComplex = (x, y, width, height) => {
  return [(x + -width / 2) / (width / 2), -(y + -height / 2) / (height / 2)];
};

const complexToCanvas = (re, im, width, height) => {
  return [(re * width) / 2 + width / 2, (-im * height) / 2 + height / 2];
};

const canvasToPoint = (
  canX,
  canY,
  wScale,
  hScale,
  xRes,
  yRes,
  cliWidth,
  cliHeight,
  startX,
  startY
) => {
  return [(canX - startX) / wScale, (canY - startY) / hScale];
};

export { canvasToComplex, complexToCanvas, canvasToPoint };
