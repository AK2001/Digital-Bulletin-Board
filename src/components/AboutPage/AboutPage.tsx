import "./AboutPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function AboutPage(){
    return (
        <main className="min-vh-100 about-page custom-font">
            <Container className="vh-100">
                <Row className="about-contents">
                    <h1>About Us</h1>
                </Row>
                <Row>
                    <p className="fs-4">The Digital Bulletin Board project was created to promote charitable actions to happen more frequently in the municipality
                    of Athens. The project was created by a team of four college students, studying in AthTech College in Athens, Greece.<br/><br/>
                    The Team:<br/></p>
                    <ul className="fs-4">
                        <li>Alexandros Kelaiditis</li>
                        <li>Alexandros Ntostoglou</li>
                        <li>Sotiris Poulis</li>
                        <li>Spyros Katiforis</li>
                    </ul>

                </Row>
            </Container>
        </main>
    );
}