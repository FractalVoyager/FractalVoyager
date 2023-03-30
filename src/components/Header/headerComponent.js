import Card from "react-bootstrap/Card";

const Header = ({}) => {
  return (
    <>
      <Card id="header">
        <Card.Body>
          <Card.Title>Fractal Stream</Card.Title>
          <Card.Subtitle>
            Online fractal generator using the fractal stream language
          </Card.Subtitle>
          <Card.Text>
            Enter a script in the text box and press "compile and run". Zoom in
            on any part of the fractal by dragging a box. For more options, open
            the "program options" to edit the paramters used by fractal stream
            to generate the fractal, or open the "viewer options" to edit how
            the fractal looks.
          </Card.Text>
          <Card.Link href="#">Language Doccumentation</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Header;
