// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import { useRef, useEffect } from "react";

const useCanvas = (draw, options) => {
  // useRef is a hook that is not recomputed on re renders, so, thiss makes it so
  // the canvas doesn't rebuild every time there is a new draw
  const canRef = useRef(null);

  //

  // runs on the first call/ render, and when draw is changed, may want to change this
  // for resizing like going into fullscreen
  useEffect(() => {
    const can = canRef.current;
    const ctx = can.getContext("2d");

    if (options) {
      ctx.strokeStyle = options.strokeStyle;
      ctx.lineWidth = options.lineWidth;
    }

    // call the draw function with this context
    const render = () => {
      draw(ctx);
    };

    render();
  }, [draw, options]);

  return canRef;
};

// use forwardref should make this ref usuable to viewerComponent, could be
// really nice for resizing and such

export default useCanvas;
