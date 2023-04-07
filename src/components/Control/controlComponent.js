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
import { FormLabel } from "react-bootstrap";

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

  const codeRef = useRef(null);

  // * global state * //

  const backReady = useBackState((state) => state.allowed);
  const compileReady = useCompileStore((state) => state.ready);
  // const finalNumColors = useColorsStore((state) => state.amt);
  // const colors = useColorsStore((state) => state.colors);

  const { finalNumColors, colors } = useColorsStore((state) => ({
    finalNumColors: state.amt,
    colors: state.colors,
  }));

  const tmpParamsStore = useTmpParamsStore();
  const resetTmpGlobal = useTmpParamsStore((state) => state.reset);
  const setAlltmpParamsStore = useTmpParamsStore((state) => state.setAll);
  const setAxises = useTmpParamsStore((state) => state.setAxises);

  // // // console.log((colors);
  useEffect(() => {
    setTmpParams({ ...tmpParams, colors: colors, numColors: finalNumColors });
  }, [colors, finalNumColors]);

  // * local state * //
  const [back, setBack] = useState(0);
  const [showCords, setShowCords] = useState(true);

  const [foo, setFoo] = useState(0);

  const [tmpParams, setTmpParams] = useState(tmpParamsStore);

  // this will replace above
  const [params, setParams] = useState({
    x: 2160,
    y: 2160,
    scaleX: 2,
    scaleY: 2,
    startX: -1080,
    startY: -1080,
    maxRad: 4,
    minRad: 0.001,
    epsilon: 0.000001,
    maxIters: 64,
    numColors: tmpParamsStore.numColors,
    colors: tmpParamsStore.colors,
  });

  // orginally jsut need this for the axis because I thought thats all that viewer would write to
  // control, but the backs mean that everything must be written back ---- this should take care of it,
  // just need to update the tmpParamsStore on back
  useEffect(() => {
    setTmpParams(tmpParamsStore);
    // setParams?????
  }, [tmpParamsStore]);

  const [script, setScript] = useState(null);

  const [numColors, setNumColors] = useState(50);

  const [updateOk, setUpdateOk] = useState(false);

  // * on click handlers * //

  // could also do one of these for reset - but worry about actually doing reset later
  // need to reset the type and stuff too, somewhat complicated

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
      tmpParamsStore.numColors != tmpParams.numColors
    ) {
      console.log("STORE", tmpParamsStore.colors, "HERE", tmpParams.colors);
      // TODO error checking - and if it works out - allow update (ex axeses difference postivie)
      setUpdateOk(true);
    } else {
      // console.log(("equal");
      // console.log((tmpParamsStore, tmpParams);
      setUpdateOk(false);
    }
  }, [tmpParams]);

  // handles
  function handleUpdate() {
    // // // // console.log((CpxMaxRef);
    // TODO think I need to set tmpParamStore
    // assuming we have all parts of the form,
    // let height = CpxMaxRef.current.value - CpxMinRef.current.value;
    // let width = RealMaxRef.current.value - RealMinRef.current.value;

    let height = tmpParams.imgMax - tmpParams.imgMin;
    let width = tmpParams.realMax - tmpParams.realMin;

    let yRes = tmpParams.imagAxisRes;

    //let yRes = yResRef.current.value;
    // console.log(("VALS", tmpParams.realMax, tmpParams.realMin);

    // console.log((height, width, "HEIGHT AND WIDTH");
    let xRes = (width / height) * yRes;

    // 2 because the dfeault scale is -1 to 1 on both axises

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

    // console.log(("STASRTS", startX, startY, xRes, yRes);

    // // // console.log((xRes, yRes, xScale, yScale, startX, startY);

    console.log(tmpParams);

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
      foo: foo + 1,
    });
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
      tmpParams.numColors
    );
    setFoo((prev) => prev + 1);

    // setRes({
    //   x: parseInt(Math.round(xRes)),
    //   y: parseInt(Math.round(yRes)),
    //   scaleX: parseFloat(xScale),
    //   scaleY: parseFloat(yScale),
    //   startX: parseFloat(startX),
    //   startY: parseFloat(startY),
    // });

    // // // // console.log((xRes, yRes, xScale, yScale, startX, startY);
  }

  function handleBack() {
    setBack((prev) => prev + 1);
  }

  function handlePan(direction) {
    let startX;
    let startY;
    switch (direction) {
      case "left":
        startX = params.startX - (params.x / 2) * params.scaleX;
        setParams({
          ...params,
          startX: startX,
        });
        setAxises(
          (startX - params.x / 2) / (params.x / 2),
          (params.scaleX * params.x + startX - params.x / 2) / (params.x / 2),
          -(params.scaleY * params.y + params.startY - params.y / 2) /
            (params.y / 2),
          -(params.startY - params.y / 2) / (params.y / 2)
        );

        break;

      case "right":
        startX = params.startX + (params.x / 2) * params.scaleX;
        setParams({
          ...params,
          startX: startX,
        });
        // TODO make this a function
        setAxises(
          (startX - params.x / 2) / (params.x / 2),
          (params.scaleX * params.x + startX - params.x / 2) / (params.x / 2),
          -(params.scaleY * params.y + params.startY - params.y / 2) /
            (params.y / 2),
          -(params.startY - params.y / 2) / (params.y / 2)
        );

        break;

      case "up":
        startY = params.startY - (params.y / 2) * params.scaleY;
        setParams({
          ...params,
          startY: startY,
        });
        setAxises(
          (params.startX - params.x / 2) / (params.x / 2),
          (params.scaleX * params.x + params.startX - params.x / 2) /
            (params.x / 2),
          -(params.scaleY * params.y + startY - params.y / 2) / (params.y / 2),
          -(startY - params.y / 2) / (params.y / 2)
        );
        break;

      case "down":
        startY = params.startY + (params.y / 2) * params.scaleY;
        setParams({
          ...params,
          startY: startY,
        });
        setAxises(
          (params.startX - params.x / 2) / (params.x / 2),
          (params.scaleX * params.x + params.startX - params.x / 2) /
            (params.x / 2),
          -(params.scaleY * params.y + startY - params.y / 2) / (params.y / 2),
          -(startY - params.y / 2) / (params.y / 2)
        );
        break;

      default:
        return;
    }
  }

  function handleZoom(zoomIn) {
    if (zoomIn) {
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
        // startX: (startX + (res.x + startX * scaleX * 0.5) / 2) / 2,
        // startY: (startY + (res.y + startY * scaleY * 0.5) / 2) / 2,
      });
      setAxises(
        (startX - params.x / 2) / (params.x / 2),
        (scaleX * params.x + startX - params.x / 2) / (params.x / 2),
        -(scaleY * params.y + startY - params.y / 2) / (params.y / 2),
        -(startY - params.y / 2) / (params.y / 2)
      );

      // this works - ust doest seem like it since scales and stuff in here doesn't get updated after they change in viewer component
    } else {
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
                <Form>
                  <Form.Group>
                    <Form.Label>Max Radius</Form.Label>
                    <Form.Control
                      value={tmpParams.maxRad}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, maxRad: e.target.value })
                      }
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Min Radius</Form.Label>
                    <Form.Control
                      value={tmpParams.minRad}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, minRad: e.target.value })
                      }
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Epsilon</Form.Label>
                    <Form.Control
                      value={tmpParams.epsilon}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, epsilon: e.target.value })
                      }
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Max Iterations</Form.Label>
                    <Form.Control
                      value={tmpParams.maxIters}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, maxIters: e.target.value })
                      }
                      type="text"
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
                  <Form>
                    <Form.Control placeholder="real part"></Form.Control>
                    <Form.Control placeholder="imag part"></Form.Control>
                    <Form.Control placeholder="orbit number"></Form.Control>
                    <Form.Label>Orbit Color</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                    </Form.Select>

                    <Button variant="primary">Generate Dynaical Space</Button>
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
                    <Button variant="primary" onClick={handleBack}>
                      Back
                    </Button>
                  ) : (
                    <Button variant="primary" disabled onClick={handleBack}>
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
                      type="text"
                      value={tmpParams.realMin}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, realMin: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Real Axis Max Value</Form.Label>
                    <Form.Control
                      type="text"
                      value={tmpParams.realMax}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, realMax: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Min Value</Form.Label>
                    <Form.Control
                      type="text"
                      value={tmpParams.imgMin}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, imgMin: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Max Value</Form.Label>
                    <Form.Control
                      type="text"
                      value={tmpParams.imgMax}
                      onChange={(e) =>
                        setTmpParams({ ...tmpParams, imgMax: e.target.value })
                      }
                    ></Form.Control>
                    <Form.Label>Imaginary Axis Resolution</Form.Label>
                    <Form.Control
                      typ="text"
                      value={tmpParams.imagAxisRes}
                      onChange={(e) =>
                        setTmpParams({
                          ...tmpParams,
                          imagAxisRes: e.target.value,
                        })
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => setShowCords((prev) => !prev)}
                  >
                    Show cpx
                  </Button>
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
          // tmp fix to force renders even when props are the same because they are really different in viewer
        />
      </div>
    </>
  );
}

export default Control;
