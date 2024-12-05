import { Card, Col, Container, Row } from "react-bootstrap"

export default function Status(){
  return <Card>
    <Container>

    <Row>
      <Col xs={3}>
        <img src="./src/assets/avatar.jpg" style={{width:"100%"}}></img>
      </Col>
      <Col xs={9} style={{textAlign:"left", paddingLeft:"50px"}}>
        <Row>
          <p>First "Nickname" Last</p>
        </Row>
        <Row>
          <p>Currently</p>
        </Row>
        <Row>
          <p>Sleeping...</p>
        </Row>
      </Col>
    </Row>

    </Container>
  </Card>
}