import createModule from "../cgen/main.mjs";
import { useState, useEffect, useRef } from "react";
import { useTermStore } from "../store/zustandTest.js";

/*

  let cgen = Module.cwrap("cgen", "number", [
    "string", // script
  ]);
  let getCgen = Module.cwrap("getCgen", "number", [
    "number", // string pointer
  ]);







    type = getCgen(strPtr);

    code = Module.UTF8ToString(strPtr); // read from the allocated memory to the javascript string

    console.log(type);
    console.log(code.trim());
    document.querySelector("#output").innerText = code.trim();

    Module._free(strPtr); // release the allocated memory



*/

const useCgen = (script) => {
  const write = useTermStore((state) => state.write);
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
    };

    const myCgen = async () => {
      write("running script throught cgen...");
      // can do some error catching here, assuming it will throw errros if script is malformed
      let length = await cgen.current(script.toLowerCase());
      let strPtr = myMod.current.allocateUTF8(length);
      await getCgen.current(strPtr);
      write("ran");
      setCode(myMod.current.UTF8ToString(strPtr).trim());
      myMod.current._free(strPtr);
    };

    console.log(script);

    if (!myMod.current) {
      myCreateModule();
    } else {
      myCgen();
    }
  }, [script]);
  return code;
};

export default useCgen;
