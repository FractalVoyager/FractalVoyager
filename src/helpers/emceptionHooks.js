import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { useEffect, useState } from "react";
import {
  useCompileStore,
  useResetType,
  useWriteOrbitStore,
} from "../store/zustandTest.js";
import { useTermStore } from "../store/zustandTest.js";
import { complexToCanvas } from "./util.js";

/*
description: this is a collection of three hooks that interact with emception (the in browser c++ to wasm compiler) 
that uses emscripten all at runtime. They are to initialize it, compile code with it, and running that compiled code
*/

// fcn to "import" string as module using blobs
function doimport(str) {
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  // need this to tell webpack to take this as a normal import() and not do anything speical with it
  const module = import(/* webpackIgnore: true */ url);

  URL.revokeObjectURL(url); // GC objectURLs
  return module;
}

// variable for emception - TODO - should probably be a ref
var emception;

/*
this hook initializes emception - it works as a web worker
*/
const useInitEmception = () => {
  // global state to allow the compile button to be pressed
  const setReady = useCompileStore((state) => state.setReady);
  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);
  // runs the first time this is called only b/c empty array
  useEffect(() => {
    // fcn to initialize emception
    const initEmception = async () => {
      // make worker
      const worker = new Worker(
        "./emception/emception.worker.bundle.worker.js"
      );
      // comlink wrap to get logging - passing quickwrite fcn so emception logging goes to terminal on screen
      emception = Comlink.wrap(worker);
      window.emception = emception;
      window.Comlink = Comlink;

      emception.onstdout = Comlink.proxy(quickWrite);
      emception.onstderr = Comlink.proxy(quickWrite);
      emception.onprocessstart = Comlink.proxy(quickWrite);

      write("Loading c++ to wasm compiler...", "white", true);

      await emception.init();
      setReady();
      write("Compiler loaded", "lightgreen", true);
    };

    initEmception();
  }, []);
};

