import React, { useState, useRef } from "react";
import { HuePicker } from "react-color";
import ColorDisplayer from "./ColorDisplayComponent";
import "./colors.css";
import { useColorsStore } from "../../store/zustandTest";

/*



*/

/*
props: num, the number the user picked from the input box for how many colors
returns: the slider (hue picker), and the color displayer which is all the colors displayed
descripion: this is the color picker, it uses a hue picker slider from a npm package 
and uses the color picked from that to generate the color boxes which is a child compoenent
*/
function ColorPicker({ num }) {
  // is the color where the slider currently is and allows it to move, starts as a tealish blue
  const [selectedColor, setSelectedColor] = useState({
    hex: "#00c4ff",
    hsl: { h: 193.8795180722891, s: 1, l: 0.5, a: 1 },
  });
  // references a random div that the component is wrapped in, that gets passed down to determine the
  // height of the color boxes
  // TODO could probably do without this as the height of the slider doesn't change
  const wrapperRef = useRef(null);
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
        wrapper={wrapperRef}
      />
    </div>
  );
}

export default ColorPicker;
