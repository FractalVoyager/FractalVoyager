import createModule from "../cgen/main.mjs";
import { useState, useEffect, useRef } from "react";
import { useTermStore, useCompileStore } from "../store/zustandTest.js";

const useCgen = (script) => {
  const write = useTermStore((state) => state.write);
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
      write("creating cgen module");
      createModule().then((Module) => {
        cgen.current = Module.cwrap("cgen", "number", [
          "string", // script
        ]);
        getCgen.current = Module.cwrap("getCgen", "number", [
          "number", // string pointer
        ]);

        myMod.current = Module;
      });
      write("created");
      myCgen();
    };

    const myCgen = async () => {
      write("running script throught cgen...");
      // can do some error catching here, assuming it will throw errros if script is malformed
      let length = await cgen.current(script.toLowerCase());
      let strPtr = myMod.current.allocateUTF8(length);
      // myMod.current._malloc(strPtr);
      let type = await getCgen.current(strPtr);
      setInitialType(type);
      write("ran");
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
  return code;
};

export default useCgen;
