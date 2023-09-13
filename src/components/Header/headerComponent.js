import Card from "react-bootstrap/Card";

/*
props: none
returns: header component only
descripton: simple component just to return header
*/
const Header = () => {
  return (
    <>
      <Card id="header">
        <Card.Body>
          <Card.Title>Fractal Voyager</Card.Title>
          <Card.Subtitle>
            Online fractal generator using a complex dynamics scripting language
          </Card.Subtitle>
          <Card.Text>
            Enter a script in the text box and press "compile and run". To alter
            the paramters passed to the program, edit the options then click
            update.
          </Card.Text>
          {/* <Card.Link href="#">Language Doccumentation</Card.Link> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default Header;
