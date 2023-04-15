import "./control.css";
import { useRef, useState, useEffect } from "react";
import Viewer from "../Viewer/viewerComponent";
import { useCompileCode } from "../../helpers/emceptionHooks";
import {
  useBackState,
  useCompileStore,
  useColorsStore,
  useTmpParamsStore,
} from "../../store/zustandTest.js";
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
Returns: header, all buttons and controls for fractal, viewer component (contains canvases and cords box)
Description: This components has all of the options for the fractal, and passes them as props to the viewer
component. It uses tmpParamsStore which stores the values for these options that are currently being used
by the viewer (gets written to by this component and also viewer for back button and box zooms). This component
holds/controls the state of the options currently, and compares them with the stored options, and if different 
it allows an update button click, which changes the props, rerendering viewer. The script stuff and generating
julia set or obit button is also here, but handled differently than above flow
*/

function Control({}) {
  // * refs * //

  // script ref
  const inputRef = useRef(null);
  // the cgened code from useCgen that gets passed to emception
  const codeRef = useRef(null);

  // * global state * //

  // if back click is allowed
  const backReady = useBackState((state) => state.allowed);
  const compileReady = useCompileStore((state) => state.ready);
  // color stuff from color component - way to pass state up
  const { finalNumColors, colors } = useColorsStore((state) => ({
    finalNumColors: state.amt,
    colors: state.colors,
  }));
  // gets all of tmpParamsStore - the current values of options being used in viewer
  const tmpParamsStore = useTmpParamsStore();
  // methods on ^^
  const setAlltmpParamsStore = useTmpParamsStore((state) => state.setAll);
  const setAxises = useTmpParamsStore((state) => state.setAxises);

  // * local state * //

  // back clicks
  const [back, setBack] = useState(0);
  // cpx number
  const [showCords, setShowCords] = useState(true);
  // if we should clear fractal on orbit drag
  const [showFrac, setShowFrac] = useState(true);
  // silly fix to force SOMETHING
  const [foo, setFoo] = useState(0);
  // current values of options - what is in textboxes - gets set to default vals for tmpParamsStore initially
  const [tmpParams, setTmpParams] = useState(tmpParamsStore);
  // the props that get passed down to viewer - starts as default values as per paramsStore
  const [params, setParams] = useState({
    x: 2160,
    y: 2160,
    scaleX: 2,
    scaleY: 2,
    startX: -1080,
    startY: -1080,
    maxRad: 4,
    minRad: 0.1,
    epsilon: 0.000001,
    maxIters: 64,
    numColors: tmpParamsStore.numColors,
    colors: tmpParamsStore.colors,
    orbitNum: 64,
    orbitColor: "red",
  });
  // the values for the generate on click
  const [genVals, setGenVals] = useState([null, null]);
  // current script running/ to be run, updates to inputRef when compile and run is clicked
  const [script, setScript] = useState(null);
  // numColors that get passed as prop to color components - could proably merge with numColors in tmpParams
  const [numColors, setNumColors] = useState(50);
  // state if an update is ok
  const [updateOk, setUpdateOk] = useState(false);

  // * useEffects * //

  // update current values in this component when colors change
  useEffect(() => {
    setTmpParams({ ...tmpParams, colors: colors, numColors: finalNumColors });
  }, [colors, finalNumColors]);

  // when the store (options used in fractal) get updated, update the current values to them
  // happens on box zoom or back
  useEffect(() => {
    setTmpParams(tmpParamsStore);
  }, [tmpParamsStore]);

  // on change of options in this component, check with options currently for viewer
  // if different: allow update, if the same, don't allow update
  useEffect(() => {
    if (
      tmpParamsStore.realMax != tmpParams.realMax ||
      tmpParamsStore.realMin != tmpParams.realMin ||
      tmpParamsStore.imgMax != tmpParams.imgMax ||
      tmpParamsStore.imgMin != tmpParams.imgMin ||
      tmpParamsStore.imagAxisRes != tmpParams.imagAxisRes ||
      tmpParamsStore.epsilon != tmpParams.epsilon ||
      tmpParamsStore.maxIters != tmpParams.maxIters ||
      tmpParamsStore.minRad != tmpParams.minRad ||
      tmpParamsStore.maxRad != tmpParams.maxRad ||
      JSON.stringify(tmpParamsStore.colors) !==
        JSON.stringify(tmpParams.colors) ||
      tmpParamsStore.numColors != tmpParams.numColors ||
      tmpParamsStore.type != tmpParams.type ||
      tmpParamsStore.orbitNum != tmpParams.orbitNum ||
      tmpParamsStore.orbitColor != tmpParams.orbitColor
    ) {
      setUpdateOk(true);
    } else {
      setUpdateOk(false);
    }
  }, [tmpParams]);

  // * click handlers * //

  // handles an update, uses the values of tmpParamStore to calculate the params to be passed
  // as props to viewer, then sets those params, and also sets the tmpParamStore
  function handleUpdate() {
    // math to calculate height, width, starts, and scales of canvas from complex number range
    let height = tmpParams.imgMax - tmpParams.imgMin;
    let width = tmpParams.realMax - tmpParams.realMin;

    let yRes = tmpParams.imagAxisRes;
    let xRes = (width / height) * yRes;

    let xScale = width / 2;
    let yScale = height / 2;

    let midX =
      (parseFloat(tmpParams.realMin) + parseFloat(tmpParams.realMax)) / 2;
    let midY =
      (parseFloat(tmpParams.imgMin) + parseFloat(tmpParams.imgMax)) / 2;

    // difference between middle and zero * res/2
    let shiftX = (midX - 0) * (xRes / 2);
    let shiftY = (midY - 0) * (yRes / 2);

    let startX = -((xRes / 2) * (xScale - 1)) + shiftX;
    let startY = -((yRes / 2) * (yScale - 1)) - shiftY;

    // props for viewer
    setParams({
      ...params,
      x: parseInt(Math.round(xRes)),
      y: parseInt(Math.round(yRes)),
      scaleX: parseFloat(xScale),
      scaleY: parseFloat(yScale),
      startX: parseFloat(startX),
      startY: parseFloat(startY),
      maxRad: parseFloat(tmpParams.maxRad),
      minRad: parseFloat(tmpParams.minRad),
      epsilon: parseFloat(tmpParams.epsilon),
      maxIters: parseInt(tmpParams.maxIters),
      colors: tmpParams.colors,
      numColors: tmpParams.numColors,
      orbitColor: tmpParams.orbitColor,
      orbitNum: tmpParams.orbitNum,
      foo: foo + 1,
    });

    // tmpParamsStore update (match what to check agianst to what is here now because updated viewer here)
    setAlltmpParamsStore(
      tmpParams.realMax,
      tmpParams.realMin,
      tmpParams.imgMax,
      tmpParams.imgMin,
      tmpParams.maxRad,
      tmpParams.minRad,
      tmpParams.epsilon,
      tmpParams.maxIters,
      tmpParams.imagAxisRes,
      tmpParams.colors,
      tmpParams.numColors,
      tmpParams.re,
      tmpParams.im,
      tmpParams.type,
      tmpParams.orbitNum,
      tmpParams.orbitColor
    );
    setFoo((prev) => prev + 1);
  }

  // helper for handlePan that set Axises of tmpParamsStore for one start value
  function setStart(x, val) {
    if (x) {
      setAxises(
        (val - params.x / 2) / (params.x / 2),
        (params.scaleX * params.x + val - params.x / 2) / (params.x / 2),
        -(params.scaleY * params.y + params.startY - params.y / 2) /
          (params.y / 2),
        -(params.startY - params.y / 2) / (params.y / 2)
      );
    } else {
      setAxises(
        (params.startX - params.x / 2) / (params.x / 2),
        (params.scaleX * params.x + params.startX - params.x / 2) /
          (params.x / 2),
        -(params.scaleY * params.y + val - params.y / 2) / (params.y / 2),
        -(val - params.y / 2) / (params.y / 2)
      );
    }
  }

  // handles a pan left/right/up/down
  // for each case, the new start is calculated, then props updated,
  // and the tmpParamsStore is updated with setAxises
  function handlePan(direction) {
    // TODO could work better, needs to be flushed out and tested in terms of how much to move based on zoom
    let startX;
    let startY;
    switch (direction) {
      case "left":
        startX = params.startX - (params.x / 2) * params.scaleX;
        setParams({
          ...params,
          startX: startX,
        });
        setStart(true, startX);
        break;

      case "right":
        startX = params.startX + (params.x / 2) * params.scaleX;
        setParams({
          ...params,
          startX: startX,
        });
        setStart(true, startX);
        break;

      case "up":
        startY = params.startY - (params.y / 2) * params.scaleY;
        setParams({
          ...params,
          startY: startY,
        });
        setStart(false, startY);
        break;

      case "down":
        startY = params.startY + (params.y / 2) * params.scaleY;
        setParams({
          ...params,
          startY: startY,
        });
        setStart(false, startY);
        break;

      default:
        return;
    }
  }

  // handles zooms, sets the params to the new calculated zoom, and updates tmpParamsStore to it as well
  function handleZoom(zoomIn) {
    // TODO this doesn't work when you are not in the middle
    if (zoomIn) {
      // math for zooming in
      let scaleX = params.scaleX * 0.5;
      let scaleY = params.scaleY * 0.5;
      let startX = (params.startX + params.x / 2) / 2;
      let startY = (params.startY + params.y / 2) / 2;
      setParams({
        ...params,
        scaleX: scaleX,
        scaleY: scaleY,
        startX: startX,
        startY: startY,
      });
      setAxises(
        (startX - params.x / 2) / (params.x / 2),
        (scaleX * params.x + startX - params.x / 2) / (params.x / 2),
        -(scaleY * params.y + startY - params.y / 2) / (params.y / 2),
        -(startY - params.y / 2) / (params.y / 2)
      );
    } else {
      // math for zooming out
      let scaleX = params.scaleX * 2;
      let scaleY = params.scaleY * 2;
      let startX = params.startX * 2 - params.x / 2;
      let startY = params.startY * 2 - params.y / 2;
      setParams({
        ...params,
        scaleX: scaleX,
        scaleY: scaleY,
        startX: startX,
        startY: startY,
      });
      setAxises(
        (startX - params.x / 2) / (params.x / 2),
        (scaleX * params.x + startX - params.x / 2) / (params.x / 2),
        -(scaleY * params.y + startY - params.y / 2) / (params.y / 2),
        -(startY - params.y / 2) / (params.y / 2)
      );
    }
  }

  // calling hook to set current value of codeRef
  // * refs don't cause rerenders when they change or update value
  codeRef.current = useCgen(script);
  // compile - in hook, only runs if code changes - triggers change in state
  // that useGenPixles is binded to, so this also generates new pixles with useGenPixles
  useCompileCode(codeRef.current);

  // below is the jsx to be returned. It is the header, all of the options, the color components,
  // and the viewer component inlined styled with bootstrap
  // in all the forms, the value is hard set to the current options here (tmpParams) and they have
  // on change handlers which set those tmpParams
  return (
    <>
      <div id="control-viewer">
        <div id="controls">
          <Header />
          <Container fluid>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Max Radius</Form.Label>
                    <Form.Control
                      value={tmpParams.maxRad}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, maxRad: e.target.value })
                      }
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Min Radius</Form.Label>
                    <Form.Control
                      value={tmpParams.minRad}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, minRad: e.target.value })
                      }
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Epsilon</Form.Label>
                    <Form.Control
                      value={tmpParams.epsilon}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, epsilon: e.target.value })
                      }
                      type="number"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Max Iterations</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.maxIters}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, maxIters: e.target.value })
                      }
                    ></Form.Control>
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
                  <Form />
                  <Form.Label>Orbit Iterations</Form.Label>
                  <Form.Control
                    placeholder="orbit number"
                    type="number"
                    value={tmpParams.orbitNum}
                    onChange={(e) =>
                      setTmpParams({ ...tmpParams, orbitNum: e.target.value })
                    }
                  ></Form.Control>
                  <Form.Label>Orbit Color</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={tmpParams.orbitColor}
                    onChange={(e) =>
                      setTmpParams({ ...tmpParams, orbitColor: e.target.value })
                    }
                  >
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                  </Form.Select>

                  {/* if there is a fractal on the screen, don't grey out boxes */}
                  <Form>
                    {tmpParams.type === 0 ||
                    tmpParams.type === 1 ||
                    tmpParams.type === 2 ? (
                      <>
                        <Form.Control
                          placeholder="Real Part"
                          type="number"
                          value={tmpParams.re == null ? "" : tmpParams.re}
                          onChange={(e) =>
                            setTmpParams({ ...tmpParams, re: e.target.value })
                          }
                        ></Form.Control>
                        <Form.Control
                          placeholder="Imaginary Part"
                          type="number"
                          value={tmpParams.im == null ? "" : tmpParams.im}
                          onChange={(e) => {
                            setTmpParams({ ...tmpParams, im: e.target.value });
                          }}
                        ></Form.Control>
                      </>
                    ) : (
                      <>
                        <Form.Control
                          placeholder="Real Part"
                          disabled
                          readOnly
                        ></Form.Control>
                        <Form.Control
                          placeholder="Imaginary Part"
                          disabled
                          readOnly
                        ></Form.Control>
                      </>
                    )}
                    {/* gen julia space button if in param (type 0) otherwise orbit, if not fractal gen julia
                    don't have anything about what type it is here, because that is handled in viewer */}
                    {tmpParams.type === 0 ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() =>
                            setGenVals([tmpParams.re, tmpParams.im])
                          }
                        >
                          Generate Dynamical System
                        </Button>
                      </>
                    ) : tmpParams.type === 1 || tmpParams.type === 2 ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() =>
                            setGenVals([tmpParams.re, tmpParams.im])
                          }
                        >
                          Generate Orbit
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" disabled>
                          Generate Dynamic Space
                        </Button>
                      </>
                    )}
                  </Form>
                </Form>
              </Col>
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
                <Form id="viewer-form">
                  {backReady ? (
                    <Button
                      variant="primary"
                      onClick={() => setBack((prev) => prev + 1)}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      disabled
                      onClick={() => setBack((prev) => prev + 1)}
                    >
                      Back
                    </Button>
                  )}
                  {/* <Button variant="primary">Forward</Button> */}
                  {/* <Button variant="primary" onClick={resetTmpGlobal}>
                    Reset
                  </Button> */}
                  {updateOk ? (
                    <Button variant="warning" onClick={handleUpdate}>
                      Update
                    </Button>
                  ) : (
                    <Button variant="warning" disabled>
                      Update
                    </Button>
                  )}

                  <Form.Group>
                    <Form.Label>Real Axis Min Value</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.realMin}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, realMin: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Real Axis Max Value</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.realMax}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, realMax: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Min Value</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.imgMin}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, imgMin: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Max Value</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.imgMax}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, imgMax: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Resolution</Form.Label>
                    <Form.Control
                      type="number"
                      value={tmpParams.imagAxisRes}
                      onChange={(e) =>
                        setTmpParams({
                          ...tmpParams,
                          imagAxisRes: e.target.value,
                        })
                      }
                    ></Form.Control>
                  </Form.Group>
                  {showCords ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => setShowCords((prev) => !prev)}
                      >
                        Hide Complex Number
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => setShowCords((prev) => !prev)}
                    >
                      Show Complex Number
                    </Button>
                  )}
                  {showFrac ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => setShowFrac((prev) => !prev)}
                      >
                        Hide Fractal on Orbit Drag
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => setShowFrac((prev) => !prev)}
                      >
                        Show Fractal on Orbit Drag
                      </Button>
                    </>
                  )}
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

        {/* the key is what triggers a full restart???, we don't want back there, becuase then the whole thing will start over */}
        <Viewer
          key={params}
          xRes={params.x}
          yRes={params.y}
          initXscale={params.scaleX}
          initYscale={params.scaleY}
          initStartX={params.startX}
          initStartY={params.startY}
          colors={params.colors}
          numColors={params.numColors}
          maxRad={params.maxRad}
          minRad={params.minRad}
          epsilon={params.epsilon}
          maxIters={params.maxIters}
          back={back}
          showCords={showCords}
          foo={params.foo}
          orbitNum={params.orbitNum}
          orbitColor={params.orbitColor}
          genVals={genVals}
          showFrac={showFrac}
        />
      </div>
    </>
  );
}

export default Control;
