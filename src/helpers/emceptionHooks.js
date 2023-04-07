import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { useEffect, useRef, useState } from "react";
import { useCompileStore } from "../store/zustandTest.js";
import { useTermStore } from "../store/zustandTest.js";
import { complexToCanvas } from "./util.js";

function doimport(str) {
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  // neeed this to tell webpack to take this as a normal import() and not do anything speical with it
  const module = import(/* webpackIgnore: true */ url);

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
  const quickWrite = useTermStore((state) => state.quickWrite);
  useEffect(() => {
    const initEmception = async () => {
      // maybe useMemo for htis
      const worker = new Worker(
        "./emception/emception.worker.bundle.worker.js"
      );
      emception = Comlink.wrap(worker);
      window.emception = emception;
      window.Comlink = Comlink;

      emception.onstdout = Comlink.proxy(quickWrite);
      emception.onstderr = Comlink.proxy(quickWrite);
      emception.onprocessstart = Comlink.proxy(quickWrite);
      // emception.onprocessstart = Comlink.proxy(addToConsole);

      write("Loading c++ to wasm compiler...", "white", true);

      await emception.init();
      setReady();
      write("Compiler loaded", "lightgreen", true);
    };

    initEmception();

    // TODO - maybe figure out how to deal with only reutirn this after this is done, think it does that anyway - using async in genPixles
    // acutally could prob just have this trigger state that allows the user to compile code - check if having this flow is bad
  }, []);
};

