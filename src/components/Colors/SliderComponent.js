import React, { useState, useRef } from "react";
import { HuePicker } from "react-color";
import ColorDisplayer from "./ColorDisplayComponent";
import "./colors.css";
import { useColorsStore } from "../../store/zustandTest";

function ColorPicker({ num }) {
  const [selectedColor, setSelectedColor] = useState({
    hex: "#1800ff",
    hsl: { h: 245.5629139072847, s: 1, l: 0.5, a: 1 },
  });
  const [colors, setColors] = useState();
  const wrapperRef = useRef(null);
  const set = useColorsStore((state) => state.set);

  // setWidth(wrapperRef.current.clientWidth);
  const [width, setWidth] = useState(null);

  console.log(selectedColor);

  // console.log(wrapperRef);

  // useEffect(() => {
  //   handle(selectedColor);
  // }, [selectedColor, num]);

  // const handle = (color) => {
  //   setSelectedColor(color.hex);
  //   color = color.hsl;
  //   let cs = [];
  //   let amt = num - 1;
  //   cs.push([0, 0, 0]);
  //   for (let i = 0; i < amt; i++) {
  //     let l = 0.1 + (0.8 / (amt - 1)) * i;
  //     let newColor = { h: color.h, s: 1, l: l };

  //     let rgb = chroma(newColor).rgb();
  //     cs.push(rgb);
  //   }

  //   setColors(cs);
  //   set(cs, num);
  // };

  // l of 10 to 90

  // console.log(selectedColor);

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

      {/* {wrapperRef.current ? (
        <ColorDisplayer
          id="colors"
          selectedColor={selectedColor}
          num={num}
          width={wrapperRef.current.clientWidth}
          height={wrapperRef.current.clientHeight}
        />
      ) : (
        ""
      )} */}

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
