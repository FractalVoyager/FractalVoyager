import "./control.css";
import { useRef, useState } from "react";
import Viewer from "../Viewer/viewerComponent";
import { Button, TextField } from "@mui/material";

function Control({}) {
  const Xref = useRef(3840);
  const Yref = useRef(2160);

  const [back, setBack] = useState(0);

  const [res, setRes] = useState({
    x: 3840,
    y: 2160,
  });

  // need to have the same aspect ratio as resolution - need to have some sort of control for this
  // maybe have resolution adjust to dims, for now, maybe make it so you can set real axis and cpx
  // will adjust based on resolution
  const [dims, setDims] = useState({
    realMin: -(3840 / 2160) - 0.55,
    cpxMin: -(3840 / 2160),
    realMax: 3840 / 21260 - 0.55,
    cpxMax: 3840 / 2160,
  });

  const RealMinRef = useRef(-(3840 / 2160) - 0.55);
  const CpxMinRef = useRef(-(3840 / 2160));

  const RealMaxRef = useRef(3840 / 21260 - 0.55);
  const CpxMaxRef = useRef(3840 / 2160);

  const [showCords, setShowCords] = useState(false);

  // const resetRef = useRef(null);

  // true is julia, false is orbit

  function handleReset() {
    // console.log(Xref.current.value);
    setRes({
      x: parseInt(Xref.current.value),
      y: parseInt(Yref.current.value),
    });
  }

  function handleBack() {
    setBack((prev) => prev + 1);
  }

  return (
    <>
      <div id="controls">
        <Button variant="contained" onClick={handleBack} className="control">
          {" "}
          Back
        </Button>
        <TextField inputRef={Xref} label="X resolution" className="control" />
        <TextField inputRef={Yref} label="Y resolution" className="control" />
        <TextField
          inputRef={RealMinRef}
          label="Real axis min"
          className="control"
        />
        <TextField
          inputRef={CpxMinRef}
          label="Cpx axis min"
          className="control"
        />
        <TextField
          inputRef={RealMaxRef}
          label="Real axis max"
          className="control"
        />
        <TextField
          inputRef={CpxMaxRef}
          label="Cpx axis max"
          className="control"
        />
        {/* <label htmlFor="Xres">X resolution</label>
        <input name="Xres" ref={Xref} />
        <label htmlFor="Yres">Y resolution</label>
        <input name="Yres" ref={Yref} /> */}
        <Button
          className="control"
          variant="contained"
          onClick={handleReset}
          // ref={resetRef}
        >
          Reset
        </Button>
        <Button
          className="control"
          variant="contained"
          onClick={() => setShowCords((prev) => !prev)}
        >
          Show cpx
        </Button>
      </div>
      {/* the key is what triggers a re render type thing, we don't want back there, becuase then the whole thing will start over */}
      <Viewer
        key={
          (res.x, res.y, dims.realMax, dims.realMin, dims.cpxMax, dims.cpxMin)
        }
        xRes={res.x}
        yRes={res.y}
        back={back}
        dims={dims}
        showCords={showCords}
      />
    </>
  );
}

export default Control;
