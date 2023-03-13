/* 
TODO - this 
prob want to have some global state that  emcpetion hooks and other stuff writes to to create some console output for building, compiling, etc
try to make it so its just like an add thing and don't have to do it each time
want some useRefs (might be werid to have use Refs state dependent )
*/

// const output = document.getElementById("console");
// function addToConsole(data) {
//   output.appendChild(document.createTextNode(data.join(" ") + "\n"));
// }

import { Terminal } from "xterm";
// import { FitAddon } from "xterm-addon-fit";

import { useRef, useEffect, useState } from "react";
import "./console.css";
import "../../../node_modules/xterm/css/xterm.css";

const Console = ({}) => {
  const term = new Terminal({
    rows: 5,
    cols: 10,
  });
  const termRef = useRef(null);

  // temp until I get rid of react.strict mode that is causing this to render twice
  const [inited, setInited] = useState(false);

  // open on itial render
  useEffect(() => {
    if (!inited) {
      term.open(termRef.current);
      setInited(true);
    }
  }, []);

  return (
    <>
      <div id="terminal">
        <div ref={termRef}></div>
      </div>
    </>
  );
};

export default Console;
