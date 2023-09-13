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

// TODO - takes stuff and returns params
const axesToParams = (imgMax, imgMin, realMax, realMin, xRes, yRes) => {
  let height = imgMax - imgMin;
  let width = realMax - realMin;

  let xScale = width / 2;
  let yScale = height / 2;

  let midX = (parseFloat(realMin) + parseFloat(realMax)) / 2;
  let midY = (parseFloat(imgMin) + parseFloat(imgMax)) / 2;

  let shiftX = (midX - 0) * (xRes / 2);
  let shiftY = (midY - 0) * (yRes / 2);

  let startX = -((xRes / 2) * (xScale - 1)) + shiftX;
  let startY = -((yRes / 2) * (yScale - 1)) - shiftY;

  return {
    scaleX: xScale,
    scaleY: yScale,
    startX: startX,
    startY: startY,
  };
};
export { canvasToComplex, complexToCanvas, canvasToPoint, axesToParams };
