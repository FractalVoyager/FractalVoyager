// not sure if I wanna have the cords get passed down or not - don't think so - get the canvas to cords
// in viewer component - don't need it here

// , cords: { re, im }
const CordsBox = ({ display, cords: { re, im } }) => {
  return (
    <>
      <div id="cordsBox">
        {display ? (im >= 0 ? re + "+" + im + "i" : re + " " + im + "i") : ""}
        {/* {re}
        {im} */}
      </div>
    </>
  );
};

export default CordsBox;
