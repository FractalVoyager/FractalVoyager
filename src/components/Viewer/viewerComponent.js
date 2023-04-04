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
import { useColorsStore } from "../../store/zustandTest.js";

const Viewer = ({
  xRes,
  yRes,
  initXscale,
  initYscale,
  initStartX,
  initStartY,
  back,
  showCords,
}) => {
  const numColors = useColorsStore((state) => state.amt);
  const colors = useColorsStore((state) => state.colors);
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

  const wrapperRef = useRef(null);

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
        // // console.log("in if", prevMandCords);
        setPrevMandCords((prevMandCords) => prevMandCords.slice(0, -1));
      }

      setGenPixlesParams(paramsStack.pop());
      setHereBack(back);
    }
  }, [back]);

  const [paramsStack, setParamsStack] = useState([]);

  const [clinetDims, setClientDims] = useState({
    width: null,
    height: null,
  });

  // first gen Pixles

  useEffect(() => {
    setGenPixlesParams({
      ...genPixlesParams,
      colors: colors,
      numColors: numColors,
    });
  }, [colors, numColors]);

  const [genPixlesParams, setGenPixlesParams] = useState({
    type: initType, // paramter plane, dyn, orbit    ------ TODO - this is based on inital type
    color: 0,
    fixedVal: [null, null], // c will get set to pixel - for type 2 after type 1
    clickedVal: [null, null], // for orbit
    maxIters: 64,
    iterMult: 4,
    minRadius: 0.01,
    maxRadius: 4,
    startX: initStartX, // box zoom stuff
    startY: initStartY, // box zoom stuff
    newCanWidth: xRes, // box zoom stuff
    newCanHeight: yRes, // box zoom stuff
    canWidth: xRes, // box zoom stuff
    canHeight: yRes, // box zoom stuff
    widthScale: initXscale, // box zoom stuff
    heightScale: initYscale, // box zoom stuff
    arrayLength: xRes * yRes * 4, // length of aray to return
    colors: colors,
    numColors: numColors,
  });
  // // console.log(initType);
  // to reset genPIxlesParams with initType
  useEffect(() => {
    setGenPixlesParams({
      type: initType,
      color: genPixlesParams.color,
      fixedVal: genPixlesParams.fixedVal, // this should hold the old fixed value
      clickedVal: genPixlesParams.clickedVal,
      maxIters: genPixlesParams.maxIters,
      iterMult: genPixlesParams.iterMult,
      minRadius: genPixlesParams.minRadius,
      maxRadius: genPixlesParams.maxRadius,
      startX: genPixlesParams.startX,
      startY: genPixlesParams.startY,
      newCanWidth: genPixlesParams.newCanWidth,
      newCanHeight: genPixlesParams.newCanHeight,
      canWidth: genPixlesParams.canWidth,
      canHeight: genPixlesParams.canHeight,
      widthScale: genPixlesParams.widthScale,
      heightScale: genPixlesParams.heightScale,
      arrayLength: genPixlesParams.arrayLength,
      colors: genPixlesParams.colors,
      numColors: genPixlesParams.numColors,
    });
  }, [initType]);
  // // console.log(genPixlesParams.type);

  let p = useGenPixles(
    genPixlesParams.type,
    genPixlesParams.color,
    genPixlesParams.fixedVal[0],
    genPixlesParams.fixedVal[1],
    genPixlesParams.clickedVal[0],
    genPixlesParams.clickedVal[1],
    genPixlesParams.maxIters,
    genPixlesParams.iterMult,
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
    genPixlesParams.numColors
  );

  const interDrawOrbit = (re, im) => {
    setParamsStack([...paramsStack, genPixlesParams]);
    // TODO = change this to only change the stuff to be changed
    setGenPixlesParams({
      type: 2,
      color: genPixlesParams.color,
      fixedVal: genPixlesParams.fixedVal, // this should hold the old fixed value
      clickedVal: [re, im],
      maxIters: genPixlesParams.maxIters,
      iterMult: genPixlesParams.iterMult,
      minRadius: genPixlesParams.iterMult,
      maxRadius: genPixlesParams.maxRadius,
      startX: genPixlesParams.startX,
      startY: genPixlesParams.startY,
      newCanWidth: genPixlesParams.newCanWidth,
      newCanHeight: genPixlesParams.newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: genPixlesParams.widthScale,
      heightScale: genPixlesParams.heightScale,
      arrayLength: xRes * yRes * 4,
      colors: genPixlesParams.colors,
      numColors: genPixlesParams.numColors,
    });
  };

  // rioght now, the julia set is drawn with the current zoom in the mandlebrot, but easy fix to not do that

  const interDrawJulia = (re, im) => {
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      type: 1,
      color: genPixlesParams.color,
      fixedVal: [re, im],
      clickedVal: genPixlesParams.clickedVal,
      maxIters: genPixlesParams.maxIters,
      iterMult: genPixlesParams.iterMult,
      minRadius: genPixlesParams.iterMult,
      maxRadius: genPixlesParams.maxRadius,
      startX: genPixlesParams.startX,
      startY: genPixlesParams.startY,
      newCanWidth: genPixlesParams.newCanWidth,
      newCanHeight: genPixlesParams.newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: genPixlesParams.widthScale,
      heightScale: genPixlesParams.heightScale,
      arrayLength: xRes * yRes * 4,
      colors: genPixlesParams.colors,
      numColors: genPixlesParams.numColors,
    });
  };

  const interDrawMand = (startX, startY, endX, endY) => {
    // this function will do all that draw does in generator.js - then set the final
    // state to trigger the what we need for genPixles hook to run
    // it is called on mouse up
    // will always be on second iteration

    // // console.log("inter draw mand");

    // add last p to the stack
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

    // // // console.log(prevMandCords);

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

    let type;
    if (genPixlesParams.type === 2) {
      type = 1;
    } else {
      type = genPixlesParams.type;
    }

    // now we have all we need for the useGenPixles hook to rerun, so set that state
    setGenPixlesParams({
      type: type,
      color: genPixlesParams.color,
      fixedVal: genPixlesParams.fixedVal,
      clickedVal: genPixlesParams.clickedVal,
      maxIters: genPixlesParams.maxIters,
      iterMult: genPixlesParams.iterMult,
      minRadius: genPixlesParams.iterMult,
      maxRadius: genPixlesParams.maxRadius,
      startX: startX,
      startY: startY,
      newCanWidth: newCanWidth,
      newCanHeight: newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: widthScale,
      heightScale: heightScale,
      arrayLength: xRes * yRes * 4,
      colors: genPixlesParams.colors,
      numColors: genPixlesParams.numColors,
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
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.putImageData(p, 0, 0);

        console.log(paramsStack);

        if (paramsStack.length >= 1) {
          setBackOk(true);
        } else {
          setBackOk(false);
        }

        // p is array of two things to draw lines to for orbit
        // if is a workaround for too many rerenders
      } else if (!p.data) {
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
        // console.log(
        //   p[0][1],
        //   p[0][1],
        //   genPixlesParams.widthScale,
        //   genPixlesParams.heightScale,
        //   xRes,
        //   yRes,
        //   clinetDims.width,
        //   clinetDims.height,
        //   genPixlesParams.startX,
        //   genPixlesParams.startY
        // );
        // console.log(tmp[0], tmp[1]);
        ctx.moveTo(tmp[0], tmp[1]);
        ctx.beginPath();
        p.shift();
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
          console.log(tmp[0], tmp[1]);
          ctx.lineTo(tmp[0], tmp[1]);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(tmp[0], tmp[1]);
        });
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
    setIsDown(true);
  }

  function mouseMoveCalcCords(e) {
    e.preventDefault();
    // // // console.log(clinetDims);
    // (widthScale * x) + startX)
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;
    //// console.log("cans, ", canX, canY);

    if (showCords) {
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      //// console.log("cords: ", re, im);
      setDisplayCords({ re: re, im: im });
    }
  }

  // IF I WANT YOU TO BE ABLE TO SEE CORDS WHEN MOVING BOX LEAVE THIS, OTHERWISE GET RID OF
  function mouseMove(e) {
    e.preventDefault();
    // want to trigger a redraw - should do it by changing the draw function,
    // as change is props trigger re render

    let canX = e.nativeEvent.offsetX * (xRes / clinetDims.width);
    let canY = e.nativeEvent.offsetY * (yRes / clinetDims.height);

    if (showCords) {
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      // // console.log("cords: ", re, im);
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

    // so this isn't working

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
      // console.log(e.nativeEvent.offsetX);
      // console.log(e.nativeEvent.offsetY);
      // console.log("before anything", re, im, canX, canY);
      // console.log(complexToCanvas(re, im, xRes, yRes));
      // console.log("TESTING", re, im, canX, canY);
      // console.log(complexToCanvas(re, im, xRes, yRes));
      // to prevent "dobule drawn" julia sets, if this is false, then we should do the orbit
      if (genPixlesParams.type === 0) {
        interDrawJulia(re, im);
        // click in Julia
      } else if (genPixlesParams.type === 1 || genPixlesParams.type === 2) {
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
                options={orbitOpts}
                draw={drawMand}
                xRes={xRes}
                yRes={yRes}
                maxWidth={wrapperRef.current.clientWidth}
                maxHeight={wrapperRef.current.clientHeight}
                id="mandCan"
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
        <CordsBox display={showCords} cords={displayCords} id="cords-box" />
      </div>
    </>
  );
};

export default Viewer;
