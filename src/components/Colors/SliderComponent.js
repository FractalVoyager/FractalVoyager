import React, { useState, useRef } from "react";
import { HuePicker } from "react-color";
import chroma from "chroma-js";
import ColorDisplayer from "./ColorDisplayComponent";
import "./colors.css";
import { useColorsStore } from "../../store/zustandTest";

function ColorPicker({ num }) {
  const [selectedColor, setSelectedColor] = useState("#004fff");
  const [colors, setColors] = useState();
  const wrapperRef = useRef(null);
  const set = useColorsStore((state) => state.set);

  // setWidth(wrapperRef.current.clientWidth);

  const handle = (color) => {
    setSelectedColor(color.hex);
    color = color.hsl;
    let cs = [];
    let amt = num - 1;
    cs.push([0, 0, 0]);
    for (let i = 0; i < amt; i++) {
      let l = 0.1 + (0.8 / (amt - 1)) * i;
      let newColor = { h: color.h, s: 1, l: l };

      let rgb = chroma(newColor).rgb();
      cs.push(rgb);
    }

    setColors(cs);
    set(cs, num);
  };

  // l of 10 to 90

  return (
    <div id="slider-cont">
      <div ref={wrapperRef}>
        <HuePicker
          id="picker"
          color={selectedColor}
          onChange={(color) => handle(color)}
          width="1" // setting width lets it take max of container
        />
      </div>

      {wrapperRef.current ? (
        <ColorDisplayer
          id="colors"
          colors={colors}
          width={wrapperRef.current.clientWidth}
          height={wrapperRef.current.clientHeight}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ColorPicker;
