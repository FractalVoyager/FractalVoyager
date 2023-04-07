import "./colors.css";
import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { useColorsStore } from "../../store/zustandTest";

function ColorDisplayer({ selectedColor, num, width, height }) {
  // // // console.log("HERE");
  const [colors, setColors] = useState();
  const set = useColorsStore((state) => state.set);

  useEffect(() => {
    let cs = [];
    let amt = num - 1;
    cs.push([0, 0, 0]);
    for (let i = 0; i < amt; i++) {
      let l = 0.1 + (0.8 / (amt - 1)) * i;
      let newColor = { h: selectedColor.hsl.h, s: 1, l: l };

      let rgb = chroma(newColor).rgb();
      cs.push(rgb);
    }

    setColors(cs);
    set(cs, num);
    console.log(cs, selectedColor);
  }, [selectedColor, num]);

  let wStr;
  let hStr;
  if (width && colors) {
    wStr =
      Math.floor(width.current.clientWidth / colors.length).toString() + "px";
    hStr = Math.floor(width.current.clientHeight * 3).toString() + "px";
  }
  // if (height && colors) {
  // }

  //// // // console.log(colors);
  if (colors && width) {
    return (
      <div id="colors-cont">
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