const useCompileCode = (code) => {
  const ready = useCompileStore((state) => state.ready);
  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);
  const setContent = useCompileStore((state) => state.setContent);

  useEffect(() => {
    const compileCode = async () => {
      // TODO clear console because about to re run (could have it be new or something like htat)
      // TODO - disallaw another compile - this will end up being on some sort of on click - prob some state might be in componet
      // TODO - button state
      try {
        quickWrite("Compiling c++ to wasm...<br>Dumping compiler output...");
        await emception.fileSystem.writeFile("/working/main.cpp", code);

        // emcc -o mandlebrotCPP.js  main.cpp -O3  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s "EXPORTED_FUNCTIONS=['_malloc', '_free', _genPixles]" -s MODULARIZE=1 -s "EXPORT_NAME='createModule'" -s ALLOW_MEMORY_GROWTH
        const cmd = `emcc -O3 -sSINGLE_FILE=1 -sNO_EXIT_RUNTIME=1 -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sEXPORTED_FUNCTIONS=['_malloc','_free','_genPixles','_orbit','setValue']  -sMODULARIZE=1 -sEXPORT_NAME='createModule' -s ENVIRONMENT='web' -sALLOW_MEMORY_GROWTH main.cpp -o main.mjs`;
        const result = await emception.run(cmd);
        if (result.returncode == 0) {
          write("Compiled", "lightgreen", true);

          // load the js file we compiled
          const content = await emception.fileSystem.readFile(
            "/working/main.mjs",
            { encoding: "utf8" }
          );

          setContent(content);
        } else {
          write("Compilation to wasm failed", "red", true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        // deal with state here? or just return - might be able to do this with the return state cleanup
      }
    };
    if (ready) {
      compileCode();
    }
  }, [code]);
};

const useGenPixles = (
  type,
  fixed_re, // for initial 0 then 1
  fixed_im, // for inital 0 then 1
  clicked_re, // for orbit
  clicked_im,
  maxIters,
  epsilon,
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
  colors,
  numColors,
  orbitNum
) => {
  // state and such here
  // this triggers a re render of "host" component (viewer) so won't need to even have this anywhere in viewer
  const content = useCompileStore((state) => state.content);
  const [pixels, setPixles] = useState(null);

  // these don't even need to be refs
  //const module = useRef(null);
  // const genPixles = useRef(null);

  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);
  useEffect(() => {
    const createMod = async () => {
      const loadModule = (await doimport(new Blob([content]))).default;

      loadModule().then((Module) => {
        /*
            int type, int color, double fixed_re, double fixed_im, int maxIters, double iterMult, double minRadius, double maxRadius, double startX, double startY, double newCanWidth, double newCanHeight, int width, int height, double widthScale, double heightScale, uint8_t *ptr
            */
        // let genPixles = Module.cwrap("genPixles", "null", [

        if (type === 0 || type === 1) {
          let genPixles = Module.cwrap("genPixles", "null", [
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
            "number",
            "number",
            "number",
          ]);
          myGenPixles(Module, genPixles);
        } else {
          // double fixed_re, double fixed_im, double clicked_re, clicked_im, int maxIters, double minRadius, double maxRadius, double_t *p
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
          myGenPixles(Module, orbit);
        }
      });
    };
    const myGenPixles = async (Module, fcn) => {
      if (type === 0 || type === 1) {
        let pixlesPtr = Module._malloc(
          arrayLength * Uint8Array.BYTES_PER_ELEMENT
        );
        // copy data to Emscripten heap (directly accessed from Module.HEAPU8)
        let dataheap = new Uint8Array(
          Module.HEAPU8.buffer,
          pixlesPtr,
          arrayLength * Uint8Array.BYTES_PER_ELEMENT
        );

        let reds = [];
        let greens = [];
        let blues = [];
        // console.log((colors);

        colors.forEach((color) => {
          reds.push(color[0]);
          greens.push(color[1]);
          blues.push(color[2]);
        });

        let redPtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);
        let bluePtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);
        let greenPtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);

        for (let i = 0; i < numColors; i++) {
          Module.setValue(redPtr + i, reds[i], "i8");
          Module.setValue(bluePtr + i, blues[i], "i8");
          Module.setValue(greenPtr + i, greens[i], "i8");
        }

        /////// CALL FCN ///////
        await fcn(
          type,
          fixed_re,
          fixed_im,
          maxIters,
          epsilon,
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
          dataheap.byteOffset,
          numColors,
          redPtr,
          greenPtr,
          bluePtr
        );
        write("Generated", "lightgreen", true);

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
        Module._free(Module.HEAPU8.buffer);
        Module._free(redPtr);
        Module._free(greenPtr);
        Module._free(bluePtr);

        // create the image
        let data = new ImageData(pixelArray, canWidth, canHeight);

        setPixles(data);
      } else {
        let orbitPtr = Module._malloc(
          maxIters * 2 * Float64Array.BYTES_PER_ELEMENT
        );

        let orbitHeap = new Float64Array(
          Module.HEAPF64.buffer,
          orbitPtr,
          maxIters * 2 * Float64Array.BYTES_PER_ELEMENT
        );
        // // double fixed_re, double fixed_im, double clicked_re, clicked_im, int maxIters, double minRadius, double maxRadius, double_t *p
        await fcn(
          fixed_re,
          fixed_im,
          clicked_re,
          clicked_im,
          maxIters,
          minRadius,
          maxRadius,
          orbitHeap.byteOffset
        );

        write("Generated", "lightgreen", true);

        let tmpOrbitArray = new Float64Array(
          orbitHeap.buffer,
          orbitHeap.byteOffset,
          maxIters * 2
        );
        Module._free(Module.HEAPF64.buffer);
        let orbitArr = tmpOrbitArray;
        // // console.log((orbitArr);

        let newOrbit = [[]];
        orbitArr.forEach((val, idx, arr) => {
          if (!(val === 0 && arr[idx + 1] === 0) && idx % 2 === 0) {
            newOrbit.push(
              complexToCanvas(val, arr[idx + 1], canWidth, canHeight)
            );
          }
        });
        // // console.log((newOrbit);

        // let newOrbit = orbitArr.reduce((acc, val, idx, arr) => {
        //   // // console.log((acc);
        //   if (val === 0 && arr[idx + 1] === 0) {
        //     return acc;
        //   }
        //   if (idx % 2 === 0) {
        //     acc.push(
        //       complexToCanvas(val, arr[idx + 1], newCanWidth, newCanHeight)
        //     );
        //     return acc;
        //   } else {
        //     return acc;
        //   }
        // }, []);
        // // // console.log((newOrbit);

        setPixles(newOrbit);
        console.log(newOrbit);
      }
    };

    // might need some stuff like only do if content has changed
    if (content) {
      console.log("writn1");
      quickWrite("Generating pixels with wasm...");
      createMod();
    }

    // could have it return pixels, maybe the pixles getting set is cauing rerenders of viewer
  }, [
    type,
    fixed_re,
    fixed_im,
    clicked_re,
    clicked_im,
    maxIters,
    epsilon,
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
    content,
    colors,
    numColors,
  ]);
  return pixels;
};

export { useInitEmception, useCompileCode, useGenPixles };
