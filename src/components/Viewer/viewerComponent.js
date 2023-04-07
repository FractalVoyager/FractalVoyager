import Canvas from "./canvasComponent";
import "./viewer.css";
import { useEffect, useState, useRef } from "react";
import CordsBox from "../CordsBox/cordsBoxComponent";
import {
  canvasToComplex,
  complexToCanvas,
  canvasToPoint,
} from "../../helpers/util";
import { useBackState, useCompileStore } from "../../store/zustandTest.js";
import { useGenPixles } from "../../helpers/emceptionHooks";
import {
  useColorsStore,
  useTmpParamsStore,
  useTermStore,
} from "../../store/zustandTest.js";

/*

*/
const Viewer = ({
  xRes,
  yRes,
  initXscale,
  initYscale,
  initStartX,
  initStartY,
  back,
  numColors,
  colors,
  maxRad,
  minRad,
  epsilon,
  maxIters,
  showCords,
  foo,
  orbitNum,
}) => {
  // const numColors = useColorsStore((state) => state.amt);
  // const colors = useColorsStore((state) => state.colors);
  // TODO - clean this up to avoid unnescarry re renders
  const [displayCords, setDisplayCords] = useState({ re: null, im: null });
  const [prevMandCords, setPrevMandCords] = useState([
    {
      startX: initStartX,
      startY: initStartY,
      widthScale: initXscale,
      heightScale: initYscale,
    },
  ]);

  const setAxises = useTmpParamsStore((state) => state.setAxises);
  const setAllTmpParamsStore = useTmpParamsStore((state) => state.setAll);

  // // // // console.log(initXscale, initYscale);

  const wrapperRef = useRef(null);

  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);

  // const [clearOribt, setClearOrbit] = useState(false);

  const [oldOrbit, setOldOrbit] = useState(null);

  // should always start with 0
  const [hereBack, setHereBack] = useState(back);

  const setBackOk = useBackState((state) => state.setAllowed);
  // this works but inst going into genPIxlesParams
  const initType = useCompileStore((state) => state.initialType);

  useEffect(() => {
    if (back !== hereBack) {
      // we don't want to reset the previous stuff if it is a first drawn julia set with no zooms or a orbit
      if (
        genPixlesParams.type === 0 ||
        (paramsStack.at(paramsStack.length - 1).type === 1 &&
          genPixlesParams.type === 1)
      ) {
        // // // // // // console.log("in if", prevMandCords);
        setPrevMandCords((prevMandCords) => prevMandCords.slice(0, -1));
      }

      // if (genPixlesParams.type == 2) {
      //   // console.log("CONNNNNSSSOOLLLE");
      //   setClearOrbit(true);
      // }

      let params = paramsStack.pop();

      setGenPixlesParams(params);
      // now need to set the tmpParamStore to update the control
      // console.log("PPPPPPPP", params);
      setAllTmpParamsStore(
        (params.widthScale * params.canWidth +
          params.startX -
          params.canWidth / 2) /
          (params.canWidth / 2),
        (params.startX - params.canWidth / 2) / (params.canWidth / 2),
        -(params.startY - params.canHeight / 2) / (params.canHeight / 2),
        -(
          params.heightScale * params.canHeight +
          params.startY -
          params.canHeight / 2
        ) /
          (params.canHeight / 2),
        params.maxRadius,
        params.minRadius,
        params.epsilon,
        params.maxIters,
        params.canHeight,
        params.colors,
        params.numColors
      );

      // setAllTmpParamsStore();
      setHereBack(back);
    }
  }, [back]);

  // TESTING FOR FIXING ZOOMS
  useEffect(() => {
    // console.log("HERERERERR");
    // console.log(
    //   xRes,
    //   yRes,
    //   initXscale,
    //   initYscale,
    //   initStartX,
    //   initStartY,
    //   colors,
    //   numColors
    // );
    console.log("here, NIM SO", numColors, colors);
    console.log(genPixlesParams);

    // this should make it so you can go back from the params set in the control
    // need the check because this runs the first time through
    if (genPixlesParams.type !== null) {
      console.log("SETTTING STACK IN USE EFFECT");
      setParamsStack([...paramsStack, genPixlesParams]);
    }
    setGenPixlesParams({
      ...genPixlesParams,
      widthScale: initXscale,
      heightScale: initYscale,
      startX: initStartX,
      startY: initStartY,
      canWidth: xRes,
      canHeight: yRes,
      newCanHeight: yRes,
      newCanWidth: xRes,
      colors: colors,
      numColors: numColors,
      maxIters: maxIters,
      epsilon: epsilon,
      minRadius: minRad,
      maxRadius: maxRad,
      arrayLength: xRes * yRes * 4,
    });
  }, [
    xRes,
    yRes,
    initXscale,
    initYscale,
    initStartX,
    initStartY,
    colors,
    numColors,
    maxRad,
    minRad,
    epsilon,
    maxIters,
    foo,
  ]);

  const [paramsStack, setParamsStack] = useState([]);

  const [clinetDims, setClientDims] = useState({
    width: null,
    height: null,
  });

  // first gen Pixles

  // useEffect(() => {
  //   setGenPixlesParams({
  //     ...genPixlesParams,
  //     colors: colors,
  //     numColors: numColors,
  //   });
  // }, [colors, numColors]);

  const [genPixlesParams, setGenPixlesParams] = useState({
    type: initType, // paramter plane, dyn, orbit    ------ TODO - this is based on inital type
    fixedVal: [null, null], // c will get set to pixel - for type 2 after type 1
    clickedVal: [null, null], // for orbit
    maxIters: maxIters,
    epsilon: epsilon,
    minRadius: minRad,
    maxRadius: maxRad,
    startX: initStartX,
    startY: initStartY,
    newCanWidth: xRes,
    newCanHeight: yRes,
    canWidth: xRes,
    canHeight: yRes,
    widthScale: initXscale,
    heightScale: initYscale,
    arrayLength: xRes * yRes * 4,
    colors: colors,
    numColors: numColors,
    //orbitNum: orbitNum,
  });

  // // // // console.log(genPixlesParams.widthScale);

  // // // // // // console.log(initType);
  // to reset genPIxlesParams with initType
  useEffect(() => {
    setGenPixlesParams({ ...genPixlesParams, type: initType });
  }, [initType]);
  // // // // // // console.log(genPixlesParams.type);
  // console.log("PARAMS IN VIEWER", genPixlesParams);

  let p = useGenPixles(
    genPixlesParams.type,
    genPixlesParams.fixedVal[0],
    genPixlesParams.fixedVal[1],
    genPixlesParams.clickedVal[0],
    genPixlesParams.clickedVal[1],
    genPixlesParams.maxIters,
    genPixlesParams.epsilon,
    genPixlesParams.minRadius,
    genPixlesParams.maxRadius,
    genPixlesParams.startX,
    genPixlesParams.startY,
    genPixlesParams.newCanWidth,
    genPixlesParams.newCanHeight,
    genPixlesParams.canWidth,
    genPixlesParams.canHeight,
    genPixlesParams.widthScale,
    genPixlesParams.heightScale,
    genPixlesParams.arrayLength,
    genPixlesParams.colors,
    genPixlesParams.numColors,
    genPixlesParams.orbitNum
  );

  // console.log("PPPPPPPPP", p);

  const interDrawOrbit = (re, im) => {
    console.log("inter draw orbit");
    quickWrite("Generating orbit...");
    // setClearOrbit(true);
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      ...genPixlesParams,
      type: 2,
      clickedVal: [re, im],
    });
  };

  // rioght now, the julia set is drawn with the current zoom in the mandlebrot, but easy fix to not do that

  const interDrawJulia = (re, im) => {
    quickWrite("Generating fractal...");
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      ...genPixlesParams,
      type: 1,
      fixedVal: [re, im],
    });
  };

  const interDrawMand = (startX, startY, endX, endY) => {
    // this function will do all that draw does in generator.js - then set the final
    // state to trigger the what we need for genPixles hook to run
    // it is called on mouse up
    // will always be on second iteration

    // // // // // // console.log("inter draw mand");

    // console.log("inter draw mand");

    // console.log(startX, startY, endX, endY);

    // add last p to the stack
    quickWrite("Generating fractal...");
    setParamsStack([...paramsStack, genPixlesParams]);

    startX = startX * (xRes / clinetDims.width);
    endX = endX * (xRes / clinetDims.width);
    startY = startY * (yRes / clinetDims.height);
    endY = endY * (yRes / clinetDims.height);

    let width = endX - startX;
    let height = endY - startY;

    // curretn width scales
    let widthScale = width / xRes;
    let heightScale = height / yRes;

    // // // // // // // console.log(prevMandCords);

    startX =
      prevMandCords.at(-1).widthScale * startX + prevMandCords.at(-1).startX;
    startY =
      prevMandCords.at(-1).heightScale * startY + prevMandCords.at(-1).startY;

    // calculate new scales
    widthScale = widthScale * prevMandCords.at(-1).widthScale;
    heightScale = heightScale * prevMandCords.at(-1).heightScale;

    let newCanWidth;
    let newCanHeight;

    // if height is more zoomed in
    if (heightScale > widthScale) {
      // want full height
      newCanHeight = yRes;
      // want width properlly scalled and correct based on height
      newCanWidth = yRes * (width / height);
      widthScale = (xRes / newCanWidth) * widthScale;
      // same for width
    } else {
      newCanWidth = xRes;
      newCanHeight = xRes * (height / width);
      heightScale = (yRes / newCanHeight) * heightScale;
    }

    /*
     double screen_re = (((widthScale * x) + startX) - width / 2.) / (width  /2.);
double screen_im = -(((heightScale * y) + startY) - height /2.) / (height /2.);

    real min = (startX - xRes/2) / xRes/2
    real max = (((widthScale*xRes) + startX) - xRes/2) / (xRes/2)


    */

    setAxises(
      (startX - xRes / 2) / (xRes / 2),
      (widthScale * xRes + startX - xRes / 2) / (xRes / 2),
      -(heightScale * yRes + startY - yRes / 2) / (yRes / 2),
      -(startY - yRes / 2) / (yRes / 2)
    );

    let type;
    if (genPixlesParams.type === 2) {
      type = 1;
    } else {
      type = genPixlesParams.type;
    }

    // now we have all we need for the useGenPixles hook to rerun, so set that state
    setGenPixlesParams({
      ...genPixlesParams,
      type: type,
      startX: startX,
      startY: startY,
      newCanWidth: newCanWidth,
      newCanHeight: newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: widthScale,
      heightScale: heightScale,
      arrayLength: xRes * yRes * 4,
    });

    setPrevMandCords([
      ...prevMandCords,
      {
        startX: startX,
        startY: startY,
        widthScale: widthScale,
        heightScale: heightScale,
      },
    ]);
  };

  const drawOrbit = (ctx) => {
    if (p === oldOrbit) {
      return;
    }
    console.log(p);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (p && !p.data && p.length > 0) {
      // console.log("HHHHH", p);
      let tmp = canvasToPoint(
        p[0][1],
        p[0][1],
        genPixlesParams.widthScale,
        genPixlesParams.heightScale,
        xRes,
        yRes,
        clinetDims.width,
        clinetDims.height,
        genPixlesParams.startX,
        genPixlesParams.startY
      );

      // // // // // console.log(tmp[0], tmp[1]);
      ctx.moveTo(tmp[0], tmp[1]);
      ctx.beginPath();
      // p.shift();
      p.forEach((cords) => {
        let tmp = canvasToPoint(
          cords[0],
          cords[1],
          genPixlesParams.widthScale,
          genPixlesParams.heightScale,
          xRes,
          yRes,
          clinetDims.width,
          clinetDims.height,
          genPixlesParams.startX,
          genPixlesParams.startY
        );
        // // // // console.log(tmp[0], tmp[1]);
        ctx.lineTo(tmp[0], tmp[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tmp[0], tmp[1]);
      });

      setOldOrbit(p);
    }
  };

  const drawMand = (ctx) => {
    // in here have mandCords stuff, will cause rerun (thus update the mandlebeort canvas)
    // hoping to call genPixlesHook in here to get the pxiels we need, but might not be how
    // you should do things in react

    // clear

    if (
      ctx.canvas.clientHeight !== clinetDims.height ||
      ctx.canvas.clientWidth !== clinetDims.width
    ) {
      setClientDims({
        width: ctx.canvas.clientWidth,
        height: ctx.canvas.clientHeight,
      });
    }

    //interDrawMand(realStartX, realStartY, realEndX, realEndY);

    // calling this everytime anyway so

    if (p) {
      if (genPixlesParams.type === 0 || genPixlesParams.type === 1) {
        // attempt to fix break after back in first orbit - worked!!!!
        if (p.data) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.putImageData(p, 0, 0);
        }

        console.log(paramsStack);

        if (paramsStack.length >= 1) {
          setBackOk(true);
        } else {
          setBackOk(false);
        }

        // p is array of two things to draw lines to for orbit
        // if is a workaround for too many rerenders
      } else if (!p.data) {
      }
    }
  };

  // RECTANGLE STUFF //
  /////////////////////////////////////////////

  const clearRect = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawRect = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let realStartX = finalCords.startX * (xRes / ctx.canvas.clientWidth);
    let realStartY = finalCords.startY * (yRes / ctx.canvas.clientHeight);
    let realEndX = finalCords.endX * (xRes / ctx.canvas.clientWidth);
    let realEndY = finalCords.endY * (yRes / ctx.canvas.clientHeight);
    let width = realEndX - realStartX;
    let height = realEndY - realStartY;
    ctx.strokeRect(realStartX, realStartY, width, height);
  };

  // this state needs to be seperate because changing this is what trigger
  // a redraw since it is in drawRect

  // RECTANGLE STATE
  const [finalCords, setFinalCords] = useState({
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  });

  const [rectStartCords, setStartRectCords] = useState({
    x: null,
    y: null,
  });

  const [isDown, setIsDown] = useState(false);

  const [drawing, setDrawing] = useState(false);

  const rectOpts = {
    strokeStyle: "red",
    lineWidth: xRes * (5 / 3840),
  };

  const orbitOpts = {
    strokeStyle: "blue",
    lineWidth: xRes * (5 / 3840),
  };

  function mouseDown(e) {
    e.preventDefault();
    setStartRectCords({
      x: parseInt(e.nativeEvent.offsetX), // * (xRes / rectCanvas.clientWidth), //+ parseInt(e.offsetX);
      y: parseInt(e.nativeEvent.offsetY), // * (yRes / rectCanvas.clientHeight), //+ parseInt(e.offsetY);
    });
    // the 3840/ 356 and 2160/ 200 is to convert from the pixel range to the css size range - 356 and 200 is size of the canvas in css pixels
    if (genPixlesParams.type == 0 || genPixlesParams.type == 1) setIsDown(true);
  }

  function mouseMoveCalcCords(e) {
    e.preventDefault();
    // // // // // // // console.log(clinetDims);
    // (widthScale * x) + startX)
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;
    //// // // // // console.log("cans, ", canX, canY);

    if (showCords) {
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      //// // // // // console.log("cords: ", re, im);
      setDisplayCords({ re: re, im: im });
    }
  }

  // IF I WANT YOU TO BE ABLE TO SEE CORDS WHEN MOVING BOX LEAVE THIS, OTHERWISE GET RID OF
  function mouseMove(e) {
    e.preventDefault();
    // want to trigger a redraw - should do it by changing the draw function,
    // as change is props trigger re render

    // let canX = e.nativeEvent.offsetX * (xRes / clinetDims.width);
    // let canY = e.nativeEvent.offsetY * (yRes / clinetDims.height);
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;

    if (showCords) {
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      // // // // // // console.log("cords: ", re, im);
      setDisplayCords({ re: re, im: im });
    }

    setDrawing(true);

    setFinalCords({
      startX: rectStartCords.x,
      startY: rectStartCords.y,
      endX: parseInt(e.nativeEvent.offsetX), // * (xRes / rectCanvas.clientWidth), //+ parseInt(e.offsetX);
      endY: parseInt(e.nativeEvent.offsetY),
    });
  }

  function mouseUp(e) {
    e.preventDefault();
    // TODO add ending stuff for drawing the mandlebrot
    setIsDown(false);
    setDrawing(false);
    // resetting these mandCords should trigger a rerender of usegenPixles

    let startX = finalCords.startX;
    let endX = finalCords.endX;
    let startY = finalCords.startY;
    let endY = finalCords.endY;

    if (startX > endX) {
      let tmpStart = startX;
      startX = endX;
      endX = tmpStart;
    }
    if (startY > endY) {
      let tmpStart = startY;
      startY = endY;
      endY = tmpStart;
    }

    // console.log("BLAHHHHH", startX, startY, endX, endY);

    // instead call a function to with these and set all variables used in genPixles hook at once,
    // make that function dshould be a hook but I don't think it needs to
    if (!(startY === endY || startX === endX)) {
      // need to have mand cords after all
      interDrawMand(
        Math.round(startX),
        Math.round(startY),
        Math.round(endX),
        Math.round(endY)
      );
    } else {
      // this is a click - can do julia/ orbit here
      // we have start cords in rectStartCords
      // don't even really need a button, in mand, click goes to julia, in julia, click shows orbit
      // no box zoom to julia, so no other values need to be changed, should be able to just update
      // the type and c vals of genPixlesParams and it will work, unless weird stuff gets changed

      let canX =
        genPixlesParams.widthScale *
          (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
        genPixlesParams.startX;
      let canY =
        genPixlesParams.heightScale *
          (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
        genPixlesParams.startY;

      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);

      if (genPixlesParams.type === 0) {
        interDrawJulia(re, im);
        // click in Julia
      } else if (genPixlesParams.type === 1 || genPixlesParams.type === 2) {
        console.log("calling inter draw orbit");
        interDrawOrbit(re, im);
        // now orbit
      }
    }

    // reset variables - works - bug fixed
    setFinalCords({
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    });
  }

  return (
    <>
      <div id="viewer">
        <div id="outer-cans" ref={wrapperRef}>
          {wrapperRef.current ? (
            <>
              <Canvas
                className="can"
                draw={drawMand}
                xRes={xRes}
                yRes={yRes}
                maxWidth={wrapperRef.current.clientWidth}
                maxHeight={wrapperRef.current.clientHeight}
                id="mandCan"
              />
              <Canvas
                className="can"
                options={orbitOpts}
                draw={drawOrbit}
                xRes={xRes}
                yRes={yRes}
                maxWidth={wrapperRef.current.clientWidth}
                maxHeight={wrapperRef.current.clientHeight}
                id="orbitCan"
              />
              <Canvas
                className="can"
                xRes={xRes}
                yRes={yRes}
                maxWidth={wrapperRef.current.clientWidth}
                maxHeight={wrapperRef.current.clientHeight}
                draw={drawing && isDown ? drawRect : clearRect}
                id="rectCan"
                options={rectOpts}
                mouseDown={(e) => mouseDown(e)}
                mouseMove={(e) =>
                  isDown
                    ? mouseMove(e)
                    : showCords
                    ? mouseMoveCalcCords(e)
                    : null
                }
                mouseUp={(e) => mouseUp(e)}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div id="lower-cont">
          <a href="#" id="down">
            Download
          </a>
          <CordsBox display={showCords} cords={displayCords} id="cords-box" />
        </div>
      </div>
    </>
  );
};

export default Viewer;
