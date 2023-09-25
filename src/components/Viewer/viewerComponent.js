import Canvas from "./canvasComponent";
import "./viewer.css";
import { useEffect, useState, useRef } from "react";
import CordsBox from "../CordsBox/cordsBoxComponent";
import { canvasToComplex, canvasToPoint } from "../../helpers/util";
import { useBackState, useCompileStore } from "../../store/zustandTest.js";
import { useGenPixles } from "../../helpers/emceptionHooks";
import {
  useTmpParamsStore,
  useTermStore,
  useFracRefStore,
  useResetType,
  useWriteOrbitStore,
  useCanStyleStore,
} from "../../store/zustandTest.js";

/*
props: 
* these are controled by control component and the options on screen *
xRes, yRes: size of canvas (also resolution of fractal in pixles - sort of)
initYscale, initXscale: initial scales (changes on a different typed in values for axises)
initStartX, initStartY: initial starts ^^
back: the number of back clicks
numColors: number of colors
colors: array of colors to be used
maxRad, minRad, maxIters, epsilon: program options for c++ code determiined by values in control
showCords: if the cords box should be shown
foo: TODO forget why I added this but pretty sure I need it to force a rerender somewhere
orbitNum, orbitColor: the how many numbers to do the orbit, and what color to make the line
genVals: the values to be passed to julia set or orbit to generate with
returns: the canvases, the cords box, the download link
description: controls the state for generating and displaying fractals and orbit. Interacts with useGenPixles to 
to generate fractals and obrit
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
  orbitColor,
  genVals,
  showFrac,
}) => {
  // * useRefs * //

  // this is a ref to div that canvases fill used to calculate max sizes
  const wrapperRef = useRef(null);

  // * global state * //

  // set axises part of tmpParamStore (store for options that are currently being run in the viewer)
  const setAxises = useTmpParamsStore((state) => state.setAxises);
  // sets the type of tmpParams
  const setTypeStore = useTmpParamsStore((state) => state.setType);
  // set all of the tmpParams store
  const setAllTmpParamsStore = useTmpParamsStore((state) => state.setAll);
  // writing the number in the gen button area text - when orbit is clicked need to update those values
  const setGenVals = useTmpParamsStore((state) => state.setGenVals);
  // writes white text with newline to terminal
  const quickWrite = useTermStore((state) => state.quickWrite);
  // sets that the back button can be clicked
  const setBackOk = useBackState((state) => state.setAllowed);
  // the value of initial type (the type that the script produces)
  const initType = useCompileStore((state) => state.initialType);
  const canWidthStore = useCanStyleStore((state) => state.width);
  const [widthState, setWidthState] = useState(null);
  useEffect(() => {
    setWidthState(canWidthStore);
    console.log(canWidthStore);
  }, [canWidthStore]);
  // see if just having this here works - it does
  const canWidthReset = useCanStyleStore((state) => state.reCalc);
  // could use local state here but alreadly have this one so doing global to not have two vars
  const triggerCanWidthReCalc = useCanStyleStore(
    (state) => state.triggerReCalc
  );
  // silly fix to the viewer not reverting back to the initial type when the script changes
  // say you type a param space, switch to julia in viewer, then type another param space,
  // intial type didn't change, so nothing updates, so this is just a number that triggers
  // the type of genPixlesParams to update
  const { resetType, triggerReset } = useResetType((state) => ({
    resetType: state.type,
    triggerReset: state.update,
  }));
  // on drags, this will make it so you don't write the orbirts to the terminal
  const writeOrbit = useWriteOrbitStore((state) => state.setWrite);
  // the value of wetehr write orbit is
  const writeOrbitValue = useWriteOrbitStore((state) => state.write);

  // * local state * //

  // the number of back clicks in this component - fixes a bug I forgot - TODO this really should not be needed
  const [hereBack, setHereBack] = useState(back);
  // the re and im part of the current mouse position to be displayed in cordsBox
  const [displayCords, setDisplayCords] = useState({ re: null, im: null });
  // the client width and height of canvas, used to calucate offsets for mouse events
  const [clinetDims, setClientDims] = useState({
    width: null,
    height: null,
  });
  // starts and scales of the just drawn fractal - used in calculation after a rectangle is drawn
  // TODO probably can jsut use params stack or something but would have to work with it a little
  const [prevFracCords, setPrevFracCords] = useState([
    {
      startX: initStartX,
      startY: initStartY,
      widthScale: initXscale,
      heightScale: initYscale,
    },
  ]);
  // the orbit that was just drawn, used in drawOrbit to only actaully draw anything if the new p (result of useGenPIxles)
  // is different that the oldOrbit - prevents unnseaary redraws and fixes a buggy behavior when orbits get drawn over and over
  const [oldOrbit, setOldOrbit] = useState(null);
  // stack of params that gets popped off when back is clicked and updated to genPixlesParams
  const [paramsStack, setParamsStack] = useState([]);

  // the params that get passed to the genPixlesHook which generate the fractal
  const [genPixlesParams, setGenPixlesParams] = useState({
    type: initType, // paramter plane (0), dyn/julia (1), orbit (2)
    fixedVal: [null, null], // the fixed value for julia set drawn from click or gen off a param space
    clickedVal: [null, null], // clicked value for orbit
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
    orbitNum: orbitNum,
  });

  // state for rectangle being drawn to zoom as it is being drawn
  const [finalCords, setFinalCords] = useState({
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  });
  // start cords for the rectangle being drawn - TODO this is certainly unnesary and can be combined with final cords
  const [rectStartCords, setStartRectCords] = useState({
    x: null,
    y: null,
  });
  // this is true when the mouse first clicks down
  const [isDown, setIsDown] = useState(false);
  // this is true when the mouse is clicked down and also moved
  // pretty sure these two can't be combined because of the show cords and julia set and stuff
  const [drawing, setDrawing] = useState(false);

  // wether to clear the fractal or not (when dragging orbit - feature Dan wanted)
  const [clearFrac, setClearFrac] = useState(false);

  // * useEffects * //

  useEffect(() => {
    window.addEventListener("resize", () => {
      triggerCanWidthReCalc();
    });

    return () => {
      window.removeEventListener("resize", triggerCanWidthReCalc());
    };
  }, []);

  // when a new script is typed in, reset the type in genPixleParams to the inital type of that script
  useEffect(() => {
    setGenPixlesParams({ ...genPixlesParams, type: resetType });
  }, [triggerReset]);

  // back useEffect, triggers when back is clicked and changes the genParams
  useEffect(() => {
    // shouldn't need this but don't feel like changing it

    if (back !== hereBack) {
      // we don't want to reset the previous cords if it is a first drawn julia set with no zooms or a orbit
      if (
        genPixlesParams.type === 0 ||
        (paramsStack.at(paramsStack.length - 1).type === 1 &&
          genPixlesParams.type === 1)
      ) {
        setPrevFracCords((prevFracCords) => prevFracCords.slice(0, -1));
      }
      let params;
      if (!writeOrbitValue) {
        setClearFrac(false);
        writeOrbit(true);
        // now want this back to go to the julia set (only way to recover it being there is to get rid of all orbits)
        params = paramsStack.pop();
        while (params.type === 2) {
          params = paramsStack.pop();
        }
      }
      // old params
      else params = paramsStack.pop();

      // set them as current
      setGenPixlesParams(params);
      // set the store of options to those which would have been used for the old params
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
        params.numColors,
        params.clickedVal[0],
        params.clickedVal[1],
        params.type,
        params.orbitNum
      );
      setHereBack(back);
    }
  }, [back]);

  // on intial type, reset setGenPixles params to that
  // TODO proably don't need this and the resetType
  useEffect(() => {
    setGenPixlesParams({ ...genPixlesParams, type: initType });
  }, [initType]);

  // on change of props, update genPixlesParams
  useEffect(() => {
    ////// TRYING FIX HERE
    // TODO need to update prevfraccords
    setPrevFracCords([
      ...prevFracCords,
      {
        startX: initStartX,
        startY: initStartY,
        widthScale: initXscale,
        heightScale: initYscale,
      },
    ]);

    /////
    // if this isn't first draw, add to paramStack
    if (genPixlesParams.type !== null) {
      setParamsStack([...paramsStack, genPixlesParams]);
    }
    // reset the genPixlesParams
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
      orbitNum: orbitNum,
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
    orbitNum,
  ]);

  // on change of type in genPixlesParams (caused by click for julia or orbit)
  // update the type in tmpParamsStore to update control component
  useEffect(() => {
    setTypeStore(genPixlesParams.type);
  }, [genPixlesParams.type]);

  // on change of genVals, if it is not null, draw julia or orbit based on current type here
  useEffect(() => {
    // check if not null
    if (genVals) {
      if (genPixlesParams.type === 0) {
        interDrawJulia(genVals[0], genVals[1]);
      } else if (genPixlesParams.type === 1 || genPixlesParams.type === 2) {
        interDrawOrbit(genVals[0], genVals[1], true);
      }
    }
  }, [genVals]);

  // * intermiediate draws * //
  // fcns called before a new fractal or orbit is drawn to set params
  // and do math for the right params

  // when about to draw orbit: write to terminal, set ParamsStack, set genPixles
  // to right stuff, set type in tmpParamsStore, setGenVals in tmpParamsStore
  const interDrawOrbit = (re, im, write) => {
    if (write) {
      quickWrite("Generating orbit...");
    }

    // setClearOrbit(true);
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      ...genPixlesParams,
      type: 2,
      clickedVal: [re, im],
    });
    setTypeStore(2);
    setGenVals(re, im);
  };

  // when about to draw julia for the "first time" - aka not a box zoom
  const interDrawJulia = (re, im) => {
    quickWrite("Generating fractal...");
    setParamsStack([...paramsStack, genPixlesParams]);
    setGenPixlesParams({
      ...genPixlesParams,
      type: 1,
      fixedVal: [re, im],
    });
    setTypeStore(1);
    setGenVals(re, im);
  };

  // when about to draw fractal after a box zoom (for param and julia)
  const interDrawFrac = (startX, startY, endX, endY) => {
    // write to terminal and set params stack to prev
    quickWrite("Generating fractal...");
    setParamsStack([...paramsStack, genPixlesParams]);

    // math to calculate scales, starts, and newCanWidths/heights
    // takes the corodonates based on canvas points, and turns them into the way the
    // c++ program goes through the screen to get complex numbers
    startX = startX * (xRes / clinetDims.width);
    endX = endX * (xRes / clinetDims.width);
    startY = startY * (yRes / clinetDims.height);
    endY = endY * (yRes / clinetDims.height);

    let width = endX - startX;
    let height = endY - startY;

    let widthScale = width / xRes;
    let heightScale = height / yRes;
    startX =
      prevFracCords.at(-1).widthScale * startX + prevFracCords.at(-1).startX;
    startY =
      prevFracCords.at(-1).heightScale * startY + prevFracCords.at(-1).startY;

    widthScale = widthScale * prevFracCords.at(-1).widthScale;
    heightScale = heightScale * prevFracCords.at(-1).heightScale;

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

    // set tmpParamsStore axises to new ones
    setAxises(
      (startX - xRes / 2) / (xRes / 2),
      (widthScale * xRes + startX - xRes / 2) / (xRes / 2),
      -(heightScale * yRes + startY - yRes / 2) / (yRes / 2),
      -(startY - yRes / 2) / (yRes / 2)
    );

    // TODO not sure exactly why I need to reset type back to julia when I was in orbit since you can't
    // zoom in on orbit
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
    // set previous
    setPrevFracCords([
      ...prevFracCords,
      {
        startX: startX,
        startY: startY,
        widthScale: widthScale,
        heightScale: heightScale,
      },
    ]);
  };

  // * draw fcns * //
  // these functions are passed down to the canvas component and then to canvasHook and are
  // used to draw the fractal using the imageData that is held in p
  // have them here and pass them down since we need all the state of p and such here

  // for drawing an orbit
  const drawOrbit = (ctx) => {
    // set back if there is anythng in params stack
    if (paramsStack.length >= 1) {
      setBackOk(true);
    } else {
      setBackOk(false);
    }
    // if p is the same and the orbit currently on there, just ingnore it
    // otherwise, continue with redrawing
    if (p === oldOrbit) {
      return;
    }
    // clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // if p is there, it is not image data, and there is at least some length - it is an orbit, so we draw orbit stuff
    if (p && !p.data && p.length > 0) {
      // get canvas values from complex values so we know where to draw the line for the first value
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
      // move to first part of orbit
      ctx.moveTo(tmp[0], tmp[1]);
      // begin drwing
      ctx.beginPath();
      // TODO - should shift p but wasn't working - so now it moves to first position
      // then also draws a line there - no visual difference
      // for each cord - get the canvas point and draw a line to there, then move there
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
        ctx.lineTo(tmp[0], tmp[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tmp[0], tmp[1]);
      });
      // set the "old" orbit as this since it is now on the viewer
      setOldOrbit(p);
    }
  };

  // puts image data on fractal canvas
  const drawFrac = (ctx) => {
    // update clinet widths if different - just a convient place to put this - TODO need to do this in more places
    // mainly, on screen resize
    if (
      ctx.canvas.clientHeight !== clinetDims.height ||
      ctx.canvas.clientWidth !== clinetDims.width
    ) {
      setClientDims({
        width: ctx.canvas.clientWidth,
        height: ctx.canvas.clientHeight,
      });
    }
    // this gets called every rerender, so if there is a p and it is a param space or dyn space,
    // put it on canvas - in the hook that this gets called from, it is in a useEffect of the actuall data
    // so even though it looks like it keeps getting redrawn on every render, it is not
    if (p) {
      if (genPixlesParams.type === 0 || genPixlesParams.type === 1) {
        if (p.data) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.putImageData(p, 0, 0);
        }
        if (paramsStack.length >= 1) {
          setBackOk(true);
        } else {
          setBackOk(false);
        }
      }
    }
  };

  // clear canvas - used on box zoom to draw new box
  const clearRect = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  // draw box based on the rectangle state - used on drawing rectange canvas
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

  // * mouse event fcns * //
  // these get passed down to the canvases, but once again need state held here so are here

  // helper to calculate cpx values after a mouse move for showing them in cords box
  function mouseMoveCalcCords(e) {
    e.preventDefault();
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;
    const [re, im] = canvasToComplex(canX, canY, xRes, yRes);
    // TODO probably only need to do above in this conditon
    if (showCords) {
      setDisplayCords({ re: re, im: im });
    }
  }

  // this only gets passed down to rectangle canvas - sets the start rect cords
  function mouseDown(e) {
    e.preventDefault();
    setStartRectCords({
      x: parseInt(e.nativeEvent.offsetX),
      y: parseInt(e.nativeEvent.offsetY),
    });
    // only allow box zooms on fractals
    if (
      genPixlesParams.type == 0 ||
      genPixlesParams.type == 1 ||
      genPixlesParams.type == 2
    )
      setIsDown(true);
  }

  // only passed to rectangle canvas
  function mouseMove(e) {
    e.preventDefault();

    // math for conversion so can call canvas to complex to get the complex values for currently at spot
    let canX =
      genPixlesParams.widthScale *
        (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
      genPixlesParams.startX;
    let canY =
      genPixlesParams.heightScale *
        (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
      genPixlesParams.startY;

    const [re, im] = canvasToComplex(canX, canY, xRes, yRes);

    if (showCords) {
      setDisplayCords({ re: re, im: im });
    }

    // if click and drag in orbit, clear fractal and no longer write to console so it doesn't lag
    // this is a feature dan wanted
    if (genPixlesParams.type === 2) {
      // this makes the frac go away
      if (!showFrac) {
        setClearFrac(true);
      }
      //  setClearFrac(true);
      writeOrbit(false);
      interDrawOrbit(re, im, false);
    } else {
      setDrawing(true);
    }

    setFinalCords({
      startX: rectStartCords.x,
      startY: rectStartCords.y,
      endX: parseInt(e.nativeEvent.offsetX),
      endY: parseInt(e.nativeEvent.offsetY),
    });
  }

  // only passed to rectangle canvas
  function mouseUp(e) {
    e.preventDefault();
    if (!isDown) {
      return;
    }
    setIsDown(false);
    setDrawing(false);

    // calcualte genPixles params stuff for drawn box
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

    // if it is not just a click (and we weren't just dragging orbits), call interDrawFrac
    if (!(startY === endY || startX === endX) && genPixlesParams.type !== 2) {
      interDrawFrac(
        Math.round(startX),
        Math.round(startY),
        Math.round(endX),
        Math.round(endY)
      );
      // just a click
    } else {
      let canX =
        genPixlesParams.widthScale *
          (e.nativeEvent.offsetX * (xRes / clinetDims.width)) +
        genPixlesParams.startX;
      let canY =
        genPixlesParams.heightScale *
          (e.nativeEvent.offsetY * (yRes / clinetDims.height)) +
        genPixlesParams.startY;

      // cpx values of click
      const [re, im] = canvasToComplex(canX, canY, xRes, yRes);

      // draw julia if currently a param space
      if (genPixlesParams.type === 0) {
        interDrawJulia(re, im);
        // click in julia or orbit - draw orbit
      } else if (genPixlesParams.type === 1 || genPixlesParams.type === 2) {
        interDrawOrbit(re, im, true);
        // writeOrbit(true);
      }
    }
    // reset rectangle state
    setFinalCords({
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    });
  }

  // * lines not in functions * //

  // getting fractal image data or orbit array - calls on every render, but in hook the value only changes
  // when the params change
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

  // options for the drawn rectangle
  const rectOpts = {
    strokeStyle: "red",
    lineWidth: xRes * (5 / 3840),
  };

  // options for orbit
  let orbitOpts = {
    strokeStyle: orbitColor,
    lineWidth: xRes * (5 / 3840),
  };

  // silly fix to get the ref of the fractal canvas - TODO I think you can use a forward ref for this instead
  const fracRef = useFracRefStore((state) => state.fracRef);

  return (
    <>
      <div
        id="viewer"
        // setting width of container based on (possibly new) width of canvas
        style={{
          width: widthState ? widthState - 5 + "px" : "",
        }}
      >
        <div id="outer-cans" ref={wrapperRef}>
          {wrapperRef.current ? (
            <>
              {/* three differnet canvases - fractal, box zoom, orbit */}
              <Canvas
                className="can"
                draw={clearFrac ? clearRect : drawFrac}
                xRes={xRes}
                yRes={yRes}
                maxWidth={wrapperRef.current.clientWidth}
                maxHeight={wrapperRef.current.clientHeight}
                id="fracCan"
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
          {/* download fractal canvas on click of download link */}
          <a
            href="#"
            id="down"
            onClick={(e) => {
              e.preventDefault();
              var link = document.createElement("a");
              link.download = "fractal.png";
              link.href = fracRef.current.toDataURL();
              link.click();
            }}
          >
            Download
          </a>
          {/* cords box component */}
          <CordsBox display={showCords} cords={displayCords} id="cords-box" />
        </div>
      </div>
    </>
  );
};

export default Viewer;
