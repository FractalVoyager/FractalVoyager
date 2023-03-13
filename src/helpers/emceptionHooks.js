import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { useEffect, useRef } from "react";
import { useCompileStore } from "../store/zustandTest.js";
import load from "little-loader";
import { Buffer } from "buffer";
//import * as SystemJS from "systemjs";
import SystemJS from "systemjs/dist/system.min.js";

window.Buffer = window.Buffer || require("buffer").Buffer; // https://stackoverflow.com/questions/57121467

// async function fetchAndExecuteModule(moduleUrl) {
//   const response = await fetch(moduleUrl);
//   const code = await response.text();
//   const script = document.createElement("script");
//   script.type = "module";
//   script.text = code;

//   console.log(script);
//   document.head.appendChild(script);
//   return new Promise((resolve) => {
//     script.addEventListener("load", () => {
//       const mod = script.module;
//       resolve(mod.default || mod);
//     });
//   });
// }

// async function fetchAndExecuteModule(moduleUrl) {
//   const response = await fetch(moduleUrl);
//   const code = await response.text();
//   const script = document.createElement("script");
//   script.type = "module";
//   script.text = code;

//   document.head.appendChild(script);
//   return new Promise((resolve) => {
//     script.addEventListener("load", resolve);
//   });
// }

// async function runModule(url) {
//   const myFunction = await fetchAndExecuteModule(url);
//   const compiledMod = myFunction();
//   console.log(compiledMod);
// }

// async function fetchAndExecuteModule(moduleUrl) {
//   const response = await fetch(moduleUrl);
//   const code = await response.text();
//   const script = document.createElement("script");
//   script.type = "module";
//   script.text = code;

//   return new Promise((resolve, reject) => {
//     script.onload = () => {
//       const createModule = window.createModule;
//       if (!createModule) {
//         reject(new Error("Module does not export myFunction"));
//       } else {
//         resolve(createModule);
//       }
//     };

//     script.onerror = reject;

//     document.head.appendChild(script);
//   });
// }

async function doimport(str) {
  // if (globalThis.URL.createObjectURL) {
  console.log("glbal this");

  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  console.log(url);
  const module = import(url);
  console.log(module);
  //URL.revokeObjectURL(url); // GC objectURLs

  // const blob = new Blob([str], { type: "text/javascript" });
  // console.log(blob);
  // const url = window.URL.createObjectURL(blob);
  // console.log(url);
  // // const module = load(url);
  // // const module = window._lload(url);
  // // const module = import(`${url}`);
  // // const module = await import(url);
  // const module = require(url);
  // // const { module } = require(url);
  // console.log(module);
  // window.URL.revokeObjectURL(url); // GC objectURLs
  return module;
  // }
  console.log("not global this!!!!!!!!!!!!!!");

  // const url = "data:text/javascript;base64," + btoa(moduleData);
  // return import(url);
}

// maybe??? should really be ref - could set it up like gen Pixel hooks with two functions in one hook - could also make htis
// global state variuables in zustand - but try this until it doesn't work anytmore (maybe on multiple hits)
var emception;
var genPixles;

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

      // these are call backs, can do stuff like make this a function then use zustand for some cool console state
      emception.onstdout = Comlink.proxy(console.log);
      emception.onstderr = Comlink.proxy(console.error);
      emception.onprocessstart = Comlink.proxy(console.log);
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

const useCompileCode = (code) => {
  const ready = useCompileStore((state) => state.ready);
  // state stuff and refs and vars and stuff here

  useEffect(() => {
    const compileCode = async () => {
      // TODO clear console because about to re run (could have it be new or something like htat)
      // TODO - disallaw another compile - this will end up being on some sort of on click - prob some state might be in componet
      // TODO - button state
      try {
        // have to get the code from the other thing / state
        let code =
          '#include <emscripten.h>\n          #include <iostream>\n          extern "C" { \nEMSCRIPTEN_KEEPALIVE int foo(void) {\nstd::cout << "hello world!" << std::endl;\nreturn 0;\n}\n}\n';

        console.log("emcpetion in compile,", emception);
        console.log(code);

        await emception.fileSystem.writeFile("/working/main.cpp", code);
        console.log("filesss");
        // -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0
        const cmd = `emcc -O3 -sSINGLE_FILE=1 -sNO_EXIT_RUNTIME=1 -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sEXPORTED_FUNCTIONS=['_malloc','_free','_foo']  -sMODULARIZE=1 -sEXPORT_NAME='createModule' -s ENVIRONMENT='web' -sALLOW_MEMORY_GROWTH main.cpp -o main.mjs`;
        const result = await emception.run(cmd);
        if (result.returncode == 0) {
          // now we want to set the state where users can interact with stuff like changing the res or clicking for julia and stuff
          // without recompiling, that will jsut be running the code, set this code to run here
          console.log("compile succesfull");

          ////// test /////

          // load the js file we compiled
          const content = await emception.fileSystem.readFile(
            "/working/main.mjs",
            { encoding: "utf8" }
          );
          console.log(content);
          //console.log(window.Buffer.from(content).toString("Base64"));
          const blob = new Blob([content], { type: "text/javascript" });
          console.log(blob);
          const url = URL.createObjectURL(blob);
          console.log(url);

          // const loader = new systemjs();

          // const loadModule = fetch(url)
          //   .then((resp) => resp.text())
          //   .then((data) => {
          //     console.log(data);
          //     const mod = import(data).default;
          //     console.log(mod);
          //     return mod;
          //   });
          // const resp = await fetch(url);
          // const moduleText = await resp.text();
          // const loadModule = await new Function(`return ${moduleText}`)();
          // const myFunction = await fetchAndExecuteModule(url);
          // console.log(myFunction());
          const wasmModule = await import(url).default;

          // await SystemJS.import(
          //   `data:text/javascript;charset=utf-8,${encodeURIComponent(content)}`
          // ).default;
          // console.log(loader);

          //const loadModule = await import(url).default;
          // const loadModule = await import(
          //   `data:text/javascript;charset=utf-8,${encodeURIComponent(content)}`
          // ).default;

          // const loadMoudle = await import("data:text/javascript;base64," + btoa(moduleData))

          // Load the module using the URL of the temporary file
          //const loadModule = await eval(url);
          //const loadModule = await doimport(content);
          // const loadModule = await import(
          //   `data:text/javascript;charset=utf-8,${encodeURIComponent(content)}`
          // );

          // const loadModule = await import(
          //   `data:text/javascript;base64,${window.Buffer.from(content).toString(
          //     "Base64"
          //   )}`
          // );
          //console.log(content);
          //const loadModule = (await doimport(new Blob([content]))).default;
          //console.log(":here");
          //console.log(loadModule);
          // const loadModule = requireFromString(content);
          // const compiledModule = await loader();
          // console.log(compiledModule);

          // const compiledModule = await loadModule();
          //console.log(compiledMod);
        } else {
          console.log("Emception compilation failed.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        // deal with state here? or just return - might be able to do this with the return state cleanup
      }
    };
    console.log("in compile use effect");
    if (ready) {
      compileCode();
    }
  }, [code]);
};

const useRunCode = () => {};

export { useInitEmception, useCompileCode, useRunCode };
