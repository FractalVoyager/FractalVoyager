import { useRef, useEffect, useState } from "react";
import { useTermStore } from "../../store/zustandTest";
import "./terminal.css";
const Terminal = ({}) => {
  const { text, color, newLine } = useTermStore((state) => ({
    text: state.text,
    color: state.color,
    newLine: state.newLine,
  }));
  // use ref for this so doesn't rerender each time
  const termRef = useRef(null);

  useEffect(() => {
    if (text) {
      let newText =
        "<span style='color:" +
        color +
        ";'>" +
        text +
        "</span>" +
        (newLine ? "<br>" : "");

      termRef.current.innerHTML += newText;
      //termRef.current.scrollIntoView({ behavior: "smooth" });
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [text]);

  // open on itial render
  useEffect(() => {}, []);

  return <>{<div id="terminal" ref={termRef}></div>}</>;
};

export default Terminal;
