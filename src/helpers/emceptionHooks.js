import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { useEffect, useRef } from "react";
import { useCompileStore } from "../store/zustandTest.js";

// https://stackoverflow.com/questions/57121467
function doimport(str) {
  // if (globalThis.URL.createObjectURL) { - ""
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const module = import(url);
  URL.revokeObjectURL(url); // GC objectURLs
  return module;
  // } - ""

  // this breaks it because moduledata? so get rid of for now
  // const url = "data:text/javascript;base64," + btoa(moduleData);
  // return import(url);
}

// maybe??? should really be ref - could set it up like gen Pixel hooks with two functions in one hook
var emception;

// this is loading emception that we only want to do once when the app first loads,
// once emception is loaded we don't need to
const useInitEmception = () => {
  const setReady = useCompileStore((state) => state.setReady);

  useEffect(() => {
    const initEmception = async () => {
      console.log("useInitEmception");
      // maybe useMemo for htis
      const worker = new Worker(
        "./emception/emception.worker.bundle.worker.js"
      );
      emception = Comlink.wrap(worker);
      window.emception = emception;
      window.Comlink = Comlink;

      emception.onstdout = Comlink.proxy(console.log);
      emception.onstderr = Comlink.proxy(console.error);
      // emception.onprocessstart = Comlink.proxy(addToConsole);

      console.log("Loading emception...");
      await emception.init();
      setReady();
      console.log("emceitpion loaded");
    };

    initEmception();

    // console.log("emcpetion in init,", emception);
    // TODO - maybe figure out how to deal with only reutirn this after this is done, think it does that anyway - using async in genPixles
    // acutally could prob just have this trigger state that allows the user to compile code - check if having this flow is bad
  }, []);
};

const useCompileCode = () => {
  // state stuff and refs and vars and stuff here

  useEffect(() => {
    console.log("compiling code");
    const compileCode = async () => {
      // TODO clear console because about to re run (could have it be new or something like htat)
      // TODO - disallaw another compile - this will end up being on some sort of on click - prob some state might be in componet
      // TODO - button state
      try {
        // have to get the code from the other thing / state
        let code =
          "#include <canvas.h>\n#include <stdint.h>\n#include <stdio.h>\n#include <iostream>\n#include <complex.h>\n void genPixles(){\nfor (int x = 0; x < 3840; x++) {\nfor (int y = 0; y < 2190; y++) {\ndouble new_x = (((1 * x) + 0) - 3840 / 2.) / (2190 / 2.) - .55;\ndouble new_y = -(((1 * y) + 0) - 2190 / 2.) / (2190 / 2.);\n}\n}\nstd::cout << 'hello';\nstd::cout << std::complex<int>(3,4) << '\\n';\n }\n";
        console.log("emcpetion in compile,", emception);

        await emception.fileSystem.writeFile("/working/main.cpp", code);
        console.log("filesss");
        const cmd = `emcc -O3 -sSINGLE_FILE=1 -sNO_EXIT_RUNTIME=1 -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sEXPORTED_FUNCTIONS=['_malloc','_free','_genPixles'] -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sMODULARIZE=1 -sEXPORT_NAME='createModule' -sALLOW_MEMORY_GROWTH main.cpp -o main.js`;
        const result = await emception.run(cmd);
        if (result.returnCode == 0) {
          console.log("compile succesfull");
          // load the js file we compiled
          const content = await emception.fileSystem.readFile(
            "/working/main.js",
            { encoding: "utf8" }
          );
        } else {
          console.log("Emception compilation failed.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        // deal with state here? or just return - might be able to do this with the return state cleanup
      }
    };
    compileCode();
  }, []);
};

export { useInitEmception, useCompileCode };
