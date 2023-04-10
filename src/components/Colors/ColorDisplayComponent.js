import "./colors.css";
import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { useColorsStore } from "../../store/zustandTest";

/*
props: selectedColor: color that slider selected, num: how many colors, wrapper: div to help style
returns: gradient of selected colors with the number of colors being num
description: calculates a color gradient of selected color and displays it 
 */
function ColorDisplayer({ selectedColor, num, wrapper }) {
  // local state of all the colors
  const [colors, setColors] = useState();
  // sets the global state varaible which is the colors and numColors
  // setting num colors here is it is done at the same time - prboably don't need to
  const set = useColorsStore((state) => state.set);

  // on change of selectedColor or num, calculate color graident and set
  useEffect(() => {
    let cs = [];
    // because black is always a color
    let amt = num - 1;
    cs.push([0, 0, 0]);
    for (let i = 0; i < amt; i++) {
      // changing the lightness value of hsl color
      let l = 0.1 + (0.8 / (amt - 1)) * i;
      let newColor = { h: selectedColor.hsl.h, s: 1, l: l };
      // converts hsl to rgb
      let rgb = chroma(newColor).rgb();
      cs.push(rgb);
    }
    setColors(cs);
    set(cs, num);
  }, [selectedColor, num]);

  // calculate width of each box, and height of each box
  let wStr;
  let hStr;
  // only if wrapper and colors are defned
  if (wrapper && colors) {
    wStr =
      Math.floor(wrapper.current.clientWidth / colors.length).toString() + "px";
    hStr = Math.floor(wrapper.current.clientHeight * 3).toString() + "px";
  }
  // also if we have colors and wrapper, we're good to return component, otherwise, return nothing
  if (colors && wrapper) {
    return (
      <div id="colors-cont">
        {/* map the colors to div elements with key of they're color */}
        {colors.map((color) => {
          let str = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
          return (
            <div
              className="color"
              key={color}
              style={{ backgroundColor: str, width: wStr, height: hStr }}
            />
          );
        })}
      </div>
    );
  } else {
    return;
  }
}

export default ColorDisplayer;
