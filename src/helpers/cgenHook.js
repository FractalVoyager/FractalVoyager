import createModule from "../cgen/main.mjs";
import { useState, useEffect, useRef } from "react";
import { useTermStore, useCompileStore } from "../store/zustandTest.js";

const useCgen = (script) => {
  const write = useTermStore((state) => state.write);
  const quickWrite = useTermStore((state) => state.quickWrite);
  const setInitialType = useCompileStore((state) => state.setInitialType);
  const myMod = useRef(null);
  // maybe use callback but kinda alreadlly handing unnescarry re runs of this fcn
  const cgen = useRef(null);
  const getCgen = useRef(null);
  const [code, setCode] = useState(null);
  useEffect(() => {
    // this is called only once to create the module - should really have this called when app starts, would
    // just have to set global state in that case
    const myCreateModule = async () => {
      createModule().then((Module) => {
        cgen.current = Module.cwrap("cgen", "number", [
          "string", // script
        ]);
        getCgen.current = Module.cwrap("getCgen", "number", [
          "number", // string pointer
        ]);

        myMod.current = Module;
      });
      if (script) {
        myCgen();
      }
    };

    const myCgen = async () => {
      quickWrite("Compiling script to c++...");
      // can do some error catching here, assuming it will throw errros if script is malformed
      let length;
      try {
        length = await cgen.current(script.toLowerCase());
      } catch (err) {
        setTimeout(
          () =>
            write(
              "Complication to c++ failed, script is not a proper fractalStream language script.",
              "red",
              false
            ),
          1
        );

        // this is annoying
        setTimeout(
          () =>
            quickWrite(
              " Specific error handling of this type is not currently suppored, please check the language doccumentation."
            ),
          1
        );

        // quickWrite(
        //   "Specific error handling of this type is not currently suppored, please check the language doccumentation."
        // );
      }
      let strPtr = myMod.current.allocateUTF8(length);
      // myMod.current._malloc(strPtr);
      let type = await getCgen.current(strPtr);
      setInitialType(type);
      write("Compiled", "lightgreen", true);
      setCode(myMod.current.UTF8ToString(strPtr).trim());
      myMod.current._free(strPtr);
    };

    // NOT WORKING to have module stick around even though it is in old version because memeory overflow in wasm on this line     FractalParser::ScriptContext* tree = parser.script();
    //myCreateModule();
    // if (!myMod.current) {
    //   myCreateModule();
    // } else {
    //   myCgen();
    // }
    myCreateModule();
  }, [script]);
  //console.log(code);
  return code;
};

export default useCgen;
