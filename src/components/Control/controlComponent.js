import "./control.css";
import { useRef, useState, useEffect } from "react";
import Viewer from "../Viewer/viewerComponent";
import { useCompileCode } from "../../helpers/emceptionHooks";
import {
  useBackState,
  useCompileStore,
  useColorsStore,
  useTmpParamsStore,
  useCanStyleStore,
} from "../../store/zustandTest.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useCgen from "../../helpers/cgenHook";
import Header from "../Header/headerComponent";
import ColorPicker from "../Colors/SliderComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { axesToParams } from "../../helpers/util";

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
  const wrapperRef = useRef(null);
  const childrenRefs = useRef([]);
  const [styleType, setStyleType] = useState(0);

  useEffect(() => {
    if (wrapperRef.current && childrenRefs.current) {
      let width = wrapperRef.current.clientWidth;
      let height = wrapperRef.current.clientHeight;

      const occupiedHeight = childrenRefs.current.reduce(
        (acc, item) => acc + item.clientHeight,
        0
      );

      let difference = height - occupiedHeight;
      // TODO refactor to clean code and readable
      if (difference <= 3 && styleType === 0) {
        if (styleType === 0) {
          setStyleType(1);
        }
      } else if (difference > 100 && styleType === 1) {
        setStyleType(0);
      } else if (difference <= 2 && styleType === 1) {
        setStyleType(2);
      } else if (difference > 139 && styleType === 2) {
        setStyleType(1);
      } else if (difference <= 2 && styleType === 2) {
        setStyleType(3);
      } else if (difference > 400 && styleType === 3) {
        setStyleType(1);
      } else if (difference > 150 && styleType === 4) {
        setStyleType(3);
      } else if (difference <= 2 && styleType === 3) {
        setStyleType(4);
      }

      // CHANGE ON ADDITIONS
      // this is the point when the header goes to min number of lines

      // 836628
      // if (width > 1037) {
      //   width = 1038;
      // }
      // 1233180

      let area = width * height;
      // if (
      //   height < 808 ||
      //   (width < 1038 && height < 831) ||
      //   (width < 882 && height < 0)
      // ) {
      //   // here go to smaller
      //   console.log("small area");
      //   if (styleType === 0) {
      //     setStyleType(1);
      //   }
      // } else if (styleType == 1) {
      //   setStyleType(0);
      // }

      // use area calculation??

      // here... calculate how much we need to scale down and update a state, something like 0 is normal, 1 is collpsed colors,
      // 2 is collpased orbit stuff and
      // 3 is
    }
  });

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

  const canWidthStore = useCanStyleStore((state) => state.width);
  // need to add this one simply for reclacuating the total screen width... could do it a different way with local state for screen width but this works too
  // becuae this gets updated every time the screen is resized
  const trigger = useCanStyleStore((state) => state.reCalc);
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

  // for (int x = 0; x < floor(newCanWidth); x++){
  //   for (int y = 0; y < floor(newCanHeight); y++){
  //    double screen_re = (((widthScale * x) + startX) - width / 2.) / (width  /2.);
  //   double screen_im = -(((heightScale * y) + startY) - height /2.) / (height /2.);
  //   }
  // }
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

    let { scaleX, scaleY, startX, startY } = axesToParams(
      tmpParams.imgMax,
      tmpParams.imgMin,
      tmpParams.realMax,
      tmpParams.realMin,
      xRes,
      yRes
    );

    // props for viewer
    setParams({
      ...params,
      x: parseInt(Math.round(xRes)),
      y: parseInt(Math.round(yRes)),
      scaleX: parseFloat(scaleX),
      scaleY: parseFloat(scaleY),
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

  // handles a pan left/right/up/down
  // for each case, the new start is calculated, then props updated,
  // and the tmpParamsStore is updated with setAxises
  function handlePan(direction) {
    let height = tmpParams.imgMax - tmpParams.imgMin;
    let width = tmpParams.realMax - tmpParams.realMin;
    let newRealMax = tmpParams.realMax;
    let newRealMin = tmpParams.realMin;
    let newImgMax = tmpParams.imgMax;
    let newImgMin = tmpParams.imgMin;

    switch (direction) {
      case "left":
        newRealMax = tmpParams.realMax - width / 2;
        newRealMin = tmpParams.realMin - width / 2;
        break;

      case "right":
        newRealMax = tmpParams.realMax + width / 2;
        newRealMin = tmpParams.realMin + width / 2;
        break;

      case "up":
        newImgMax = tmpParams.imgMax + height / 2;
        newImgMin = tmpParams.imgMin + height / 2;
        break;

      case "down":
        newImgMax = tmpParams.imgMax - height / 2;
        newImgMin = tmpParams.imgMin - height / 2;
        break;

      default:
        return;
    }

    let { scaleX, scaleY, startX, startY } = axesToParams(
      newImgMax,
      newImgMin,
      newRealMax,
      newRealMin,
      params.x,
      params.y
    );

    setParams({
      ...params,
      startX: startX,
      startY: startY,
      scaleX: scaleX,
      scaleY: scaleY,
    });

    setAxises(newRealMin, newRealMax, newImgMin, newImgMax);

    return;
  }

  // handles zooms, sets the params to the new calculated zoom, and updates tmpParamsStore to it as well
  function handleZoom(zoomIn) {
    let height;
    let width;
    let newRealMax;
    let newRealMin;
    let newImgMax;
    let newImgMin;

    if (zoomIn) {
      height = (tmpParams.imgMax - tmpParams.imgMin) / 2;
      width = (tmpParams.realMax - tmpParams.realMin) / 2;
      newRealMax = tmpParams.realMax - width / 2;
      newRealMin = tmpParams.realMin + width / 2;
      newImgMax = tmpParams.imgMax - height / 2;
      newImgMin = tmpParams.imgMin + height / 2;
    } else {
      // math for zooming out
      height = (tmpParams.imgMax - tmpParams.imgMin) * 2;
      width = (tmpParams.realMax - tmpParams.realMin) * 2;
      newRealMax = tmpParams.realMax + width / 4;
      newRealMin = tmpParams.realMin - width / 4;
      newImgMax = tmpParams.imgMax + height / 4;
      newImgMin = tmpParams.imgMin - height / 4;
    }

    let { scaleX, scaleY, startX, startY } = axesToParams(
      newImgMax,
      newImgMin,
      newRealMax,
      newRealMin,
      params.x,
      params.y
    );

    setParams({
      ...params,
      scaleX: scaleX,
      scaleY: scaleY,
      startX: startX,
      startY: startY,
    });

    setAxises(newRealMin, newRealMax, newImgMin, newImgMax);
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
        <div
          id="controls"
          ref={wrapperRef}
          // -5 makes it works with global padding
          // here is hard setting width of control container based on the calculated width
          // just doing it for the viewer container doesn't quite work fully, this addition makes it

          style={{
            width: canWidthStore
              ? document.documentElement.clientWidth - canWidthStore - 5 + "px"
              : "",
          }}
        >
          {wrapperRef.current ? (
            <>
              <Card id="header" ref={(el) => (childrenRefs.current[0] = el)}>
                <Card.Body>
                  <Card.Title>Fractal Voyager</Card.Title>
                  <Card.Subtitle>
                    Online fractal generator using a complex dynamics scripting
                    language
                  </Card.Subtitle>
                  <Card.Text>
                    Enter a script in the text box and press "compile and run".
                    To alter the paramters passed to the program, edit the
                    options then click update.
                  </Card.Text>
                  {/* <Card.Link href="#">Language Doccumentation</Card.Link> */}
                </Card.Body>
              </Card>
              {/* <Header /> */}
              <Container fluid ref={(el) => (childrenRefs.current[1] = el)}>
                <Row>
                  <div className={styleType < 3 ? "col" : ""}>
                    {styleType < 2 ? (
                      <Form>
                        <Form.Group>
                          <Form.Label>Max Radius</Form.Label>
                          <Form.Control
                            value={tmpParams.maxRad}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                maxRad: e.target.value,
                              })
                            }
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Min Radius</Form.Label>
                          <Form.Control
                            value={tmpParams.minRad}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                minRad: e.target.value,
                              })
                            }
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Epsilon</Form.Label>
                          <Form.Control
                            value={tmpParams.epsilon}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                epsilon: e.target.value,
                              })
                            }
                            type="number"
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Max Iterations</Form.Label>
                          <Form.Control
                            type="number"
                            disabled={tmpParams.type === 2}
                            value={tmpParams.maxIters}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                maxIters: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                      </Form>
                    ) : (
                      <>
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
                      </>
                    )}
                    {styleType < 3 ? (
                      <>
                        <Form>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handleZoom(true)}
                          >
                            +
                          </Button>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handleZoom(false)}
                          >
                            -
                          </Button>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handlePan("left")}
                          >
                            left
                          </Button>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handlePan("right")}
                          >
                            right
                          </Button>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handlePan("up")}
                          >
                            up
                          </Button>
                          <Button
                            disabled={tmpParams.type === 2}
                            variant="primary"
                            onClick={() => handlePan("down")}
                          >
                            down
                          </Button>
                          <Form />
                          <Form.Label>Orbit Iterations</Form.Label>
                          <Form.Control
                            placeholder="orbit number"
                            type="number"
                            value={tmpParams.orbitNum}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                orbitNum: e.target.value,
                              })
                            }
                          ></Form.Control>
                          <Form.Label>Orbit Color</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={tmpParams.orbitColor}
                            onChange={(e) =>
                              setTmpParams({
                                ...tmpParams,
                                orbitColor: e.target.value,
                              })
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
                                  value={
                                    tmpParams.re == null ? "" : tmpParams.re
                                  }
                                  onChange={(e) =>
                                    setTmpParams({
                                      ...tmpParams,
                                      re: e.target.value,
                                    })
                                  }
                                ></Form.Control>
                                <Form.Control
                                  placeholder="Imaginary Part"
                                  type="number"
                                  value={
                                    tmpParams.im == null ? "" : tmpParams.im
                                  }
                                  onChange={(e) => {
                                    setTmpParams({
                                      ...tmpParams,
                                      im: e.target.value,
                                    });
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
                                  Generate Dynamical Plane
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
                                  Generate Dynamical Plane
                                </Button>
                              </>
                            )}
                          </Form>
                        </Form>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styleType < 3 ? "col" : ""}>
                    {styleType < 2 ? (
                      <>
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
                      </>
                    ) : (
                      ""
                    )}

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
                      {styleType === 3 || styleType === 4 ? (
                        <>
                          <Button variant="primary">Other Options</Button>
                        </>
                      ) : (
                        ""
                      )}
                    </Form>
                    {styleType < 3 ? (
                      <>
                        <Form>
                          <Form.Group>
                            <Form.Label>Real Axis Min Value</Form.Label>
                            <Form.Control
                              type="number"
                              value={tmpParams.realMin}
                              disabled={tmpParams.type === 2}
                              onChange={(e) => {
                                let num = e.target.value;
                                setTmpParams({
                                  ...tmpParams,
                                  realMin: num !== "" ? Number(num) : "",
                                });
                              }}
                            ></Form.Control>
                            <Form.Label>Real Axis Max Value</Form.Label>
                            <Form.Control
                              type="number"
                              value={tmpParams.realMax}
                              disabled={tmpParams.type === 2}
                              onChange={(e) => {
                                let num = e.target.value;
                                setTmpParams({
                                  ...tmpParams,
                                  realMax: num !== "" ? Number(num) : "",
                                });
                              }}
                            ></Form.Control>
                            <Form.Label>Imaginary Axis Min Value</Form.Label>
                            <Form.Control
                              type="number"
                              value={tmpParams.imgMin}
                              disabled={tmpParams.type === 2}
                              onChange={(e) => {
                                let num = e.target.value;
                                setTmpParams({
                                  ...tmpParams,
                                  imgMin: num !== "" ? Number(num) : "",
                                });
                              }}
                            ></Form.Control>
                            <Form.Label>Imaginary Axis Max Value</Form.Label>
                            <Form.Control
                              type="number"
                              value={tmpParams.imgMax}
                              disabled={tmpParams.type === 2}
                              onChange={(e) => {
                                let num = e.target.value;
                                setTmpParams({
                                  ...tmpParams,
                                  imgMax: num !== "" ? Number(num) : "",
                                });
                              }}
                            ></Form.Control>
                            <Form.Label>Imaginary Axis Resolution</Form.Label>
                            <Form.Control
                              type="number"
                              disabled={tmpParams.type === 2}
                              value={tmpParams.imagAxisRes}
                              onChange={(e) => {
                                let num = e.target.value;
                                setTmpParams({
                                  ...tmpParams,
                                  imagAxisRes: num !== "" ? Number(num) : "",
                                });
                              }}
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
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </Row>

                <Row>
                  {styleType > 1 && styleType < 3 ? (
                    <Col>
                      <Button variant="primary" style={{ width: "100%" }}>
                        Edit Program Paramaters
                      </Button>
                    </Col>
                  ) : (
                    ""
                  )}
                  {/* will certianly need to be smaller if height is under 807 */}
                  {(styleType === 1) | (styleType === 2) ? (
                    <>
                      <Col>
                        <Button variant="primary" style={{ width: "100%" }}>
                          Open Color Select
                        </Button>
                      </Col>
                    </>
                  ) : styleType === 4 ? (
                    ""
                  ) : (
                    <>
                      <Form.Control
                        onChange={(evt) => setNumColors(evt.target.value)}
                        type="number"
                        defaultValue={numColors}
                        placeholder="Enter number of colors"
                      ></Form.Control>
                      <ColorPicker num={numColors} />
                    </>
                  )}
                </Row>
              </Container>
            </>
          ) : (
            ""
          )}
        </div>

        <Viewer
          // this actually does nothing, for the params to really be the key do below, but that kinda messes it up, we really don't want duplicate componets
          // it makes it so the screen goes white, and you can't go back if you change one of the controls
          //key={params}
          //key={Object.entries(params)}
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
