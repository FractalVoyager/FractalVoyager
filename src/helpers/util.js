// not sure if I want the css sizes too
const canvasToComplex = (x, y, width, height) => {
  // negative because going down the y axis it gets more negative, have been doing this wrong the whole itme
  // but is hans't mattered becauyse it is mirror images

  return [
    (x - width / 2) / (height / 2) - 0.55,
    -(y - height / 2) / (height / 2),
  ];
};

export { canvasToComplex };
