//
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// this should just be for creating the canvas and updating it with state in viewComponent
// by calling useCanvas

import useCanvas from "../../helpers/canvasHook";

const Canvas = ({
  draw,
  xRes,
  yRes,
  className,
  id,
  options,
  mouseDown,
  mouseMove,
  mouseUp,
}) => {
  const canRef = useCanvas(draw, options);

  // let styWidth = window.innerWidth * 0.8;
  // let styHeight = window.innerHeight * 0.8;

  let styWidth = window.innerWidth * 0.8;
  let styHeight = window.innerHeight * 0.8;

  // we need to cut some off the width - css
  if (styWidth / styHeight > xRes / yRes) {
    styWidth = (styHeight * xRes) / yRes;
  } else if (styWidth / styHeight < xRes / yRes) {
    styHeight = (styWidth * yRes) / xRes;
  }

  const style = { width: styWidth, height: styHeight };

  // if (xRes / yRes > 3840 / 2160) {
  //   // want it to be wider than it is long
  //   // keep the style for width where it is
  // } else if (xRes / yRes < 3840 / 2160) {
  // }

  // console.log(canRef);
  // canRef.current.width = xRes;
  // canRef.currentheight = yRes;

  return (
    <canvas
      style={style}
      ref={canRef}
      className={className}
      id={id}
      width={xRes}
      height={yRes}
      onMouseDown={(e) => mouseDown(e)}
      onMouseMove={(e) => mouseMove(e)}
      onMouseUp={(e) => mouseUp(e)}
    />
  );
};
export default Canvas;
