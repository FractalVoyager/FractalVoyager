// reference : https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// this should just be for creating the canvas and updating it with state in viewComponent
// by calling useCanvas

import useCanvas from "../../helpers/canvasHook";
import { useFracRefStore } from "../../store/zustandTest";
/*
props:
draw: function to be drawn on canvas
xRes, yRes: height and width of the canvas (this is different than css height and widths)
maxWidth, maxHeight: css values the outer component, max values the canvses can be 
className, id: names for the canvas elements
options: storke style and stroke width for drawn zoom boxes
mouseDown, mouseMove, mouseUp: functions for those events on the canvas, these are props becuase 
they use state that is held in the parent component 
returns: the canvas
description: calucates size of canvas and returns, calls the useCanvas hook to draw onto the canvas
 */
const Canvas = ({
  draw,
  xRes,
  yRes,
  maxWidth,
  maxHeight,
  className,
  id,
  options,
  mouseDown,
  mouseMove,
  mouseUp,
}) => {
  // gets the ref for can and calls draws on the canvas with useCanvas
  const canRef = useCanvas(draw, options);

  // silly fix to set a ref for the canvas which is drawing the fractals - uses global store
  const updateFracRef = useFracRefStore((state) => state.update);
  if (id === "fracCan") {
    setTimeout(() => {
      updateFracRef(canRef);
    }, 10);
  }

  // math for css size of canvas
  // NOTE: these will only change when xRes/yRes change, so when we just box zoom,
  // it doesn't change those values, so the actaul size of the canvas doesn't update,
  // when we reset the axises in control, the xRes and yRes are adjusted for those demensions
  // so the ratio size of the actual canvas changes here
  let styWidth = maxWidth;
  let styHeight = maxHeight;
  if (styWidth / styHeight > xRes / yRes) {
    styWidth = (styHeight * xRes) / yRes;
  } else if (styWidth / styHeight < xRes / yRes) {
    styHeight = (styWidth * yRes) / xRes;
  }
  const style = { width: styWidth, height: styHeight };

  // the ref will have the drawn fractal
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
