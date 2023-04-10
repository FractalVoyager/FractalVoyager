/*
props: display: wether the cords box should be displayed or not, cords: the complex number ot be displayed
returns: this component only (cords box)
description: simple component that displays the complex number on screen if prompted
*/
const CordsBox = ({ display, cords: { re, im } }) => {
  return (
    <>
      <div id="cordsBox">
        {display
          ? im >= 0
            ? // add an i
              re + "+" + im + "i"
            : // take off negative and add minus sign
              re + "-" + im.toString().slice(1) + "i"
          : ""}
        {/* {re}
        {im} */}
      </div>
    </>
  );
};

export default CordsBox;