/*
this hook uses the initialized emception to compile code with it all in the browser
takes code which is the code to be compiled
*/
const useCompileCode = (code) => {
  // global state to know if it is okay to compile code
  const ready = useCompileStore((state) => state.ready);
  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);
  // content is the string that is the wasm compiled c++ code
  const setContent = useCompileStore((state) => state.setContent);

  // useEffect runs on change of code (code to be compiled)
  useEffect(() => {
    // fcn to compile code
    const compileCode = async () => {
      // TODO clear console because about to re run (could have it be new or something like htat)
      try {
        quickWrite("Compiling c++ to wasm...<br>Dumping compiler output...");
        // creates a file on the emception virtual file system that is the c++ code passed
        await emception.fileSystem.writeFile("/working/main.cpp", code);
        // emscripten commands that emception will use to compile with - just as if we were compiling using emscripten normally not during run time
        const cmd = `emcc -O3 -sSINGLE_FILE=1 -sNO_EXIT_RUNTIME=1 -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sEXPORTED_FUNCTIONS=['_malloc','_free','_genPixles','_orbit','setValue']  -sMODULARIZE=1 -sEXPORT_NAME='createModule' -s ENVIRONMENT='web' -sALLOW_MEMORY_GROWTH main.cpp -o main.mjs`;
        // tell emception to compile and get exit code?
        const result = await emception.run(cmd);
        // worked
        if (result.returncode == 0) {
          write(
            "Compiled, generating fractal with wasm...",
            "lightgreen",
            true
          );

          // load the js file we compiled
          const content = await emception.fileSystem.readFile(
            "/working/main.mjs",
            { encoding: "utf8" }
          );
          // set the content (string representing module) as the compiled wasm
          setContent(content);
        } else {
          write(
            "Compilation to wasm failed - check above output for more infomation",
            "red",
            true
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    // only attempt if ready
    if (ready) {
      compileCode();
    }
  }, [code]);
};

/*
useGenPixles hook - this takes all of the paramters needed to run the fractal program, and imports the string module as a real module,
and uses it to create fractals with all the paramters needed by running the wasm compiled code
parameters: * commented below *
*/
const useGenPixles = (
  type, // 0 - param, 1 - dyn, 2 - orbit
  fixed_re, // value to be used in clicked dyn space, and still that value for generating an orbit with dyn space - re part
  fixed_im, // ^^ im part
  clicked_re, // value to pass through dyn fractal fcn that was clicked for an orbit, uses the ^^ vals for the dyn fcn - re part
  clicked_im, // ^^ im part
  maxIters, // maximum iterations that the prgram and run for one point (cpx val)
  epsilon, // when to call two numbers the same modulus(z1) - modulus(z2) < epsilon = same
  minRadius, // when to call a number zero modulus(z) < minRadius = z is zero
  maxRadius, // when to say the fcn will escape/ a number infintately modulus(z) > maxRadius = z will escape - break out of loop
  // the point will be colored based on this value
  startX, // start val used in conversion between loop and cpx number in program
  startY, // ^^
  newCanWidth, // the width of canvas which will actaully have a fractal drawn on it
  newCanHeight, // ^^ for height
  canWidth, // total width of entire canvas
  canHeight, // ^^ for height
  widthScale, // used in conversion between loop and cpx number in program
  heightScale, // ^^ height
  arrayLength, // length of pixle array
  colors, // array of colors that will be used
  numColors, // number of those colors
  orbitNum // how many iterations to do orbit
) => {
  // pixle array - only local state
  const [pixels, setPixles] = useState(null);

  // * global state * //

  // this is the module string, on change, this hook will rerender b/c it is binded to it here
  // this triggers a re render of "host" component (viewer) so won't need to even have this anywhere in viewer
  const content = useCompileStore((state) => state.content);
  // initial type from script (if no c - 1, if c - 0)
  const initialType = useCompileStore((state) => state.initialType);
  // needed to make retying a script work
  const setType = useResetType((state) => state.setType);
  // if we should write output about orbit
  const writeOrbit = useWriteOrbitStore((state) => state.write);
  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);

  // * useEffects * //

  // this should make it so when you type a new script it resets the type
  useEffect(() => {
    type = initialType;
    setType(initialType);
  }, [content]);

  // runs on change of parameters
  useEffect(() => {
    // fcn to create module and fcns - shoudln't have to do this everytime but do for now - unmeasureable time add
    const createMod = async () => {
      // calls fcn to make string content to a "real" wasm/emscripten module
      const loadModule = (await doimport(new Blob([content]))).default;
      // call it
      loadModule().then((Module) => {
        // create genPixles fcn with params if it is a fractal type
        // this fcn takes and the params and a pointer and writes the array to that pointer on wasm memory
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
          // call the fcn to genPixles with the module created and this fcn created
          myGenPixles(Module, genPixles);
          // orbit type
        } else {
          // orbit fcn takes params and a pointer to wasm memory and writes orbit to it
          // in form [z1re, z1im, z2re, z2im, ...]
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
          // call fcn that calls this created fcn
          myGenPixles(Module, orbit);
        }
      });
    };
    // fcn to run the created fcns - takes the module and the fcn to be run
    const myGenPixles = async (Module, fcn) => {
      // if pixle gen type
      if (type === 0 || type === 1) {
        // create the pointer
        let pixlesPtr = Module._malloc(
          arrayLength * Uint8Array.BYTES_PER_ELEMENT
        );
        // copy data to Emscripten heap (directly accessed from Module.HEAPU8)
        let dataheap = new Uint8Array(
          Module.HEAPU8.buffer,
          pixlesPtr,
          arrayLength * Uint8Array.BYTES_PER_ELEMENT
        );
        // make arrays of reds greens and blues of the colors to be used
        let reds = [];
        let greens = [];
        let blues = [];
        colors.forEach((color) => {
          reds.push(color[0]);
          greens.push(color[1]);
          blues.push(color[2]);
        });
        // make pointers for those arrays
        let redPtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);
        let bluePtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);
        let greenPtr = Module._malloc(numColors * Uint8Array.BYTES_PER_ELEMENT);

        // this goes through the colors, and sets the values of them
        // as far as I know, this is the only way to write values on the wasm memory
        // with emscripten in js to be read by c++
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
        // write output
        if (type === 0) {
          write("Generated paramter space fractal", "lightgreen", true);
          setTimeout(
            () =>
              write(
                "Click on a point to generate a julia set with that point, or generate julia set with an inputted number and the button",
                "yellow",
                true
              ),
            1
          );
        } else {
          if (initialType == 1) {
            write(
              "Generated dynamic space fractal (julia set) with script",
              "lightgreen",
              true
            );
          } else {
            write(
              "Generated dynamic space fractal (julia set) with " +
                fixed_re +
                (fixed_im >= 0
                  ? "+" + fixed_im
                  : "-" + fixed_im.toString().slice(1)) +
                "i ",
              "lightgreen",
              true
            );
          }
          setTimeout(
            () =>
              write(
                "Click on a point or set a number to generate an orbit with that number using the selected  color and iterations. It will use the condition for the fractal",
                "yellow",
                true
              ),
            1
          );
        }

        // get the result of the function from the dataheap by way of creating a js array
        let pixelArray = new Uint8ClampedArray(
          dataheap.buffer,
          dataheap.byteOffset,
          arrayLength
        );

        // free the memory
        Module._free(Module.HEAPU8.buffer);
        Module._free(redPtr);
        Module._free(greenPtr);
        Module._free(bluePtr);

        // create the image
        let data = new ImageData(pixelArray, canWidth, canHeight);
        // set the image to the pixle state
        setPixles(data);
        // orbit
      } else {
        // create pointer
        let orbitPtr = Module._malloc(
          maxIters * 2 * Float64Array.BYTES_PER_ELEMENT
        );
        // put on wasm heap
        let orbitHeap = new Float64Array(
          Module.HEAPF64.buffer,
          orbitPtr,
          maxIters * 2 * Float64Array.BYTES_PER_ELEMENT
        );
        // call fcn
        // replace maxIters with orbitNum
        let realOrbitIts = parseInt(orbitNum) + 1;
        console.log(orbitNum);
        await fcn(
          fixed_re,
          fixed_im,
          clicked_re,
          clicked_im,
          realOrbitIts,
          minRadius,
          maxRadius,
          orbitHeap.byteOffset,
          epsilon
        );

        // write stuff to terminal
        if (writeOrbit) {
          write(
            "Generated orbit for " +
              clicked_re +
              (clicked_im >= 0
                ? "+" + clicked_im
                : "-" + clicked_im.toString().slice(1)) +
              "i. Click for another orbit, or click and drag for the fractal to go away and see only the orbits.",
            "lightgreen",
            true
          );
          setTimeout(
            () => quickWrite("outputting orbit (iterations : number)..."),
            1
          );
        }

        // get data off wasm memory and free the memory
        let tmpOrbitArray = new Float64Array(
          orbitHeap.buffer,
          orbitHeap.byteOffset,
          maxIters * 2
        );
        Module._free(Module.HEAPF64.buffer);
        let orbitArr = tmpOrbitArray;
        // get the orbit as canvas points instead of complex values, and print complex values as it goes if that is set
        let newOrbit = [[]];
        if (writeOrbit) {
          orbitArr.forEach((val, idx, arr) => {
            if (!(val === 0 && arr[idx + 1] === 0) && idx % 2 === 0) {
              setTimeout(
                () =>
                  quickWrite(
                    idx / 2 +
                      " : " +
                      val +
                      (arr[idx + 1] >= 0
                        ? "+" + arr[idx + 1]
                        : "-" + arr[idx + 1].toString().slice(1)) +
                      "i "
                  ),
                1
              );

              newOrbit.push(
                complexToCanvas(val, arr[idx + 1], canWidth, canHeight)
              );
            }
          });
        } else {
          orbitArr.forEach((val, idx, arr) => {
            if (!(val === 0 && arr[idx + 1] === 0) && idx % 2 === 0) {
              newOrbit.push(
                complexToCanvas(val, arr[idx + 1], canWidth, canHeight)
              );
            }
          });
        }
        // set the "pixles" as the new orbit
        setPixles(newOrbit);
      }
    };
    // if we have content, do all of above
    if (content) {
      createMod();
    }
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
  // return the "pxiles"
  return pixels;
};

export { useInitEmception, useCompileCode, useGenPixles };
