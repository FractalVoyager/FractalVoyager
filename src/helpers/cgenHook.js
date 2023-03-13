import createModule from "../cgen/main.mjs";
import { useState, useEffect, useRef } from "react";

const useCgen = (script) => {
  const myMod = useRef(null);
  // maybe use callback but kinda alreadlly handing unnescarry re runs of this fcn
  const cgen = useRef(null);
  const [code, setCode] = useState(null);
  useEffect(() => {
    // this is called only once to create the module - should really have this called when app starts, would
    // just have to set global state in that case
    const myCreateModule = async () => {
      createModule().then((Module) => {
        cgen.current = Module.cwrap("cgen", "null", ["string", "number"]);

        myMod.current = Module;
      });
      console.log("created");
    };

    const myCgen = async () => {
      // TODO, do three funtions, first gen the code, then get the length of the code, then put the code in an array buffer
      let strPtr = myMod.current.allocateUTF8(1000);
      // can do some error catching here, assuming it will throw errros if script is malformed
      await cgen.current(script, strPtr);

      setCode(myMod.current.UTF8ToString(strPtr));

      myMod.current._free(1000);
    };

    console.log(script);

    if (!script) {
      myCreateModule();
    } else {
      return myCgen();
    }
  }, [script]);

  if (code) {
    return code;
  }
};

export default useCgen;
