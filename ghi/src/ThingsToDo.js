import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


export default ThingsToDo;
function ThingsToDo() {
  return (
    <Row xs={2} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img
              variant="top"
              src="https://thumbs.dreamstime.com/b/las-vegas-welcome-sign-nevada-usa-to-dusk-149286875.jpg"
            />
            <Card.Body>
              <Card.Title>Suggestion</Card.Title>
              <Card.Text>
                Here is where the description from Yelp will go
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
