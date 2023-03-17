import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { useEffect, useRef, useState } from "react";
import { useCompileStore } from "../store/zustandTest.js";
import { useTermStore } from "../store/zustandTest.js";

function doimport(str) {
  console.log("glbal this");

  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  console.log(url);
  // neeed this to tell webpack to take this as a normal import() and not do anything speical with it
  const module = import(/* webpackIgnore: true */ url);

  console.log(module);
  URL.revokeObjectURL(url); // GC objectURLs

  return module;
}

// maybe??? should really be ref - could set it up like gen Pixel hooks with two functions in one hook - could also make htis
// global state variuables in zustand - but try this until it doesn't work anytmore (maybe on multiple hits)
var emception;

// this is loading emception that we only want to do once when the app first loads,
// once emception is loaded we don't need to
const useInitEmception = () => {
  const setReady = useCompileStore((state) => state.setReady);
  const write = useTermStore((state) => state.write);
  useEffect(() => {
    const initEmception = async () => {
      //console.log("useInitEmception");
      // maybe useMemo for htis
      const worker = new Worker(
        "./emception/emception.worker.bundle.worker.js"
      );
      emception = Comlink.wrap(worker);
      window.emception = emception;
      window.Comlink = Comlink;

      emception.onstdout = Comlink.proxy(write);
      emception.onstderr = Comlink.proxy(write);
      emception.onprocessstart = Comlink.proxy(write);
      // emception.onprocessstart = Comlink.proxy(addToConsole);

      write("Loading emception...");

      //console.log("Loading emception...");
      await emception.init();
      setReady();
      //console.log("emceitpion loaded");
      write("emceitpion loaded");
    };

    initEmception();

    // console.log("emcpetion in init,", emception);
    // TODO - maybe figure out how to deal with only reutirn this after this is done, think it does that anyway - using async in genPixles
    // acutally could prob just have this trigger state that allows the user to compile code - check if having this flow is bad
  }, []);
};
/*
            int type, int color, double fixed_re, double fixed_im, int maxIters, double iterMult, double minRadius, double maxRadius, double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr
            */
