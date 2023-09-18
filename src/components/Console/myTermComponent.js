import { useRef, useEffect, useState } from "react";
import { useTermStore, useCanStyleStore } from "../../store/zustandTest";
import "./terminal.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/*
props: none
returns: the terminal component which displays helpful messages and functions 
description: takes text from global store and writes it to the "terminal"
*/
const Terminal = () => {
  const [termMaxed, setTermMaxed] = useState(true);
  // get text, color, and bool if there should be a newline from store
  const { text, color, newLine } = useTermStore((state) => ({
    text: state.text,
    color: state.color,
    newLine: state.newLine,
  }));

  const triggerReStyle = useCanStyleStore((state) => state.triggerReCalc);

  // ref to div which is terminal
  const termRef = useRef(null);

  // on change of store, update the div by adding to the innerHTML with spans of the text
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
      // scoll to bottom everytime text is added
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [text, color, newLine]);

  return (
    <>
      <div
        id="outer-terminal"
        className={termMaxed ? "termMaxed" : "termMined"}
      >
        <Form>
          <Button
            variant="secondary"
            size="sm"
            id="termMinMax"
            onClick={() => {
              setTermMaxed((prev) => !prev);
              triggerReStyle();
            }}
          >
            {termMaxed ? "-" : "+"}
          </Button>
        </Form>
        <div id="inner-terminal" ref={termRef}></div>
      </div>
    </>
  );
};

export default Terminal;
