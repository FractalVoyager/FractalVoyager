import createModule from "../mandlebrotCPP.mjs";
import { useState, useEffect, useRef } from "react";

/*
    "string", // script
    "number", // type (param, dyn, orbit)
    "number", // fixed var re part (c for julia set)
    "number", // fixed var im part (c for julia set)
    "number", // crit point re part (z for mandlebrot set)
    "number", // crit point im part (z for mandlebrot set)
    "number", // start X - box zoom
    "number", // start Y - box zoom
    "number", // newCanWidth - box zoom
    "number", // newCanHeight - box zoom
    "number", // original width
    "number", // original height
    "number", // width scale
    "number", // height scale
    "number", // pixel pointer


*/

const useGenPixles = (
  type,
  cVal,
  zVal,
  startX,
  startY,
  newCanWidth,
  newCanHeight,
  canWidth,
  canHeight,
  widthScale,
  heightScale,
  arrayLength // eetually get this from global zustand store
) => {
  // const [genPixles, setGenPixles] = useState();
  //var [myModule, setMyModule] = useState();

  const [pixles, setPixles] = useState(null);
  //const [pixelArray, setPixelArray] = useState(null);

  // maybe try useCallback for this
  var genPixles = useRef(null);
  // for some reason this doesn't work in a useState, maybe try useRef? - always doesn't work as var, so need to chagne thius
  // to save tiume'

  var myModule = useRef(null);

  useEffect(() => {
    const myCreateModule = async () => {
      createModule().then((Module) => {
        genPixles.current = Module.cwrap("genPixles", "null", [
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
          "number",
        ]);

        //setMyModule(Module);
        myModule.current = Module;
        myGenPixles();
      });
    };

    const myGenPixles = async () => {
      // SEEING IF THIS WORKS WITH GETTING A POINTER TO THE DOUBLE ARRAY HERE
      // BUT WILL PROBALBY BE BEST JUST TO HAVE A DIFFERENT FUNCTION FOR GETTING
      // THE ORBITS

      // let orbitPtr = myModule.current._malloc(
      //   164 * Float64Array.BYTES_PER_ELEMENT
      // );

      // let orbitHeap = new Float64Array(
      //   myModule.current.HEAPF64.buffer,
      //   orbitPtr,
      //   164 * Float64Array.BYTES_PER_ELEMENT
      // );

      // using emscriptens malloc to allocate memory on the emscripten heap
      // of array this returns a pointer to it
      let pixlesPtr = myModule.current._malloc(
        arrayLength * Uint8Array.BYTES_PER_ELEMENT
      );

      // copy data to Emscripten heap (directly accessed from Module.HEAPU8)
      let dataheap = new Uint8Array(
        myModule.current.HEAPU8.buffer,
        pixlesPtr,
        arrayLength * Uint8Array.BYTES_PER_ELEMENT
      );

      // call function
      await genPixles.current(
        type,
        cVal[0],
        cVal[1],
        zVal[0],
        zVal[1],
        startX,
        startY,
        newCanWidth,
        newCanHeight,
        canWidth,
        canHeight,
        widthScale,
        heightScale,
        dataheap.byteOffset,
        5
      );

      // get the result of the function from the dataheap by way of creating a js array

      // this works on a fresh make, then fails.... weird
      if (type === 2) {
        // let tmpOrbitArray = new Float64Array(
        //   orbitHeap.buffer,
        //   orbitHeap.byteOffset,
        //   164
        // );
        // myModule.current._free(myModule.current.HEAPF64.buffer);
        // let orbitArr = tmpOrbitArray;
        // return orbitArr;
      } else {
        let tmpPixelArray = new Uint8ClampedArray(
          dataheap.buffer,
          dataheap.byteOffset,
          arrayLength
        );
        myModule.current._free(myModule.current.HEAPF64.buffer);
        myModule.current._free(myModule.current.HEAPU8.buffer);

        let data = new ImageData(tmpPixelArray, canWidth, canHeight);

        setPixles(data);
        return data;
      }
    };
    if (!myModule.current) {
      myCreateModule();
      // myGenPixles();
    } else {
      myGenPixles();
    }

    // maybe return a cleanup to reset variales
  }, [
    type,
    cVal,
    startX,
    startY,
    newCanWidth,
    newCanHeight,
    canWidth,
    canHeight,
    widthScale,
    heightScale,
    arrayLength,
  ]);
  return pixles;
};

export default useGenPixles;
