import "./UserMainContent.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function UserMainContent(){
    return (
        <main className="min-vh-100 about-page custom-font">
            <Container className="vh-100 user-main-content-container">
                <Row className="">
                    {<h1>Welcome back <span className="user-name">{localStorage.getItem("userEmail")}!</span>, so good to see you again!</h1>}
                </Row>
                <Row className="">
                    <h4>Are you ready to contribute to your Municipality?</h4>
                </Row>
                <Row className="border latest-tasks">
                    <h4>Check out the latest task publishes:</h4>
                    <Col>Col1</Col>
                    <Col>Col2</Col>
                    <Col>Col3</Col>
                </Row>
                <Row className="pt-4">
                    <p>If you want to view all published tasks, click here instead!</p>
                </Row>
            </Container>
        </main>
    )
}