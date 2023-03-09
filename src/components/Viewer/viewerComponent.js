// want to have the click handler here and pass it down to the canvas
// compoenent

// state of where the mouse is will be stored here, along with the state
// of the current size and all that shit for the fractal

import Canvas from "./canvasComponent";
import "./viewer.css";
import { useEffect, useState } from "react";
import useGenPixels from "../../helpers/genPixlesHook";
import CordsBox from "../CordsBox/cordsBoxComponent";
import { canvasToComplex } from "../../helpers/util";

const Viewer = ({ xRes, yRes, back, dims, showCords }) => {
  const [displayCords, setDisplayCords] = useState({ re: null, im: null });
  const [prevMandCords, setPrevMandCords] = useState([
    {
      startX: 0,
      startY: 0,
      widthScale: 1,
      heightScale: 1,
    },
  ]);

  // should always start with 0
  const [hereBack, setHereBack] = useState(back);

  useEffect(() => {
    // console.log("here");
    if (back !== hereBack) {
      // we don't want to reset the previous stuff if it is a first drawn julia set with no zooms or a orbit
      if (
        genPixlesParams.type === 0 ||
        (paramsStack.at(paramsStack.length - 1).type === 1 &&
          genPixlesParams.type === 1)
      ) {
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
  const [genPixlesParams, setGenPixlesParams] = useState({
    type: 0, // paramter plane
    cVal: [0, 0], // c will get set to pixel
    zVal: [0, 0], // 0,0 is ciritcal point
    startX: 0, // box zoom stuff
    startY: 0, // box zoom stuff
    newCanWidth: xRes, // box zoom stuff
    newCanHeight: yRes, // box zoom stuff
    canWidth: xRes, // box zoom stuff
    canHeight: yRes, // box zoom stuff
    widthScale: 1, // box zoom stuff
    heightScale: 1, // box zoom stuff
    arrayLength: xRes * yRes * 4, // length of aray to return
  });

  let p = useGenPixels(
    genPixlesParams.type,
    genPixlesParams.cVal,
    genPixlesParams.zVal,
    genPixlesParams.startX,
    genPixlesParams.startY,
    genPixlesParams.newCanWidth,
    genPixlesParams.newCanHeight,
    genPixlesParams.canWidth,
    genPixlesParams.canHeight,
    genPixlesParams.widthScale,
    genPixlesParams.heightScale,
    genPixlesParams.arrayLength
  );

  const interDrawOrbit = (re, im) => {
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      type: 2,
      cVal: genPixlesParams.cVal,
      zVal: [re, im],
      startX: genPixlesParams.startX,
      startY: genPixlesParams.startY,
      newCanWidth: genPixlesParams.newCanWidth,
      newCanHeight: genPixlesParams.newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: genPixlesParams.widthScale,
      heightScale: genPixlesParams.heightScale,
      arrayLength: xRes * yRes * 4,
    });
  };

  // extract the reclacuating logic out of the draw mand to a function to make it do all that stuff so it can be
  // used in drawJulia too
  // actually its just working fine now because on zoom, interDrawMand is being called,
  // that saves what we had for julia set stuff\

  // rioght now, the julia set is drawn with the current zoom in the mandlebrot, but easy fix to not do that

  const interDrawJulia = (re, im) => {
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      type: 1,
      cVal: [re, im],
      zVal: genPixlesParams.zVal,
      startX: genPixlesParams.startX,
      startY: genPixlesParams.startY,
      newCanWidth: genPixlesParams.newCanWidth,
      newCanHeight: genPixlesParams.newCanHeight,
      canWidth: xRes,
      canHeight: yRes,
      widthScale: genPixlesParams.widthScale,
      heightScale: genPixlesParams.heightScale,
      arrayLength: xRes * yRes * 4,
    });
  };

  const interDrawMand = (startX, startY, endX, endY) => {
    // this function will do all that draw does in generator.js - then set the final
    // state to trigger the what we need for genPixles hook to run
    // it is called on mouse up
    // will always be on second iteration

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

    // console.log(prevMandCords);

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

    // now we have all we need for the useGenPixles hook to rerun, so set that state
    setGenPixlesParams({
      type: genPixlesParams.type,
      cVal: genPixlesParams.cVal,
      zVal: genPixlesParams.zVal,
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
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.putImageData(p, 0, 0);
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
    // console.log(clinetDims);
    // (widthScale * x) + startX)
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;
    //console.log("cans, ", canX, canY);

    if (showCords) {
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      //console.log("cords: ", re, im);
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
      // console.log("cords: ", re, im);
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
      console.log("draw julia set");

      let canX =
        genPixlesParams.widthScale *
          (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
        genPixlesParams.startX;
      let canY =
        genPixlesParams.heightScale *
          (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
        genPixlesParams.startY;

      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
      // to prevent "dobule drawn" julia sets, if this is false, then we should do the orbit
      if (genPixlesParams.type === 0) {
        interDrawJulia(re, im);
        // click in Julia
      } else if (genPixlesParams.type === 1) {
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
      <Canvas
        className="can"
        draw={drawMand}
        xRes={xRes}
        yRes={yRes}
        id="mandCan"
      />
      <Canvas
        className="can"
        xRes={xRes}
        yRes={yRes}
        draw={drawing && isDown ? drawRect : clearRect}
        id="rectCan"
        options={rectOpts}
        mouseDown={(e) => mouseDown(e)}
        mouseMove={(e) =>
          isDown ? mouseMove(e) : showCords ? mouseMoveCalcCords(e) : null
        }
        mouseUp={(e) => mouseUp(e)}
      />
      <CordsBox display={showCords} cords={displayCords} />
    </>
  );
};

export default Viewer;
