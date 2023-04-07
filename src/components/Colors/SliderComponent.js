import React, { useState, useRef } from "react";
import { HuePicker } from "react-color";
import ColorDisplayer from "./ColorDisplayComponent";
import "./colors.css";
import { useColorsStore } from "../../store/zustandTest";

function ColorPicker({ num }) {
  const [selectedColor, setSelectedColor] = useState({
    hex: "#00c4ff",
    hsl: { h: 193.8795180722891, s: 1, l: 0.5, a: 1 },
  });
  const [colors, setColors] = useState();
  const wrapperRef = useRef(null);
  const set = useColorsStore((state) => state.set);

  // setWidth(wrapperRef.current.clientWidth);
  const [width, setWidth] = useState(null);

  return (
    <div id="slider-cont">
      <div ref={wrapperRef}>
        <HuePicker
          id="picker"
          color={selectedColor.hex}
          onChange={setSelectedColor}
          width="1" // setting width lets it take max of container
        />
      </div>

      <ColorDisplayer
        id="colors"
        selectedColor={selectedColor}
        num={num}
        width={wrapperRef}
        height={wrapperRef}
      />
    </div>
  );
}

export default ColorPicker;
