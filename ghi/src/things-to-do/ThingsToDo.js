import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default ThingsToDo;

function ThingsToDo() {
  return (
    <Row className="g-4 justify-content-center">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://thumbs.dreamstime.com/b/las-vegas-welcome-sign-nevada-usa-to-dusk-149286875.jpg"
            />
            <Card.Body>
              <Card.Title>Celine Dion Concert</Card.Title>
              <Card.Text>
                The Courage World Tour is the fourteenth concert tour by
                Canadian singer Celine Dion, in support of her English-language
                studio album Courage (2019). Live from the Las Vegas strip! Your
                heart WILL go on.
              </Card.Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/detail/${idx}`}>
                  <Button variant="primary">Get details</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
