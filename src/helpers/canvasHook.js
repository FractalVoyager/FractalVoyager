// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import { useRef, useEffect } from "react";

/*
parameters: draw - the function which gets drawn on the canvas which is actaully defined in viewer component, so uses the pixles state and such
options - options for drawing line
description: the is a simple hook which on change of the fraw function or things in the draw function or options - updates the canvas with the new draw
*/
const useCanvas = (draw, options) => {
  // useRef is a hook that is not recomputed on re renders, so, this makes it so
  // the canvas doesn't rebuild every time there is a new draw
  const canRef = useRef(null);

  // runs on the first call/ render, and when draw is changed
  // TODO could add a resize param to this to make it so it gets redrawn on window resize
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

export default useCanvas;
