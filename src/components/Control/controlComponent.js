import "./control.css";
import { useRef, useState } from "react";
import Viewer from "../Viewer/viewerComponent";
// import { Button, TextField } from "@mui/material";
import { useCompileCode } from "../../helpers/emceptionHooks";
import { useCompileStore } from "../../store/zustandTest.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useCgen from "../../helpers/cgenHook";
import Terminal from "../Console/myTermComponent";
import Header from "../Header/headerComponent";
import Modal from "react-bootstrap/Modal";
function Control({}) {
  const inputRef = useRef(null);

  const [back, setBack] = useState(0);

  const [res, setRes] = useState({
    x: 2160,
    y: 2160,
    scaleX: 2,
    scaleY: 2,
    startX: -1080,
    startY: -1080,
  });

  const RealMinRef = useRef(-1);
  const CpxMinRef = useRef(-1);

  const RealMaxRef = useRef(1);
  const CpxMaxRef = useRef(1);

  const yResRef = useRef(null);

  const [showCords, setShowCords] = useState(false);

  const [script, setScript] = useState(null);

  const codeRef = useRef(null);

  function handleReset() {
    // console.log(CpxMaxRef);
    // assuming we have all parts of the form,
    let height = CpxMaxRef.current.value - CpxMinRef.current.value;
    let width = RealMaxRef.current.value - RealMinRef.current.value;

    let yRes = yResRef.current.value;

    let xRes = (width / height) * yRes;

    // 2 because the dfeault scale is -1 to 1 on both axises

    let xScale = width / 2;
    let yScale = height / 2;

    let midX =
      (parseFloat(RealMinRef.current.value) +
        parseFloat(RealMaxRef.current.value)) /
      2;
    let midY =
      (parseFloat(CpxMinRef.current.value) +
        parseFloat(CpxMaxRef.current.value)) /
      2;

    // difference between middle and zero * res/2
    let shiftX = (midX - 0) * (xRes / 2);
    let shiftY = (midY - 0) * (yRes / 2);

    let startX = -((xRes / 2) * (xScale - 1)) + shiftX;
    let startY = -((yRes / 2) * (yScale - 1)) - shiftY;

    console.log(xRes, yRes, xScale, yScale, startX, startY);

    setRes({
      x: parseInt(Math.round(xRes)),
      y: parseInt(Math.round(yRes)),
      scaleX: parseFloat(xScale),
      scaleY: parseFloat(yScale),
      startX: parseFloat(startX),
      startY: parseFloat(startY),
    });

    // console.log(xRes, yRes, xScale, yScale, startX, startY);
  }

  function handleBack() {
    setBack((prev) => prev + 1);
  }

  const ready = useCompileStore((state) => state.ready);
  codeRef.current = useCgen(script);
  // the retun val is a test~~~!!!!
  useCompileCode(codeRef.current);

  return (
    <>
      <div id="control-viewer">
        <div id="controls">
          <Header />
          <Form id="script-form">
            <Form.Group>
              <Form.Control
                as="textarea"
                ref={inputRef}
                type="text"
                placeholder="Enter Script"
                id="script-area"
              ></Form.Control>
            </Form.Group>
            {ready ? (
              <Button
                variant="primary"
                onClick={() => {
                  setScript(inputRef.current.value);
                }}
              >
                Compile & Run
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled
                onClick={() => {
                  setScript(inputRef.current.value);
                }}
              >
                Compile & Run
              </Button>
            )}
          </Form>

          <Form id="viewer-form">
            <Button variant="primary" onClick={handleBack}>
              Back
            </Button>
            <Form.Group>
              <Form.Control
                ref={RealMinRef}
                type="text"
                placeholder="Real axis min value (default is -2)"
              ></Form.Control>
              <Form.Control
                ref={RealMaxRef}
                type="text"
                placeholder="Real axis max value (default is 2)"
              ></Form.Control>
              <Form.Control
                ref={CpxMinRef}
                type="text"
                placeholder="Complex axis min value (default is -2)"
              ></Form.Control>
              <Form.Control
                ref={CpxMaxRef}
                type="text"
                placeholder="Complex axis max value (default is 2)"
              ></Form.Control>
              <Form.Control
                ref={yResRef}
                type="text"
                placeholder="Y axis resolution (default is 2160px)"
              ></Form.Control>
              <Button variant="primary" onClick={handleReset}>
                Reset
              </Button>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => setShowCords((prev) => !prev)}
            >
              Show cpx
            </Button>
          </Form>
        </div>
        {/* the key is what triggers a re render type thing, we don't want back there, becuase then the whole thing will start over */}
        <Viewer
          key={
            res.x ||
            res.y ||
            res.scaleX ||
            res.scaleY ||
            res.startX ||
            res.startY
          }
          xRes={res.x}
          yRes={res.y}
          initXscale={res.scaleX}
          initYscale={res.scaleY}
          initStartX={res.startX}
          initStartY={res.startY}
          back={back}
          showCords={showCords}
        />
      </div>
    </>
  );
}

export default Control;
