import "./control.css";
import { useRef, useState } from "react";
import Viewer from "../Viewer/viewerComponent";
import { useCompileCode } from "../../helpers/emceptionHooks";
import { useBackState, useCompileStore } from "../../store/zustandTest.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useCgen from "../../helpers/cgenHook";
import Header from "../Header/headerComponent";
import ColorPicker from "../Colors/SliderComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/*
Props: none 
Returns: header, all buttons and controls for fractal, viewer component
Description: 
*/

function Control({}) {
  // * refs * //
  // script
  const inputRef = useRef(null);
  // axeses - refs start as the default values set in the component
  const RealMinRef = useRef(-2);
  const CpxMinRef = useRef(2);
  const RealMaxRef = useRef(-2);
  const CpxMaxRef = useRef(2);
  // y axis resolution  - x is calulated from this
  const yResRef = useRef(2160);

  // * local state * //
  // passed as prop to viewer to know wether to go back or not
  const [back, setBack] = useState(0);
  // if cpx cords are shown - default true
  const [showCords, setShowCords] = useState(true);
  // resolution state - starts as default values
  const [res, setRes] = useState({
    x: 2160,
    y: 2160,
    scaleX: 2,
    scaleY: 2,
    startX: -1080,
    startY: -1080,
  });

  const [script, setScript] = useState(null);

  const codeRef = useRef(null);

  const [numColors, setNumColors] = useState(50);

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

  function handlePan(direction) {
    switch (direction) {
      case "left":
        setRes({
          x: res.x,
          y: res.y,
          scaleX: res.scaleX,
          scaleY: res.scaleY,
          startX: res.startX - (res.x / 2) * res.scaleX,
          startY: res.startY,
        });
        break;

      case "right":
        setRes({
          x: res.x,
          y: res.y,
          scaleX: res.scaleX,
          scaleY: res.scaleY,
          startX: res.startX + (res.x / 2) * res.scaleX,
          startY: res.startY,
        });
        break;

      case "up":
        setRes({
          x: res.x,
          y: res.y,
          scaleX: res.scaleX,
          scaleY: res.scaleY,
          startX: res.startX,
          startY: res.startY - (res.y / 2) * res.scaleY,
        });
        break;

      case "down":
        setRes({
          x: res.x,
          y: res.y,
          scaleX: res.scaleX,
          scaleY: res.scaleY,
          startX: res.startX,
          startY: res.startY + (res.y / 2) * res.scaleY,
        });
        break;

      default:
        return;
    }
  }

  function handleZoom(zoomIn) {
    let scaleX = res.scaleX;
    let scaleY = res.scaleY;
    let startX = res.startX;
    let startY = res.startY;

    if (zoomIn) {
      setRes({
        x: res.x,
        y: res.y,
        scaleX: scaleX * 0.5,
        scaleY: scaleY * 0.5,
        startX: (startX + res.x / 2) / 2,
        startY: (startY + res.y / 2) / 2,
        // startX: (startX + (res.x + startX * scaleX * 0.5) / 2) / 2,
        // startY: (startY + (res.y + startY * scaleY * 0.5) / 2) / 2,
      });

      // this works - ust doest seem like it since scales and stuff in here doesn't get updated after they change in viewer component
    } else {
      setRes({
        x: res.x,
        y: res.y,
        scaleX: scaleX * 2,
        scaleY: scaleY * 2,
        startX: startX * 2 - res.x / 2,
        startY: startY * 2 - res.y / 2,
      });
    }
  }
  const backReady = useBackState((state) => state.allowed);
  const compileReady = useCompileStore((state) => state.ready);
  codeRef.current = useCgen(script);
  // the retun val is a test~~~!!!!
  useCompileCode(codeRef.current);

  return (
    <>
      <div id="control-viewer">
        <div id="controls">
          <Header />
          <Container fluid>
            <Row>
              <Col>
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
                  {compileReady ? (
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

                <Form>
                  <Form.Group>
                    <Form.Label>Max Radius</Form.Label>
                    <Form.Control></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Min Radius</Form.Label>
                    <Form.Control></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Epsilon</Form.Label>
                    <Form.Control></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Max Iterations</Form.Label>
                    <Form.Control></Form.Control>
                  </Form.Group>
                </Form>
                <Form>
                  <Button variant="primary" onClick={() => handleZoom(true)}>
                    +
                  </Button>
                  <Button variant="primary" onClick={() => handleZoom(false)}>
                    -
                  </Button>
                  <Button variant="primary" onClick={() => handlePan("left")}>
                    left
                  </Button>
                  <Button variant="primary" onClick={() => handlePan("right")}>
                    right
                  </Button>
                  <Button variant="primary" onClick={() => handlePan("up")}>
                    up
                  </Button>
                  <Button variant="primary" onClick={() => handlePan("down")}>
                    down
                  </Button>
                </Form>
              </Col>
              <Col>
                <Form id="viewer-form">
                  {backReady ? (
                    <Button variant="primary" onClick={handleBack}>
                      Back
                    </Button>
                  ) : (
                    <Button variant="primary" disabled onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button variant="primary">Forward</Button>

                  <Form.Group>
                    <Form.Control
                      ref={RealMinRef}
                      type="text"
                      defaultValue={2}
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
                    <Button variant="primary">Update</Button>
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => setShowCords((prev) => !prev)}
                  >
                    Show cpx
                  </Button>
                </Form>
                <Form>
                  <Form.Control placeholder="real part"></Form.Control>
                  <Form.Control placeholder="imag part"></Form.Control>
                  <Button variant="primary">Generate Dynaical Space</Button>
                </Form>
              </Col>

              <Form.Control
                onChange={(evt) => setNumColors(evt.target.value)}
                type="number"
                defaultValue={numColors}
                placeholder="Enter number of colors"
              ></Form.Control>
              <ColorPicker num={numColors} />
            </Row>
          </Container>
        </div>

        {/* the key is what triggers a re render type thing, we don't want back there, becuase then the whole thing will start over */}
        <Viewer
          key={
            res.x ||
            res.y ||
            res.scaleX ||
            res.scaleY ||
            res.startX ||
            res.startY ||
            showCords
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
