import "./colors.css";

function ColorDisplayer({ colors, width, height }) {
  let wStr;
  let hStr;
  if (width && colors) {
    wStr = Math.floor(width / colors.length).toString() + "px";
  }
  if (height && colors) {
    hStr = Math.floor(height * 3).toString() + "px";
  }

  //console.log(colors);
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
