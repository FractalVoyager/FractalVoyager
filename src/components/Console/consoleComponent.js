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
import { FitAddon } from "xterm-addon-fit";

import { useRef, useEffect, useState } from "react";
import "./console.css";
import "../../../node_modules/xterm/css/xterm.css";
import { useTermStore } from "../../store/zustandTest";
const Console = ({}) => {
  const text = useTermStore((state) => state.text);
  const [term, setTerm] = useState(null);

  const termRef = useRef(null);
  console.log("rerender");

  // temp until I get rid of react.strict mode that is causing this to render twice
  const [inited, setInited] = useState(false);

  useEffect(() => {
    console.log("writing", text);
    if (text) {
      console.log(term);
      term.writeln(text);
    }
  }, [text]);

  // open on itial render
  useEffect(() => {
    if (!inited) {
      const fitAddon = new FitAddon({});
      const mterm = new Terminal({});
      mterm.loadAddon(fitAddon);
      mterm.open(termRef.current);
      fitAddon.fit();
      setInited(true);
      // term.resize(0);
      console.log("xterm inited");
      setTerm(mterm);
      console.log(term);
    }
  }, []);

  // return <>{<div id="terminal" ref={termRef}></div>}</>;
};

export default Console;