const useGenPixles2 = (
  type,
  color,
  fixed_re,
  fixed_im,
  maxIters,
  iterMult,
  minRadius,
  maxRadius,
  startX,
  startY,
  newCanWidth,
  newCanHeight,
  canWidth,
  canHeight,
  widthScale,
  heightScale,
  arrayLength ///// not needed for fcn!!!!
) => {
  // state and such here
  const genPixles = useCompileStore((state) => state.genPixles);
  // const Module = useCompileCode((state) => state.module);
  const malloc = useCompileStore((state) => state.malloc);
  const free = useCompileStore((state) => state.free);
  const u8buff = useCompileStore((state) => state.u8buff);
  const [pixels, setPixles] = useState(null);
  useEffect(() => {
    const myGenPixles = async () => {
      console.log("IN GEN PXILES", malloc, free, u8buff, genPixles);
      let pixlesPtr = malloc(arrayLength * Uint8Array.BYTES_PER_ELEMENT);

      // copy data to Emscripten heap (directly accessed from Module.HEAPU8)
      let dataheap = new Uint8Array(
        u8buff.buffer,
        pixlesPtr,
        arrayLength * Uint8Array.BYTES_PER_ELEMENT
      );

      console.log("GENENENENENENEE", genPixles);

      /////// CALL FCN ///////
      await genPixles(
        type,
        color,
        fixed_re,
        fixed_im,
        maxIters,
        iterMult,
        minRadius,
        maxRadius,
        startX,
        startY,
        newCanWidth,
        newCanHeight,
        canWidth,
        canHeight,
        widthScale,
        heightScale,
        dataheap.byteOffset
      );

      // get the result of the function from the dataheap by way of creating a js array
      let pixelArray = new Uint8ClampedArray(
        dataheap.buffer,
        dataheap.byteOffset,
        arrayLength
      );

      ///// can also do above as below --- same result //////

      // let pixelArray = new Uint8ClampedArray(
      //   Module.HEAPU8.buffer,
      //   pixlesPtr,
      //   arrayLength
      // );

      // free the memory
      // Module._free(Module.HEAPU8.buffer);
      free(u8buff.buffer);

      // create the image
      let data = new ImageData(pixelArray, canWidth, canHeight);

      console.log(data);

      setPixles(data);
    };
    if (genPixles && malloc && free && u8buff) {
      myGenPixles();
    } else {
      console.log(" NO GEN PIXLES s");
    }
  }, [
    type,
    color,
    fixed_re,
    fixed_im,
    maxIters,
    iterMult,
    minRadius,
    maxRadius,
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
  return pixels;
};

const useGenOrbit = () => {};

const useCompileCode = (
  compile,
  code,
  type,
  color,
  fixed_re,
  fixed_im,
  maxIters,
  iterMult,
  minRadius,
  maxRadius,
  startX,
  startY,
  newCanWidth,
  newCanHeight,
  canWidth,
  canHeight,
  widthScale,
  heightScale,
  arrayLength ///// not needed for fcn!!!!)
) => {
  const ready = useCompileStore((state) => state.ready);
  const setGenPixles = useCompileStore((state) => state.setGenPixles);
  const setOrbit = useCompileStore((state) => state.setOrbit);
  const setModule = useCompileStore((state) => state.setModule);
  const setU8buff = useCompileStore((state) => state.setU8buff);
  const setFree = useCompileStore((state) => state.setFree);
  const setMalloc = useCompileStore((state) => state.setMalloc);
  const write = useTermStore((state) => state.write);

  const myMod = useRef(null);
  const myGenPixles = useRef(null);
  const myOrbit = useRef(null);
  const [pixels, setPixles] = useState(null);
  ////// TESTTESTTEST ////
  // const myMod = useRef(null);

  // state stuff and refs and vars and stuff here

  useEffect(() => {
    const myGenPixlesFcn = async () => {
      //console.log("IN GEN PXILES", malloc, free, u8buff, genPixles);
      console.log("ININININININININININININ");
      console.log(myMod.current, myGenPixles.current, myOrbit.current);
      // let pixlesPtr = myMod.current._malloc(
      //   arrayLength * Uint8Array.BYTES_PER_ELEMENT
      // );

      // // copy data to Emscripten heap (directly accessed from Module.HEAPU8)
      // let dataheap = new Uint8Array(
      //   myMod.current.HEAPU8.buffer,
      //   pixlesPtr,
      //   arrayLength * Uint8Array.BYTES_PER_ELEMENT
      // );

      //console.log("GENENENENENENEE", genPixles);

      /////// CALL FCN ///////
      // await myGenPixles.current(
      //   type,
      //   color,
      //   fixed_re,
      //   fixed_im,
      //   maxIters,
      //   iterMult,
      //   minRadius,
      //   maxRadius,
      //   startX,
      //   startY,
      //   newCanWidth,
      //   newCanHeight,
      //   canWidth,
      //   canHeight,
      //   widthScale,
      //   heightScale
      //   //dataheap.byteOffset
      // );

      // get the result of the function from the dataheap by way of creating a js array
      // let pixelArray = new Uint8ClampedArray(
      //   dataheap.buffer,
      //   dataheap.byteOffset,
      //   arrayLength
      // );

      ///// can also do above as below --- same result //////

      // let pixelArray = new Uint8ClampedArray(
      //   Module.HEAPU8.buffer,
      //   pixlesPtr,
      //   arrayLength
      // );

      // free the memory
      ///myMod.current._free(myMod.current.HEAPU8.buffer);
      //free(u8buff.buffer);

      // create the image
      //let data = new ImageData(pixelArray, canWidth, canHeight);
      console.log("DATATATATATATATATATATA");
      //console.log(data);

      //setPixles(data);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const compileCode = async () => {
      // TODO clear console because about to re run (could have it be new or something like htat)
      // TODO - disallaw another compile - this will end up being on some sort of on click - prob some state might be in componet
      // TODO - button state
      try {
        // have to get the code from the other thing / state
        // console.log(code);

        //console.log("emcpetion in compile,", emception);
        //console.log(code);

        await emception.fileSystem.writeFile("/working/main.cpp", code);
        console.log("filesss");
        // -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0

        // emcc -o mandlebrotCPP.js  main.cpp -O3  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free', _genPixles]" -s MODULARIZE=1 -s "EXPORT_NAME='createModule'" -s ALLOW_MEMORY_GROWTH
        const cmd = `emcc -O3 -sSINGLE_FILE=1 -sNO_EXIT_RUNTIME=1 -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sEXPORTED_FUNCTIONS=['_malloc','_free','_genPixles','_orbit']  -sMODULARIZE=1 -sEXPORT_NAME='createModule' -s ENVIRONMENT='web' -sALLOW_MEMORY_GROWTH main.cpp -o main.mjs`;
        const result = await emception.run(cmd);
        if (result.returncode == 0) {
          // now we want to set the state where users can interact with stuff like changing the res or clicking for julia and stuff
          // without recompiling, that will jsut be running the code, set this code to run here
          // console.log("compile succesfull");
          write("compile succesfull");

          ////// test /////

          // load the js file we compiled
          const content = await emception.fileSystem.readFile(
            "/working/main.mjs",
            { encoding: "utf8" }
          );
          write("loading module...");

          const loadModule = (await doimport(new Blob([content]))).default;

          loadModule().then((Module) => {
            /*
            int type, int color, double fixed_re, double fixed_im, int maxIters, double iterMult, double minRadius, double maxRadius, double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr
            */
            // let genPixles = Module.cwrap("genPixles", "null", [
            myGenPixles.current = Module.cwrap("genPixles", "null", [
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
              "number",
              "number",
            ]);
            /*
            double fixed_re, double fixed_im, double clicked_re, double clicked_im, int maxIters, double minRadius, double maxRadius, double_t *
            */
            let orbit = Module.cwrap("orbit", "null", [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
            ]);

            //setGenPixles(genPixles);
            //setOrbit(orbit);
            //console.log("MOD", Module);
            //setMalloc(Module._malloc);
            //setFree(Module._free);
            //setU8buff(Module.HEAPU8);
            // console.log("CLONED MOD", structuredClone(Module));
            //setModule(structuredClone(Module));
            myMod.current = Module;
            //myGenPixles.current = genPixles;
            myOrbit.current = orbit;

            console.log("mod", Module);
            console.log("myMod", myMod.current);
            //console.log("p", genPixles);
            console.log("myp", myGenPixles.current);
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6");
            // myMod.current = Module;
            write("loaded");
          });
        } else {
          write("Emception compilation failed.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        // deal with state here? or just return - might be able to do this with the return state cleanup
      }
    };
    if (ready && compile) {
      compileCode();
    } else if (ready && !compile) {
      myGenPixlesFcn();
    }
  }, [
    code,
    type,
    color,
    fixed_re,
    fixed_im,
    maxIters,
    iterMult,
    minRadius,
    maxRadius,
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
  // return pixles
  return myMod.current;
};

const useRunCode = () => {};

export { useInitEmception, useCompileCode, useRunCode, useGenPixles2 };
