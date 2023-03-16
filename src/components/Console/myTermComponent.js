import { useRef, useEffect, useState } from "react";
import { useTermStore } from "../../store/zustandTest";
import "./terminal.css";
const Terminal = ({}) => {
  const text = useTermStore((state) => state.text);
  // use ref for this so doesn't rerender each time
  const termRef = useRef(null);
  const lastText = useRef(null);

  useEffect(() => {
    if (text) {
      termRef.current.innerText += text + "\n";
      //termRef.current.scrollIntoView({ behavior: "smooth" });
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [text]);

  // open on itial render
  useEffect(() => {}, []);

  return <>{<div id="terminal" ref={termRef}></div>}</>;
};

export default Terminal;
