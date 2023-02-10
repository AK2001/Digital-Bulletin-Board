import "./MainContentPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// @ts-ignore
import goalIMG from "../../assets/goal_img.png";
// @ts-ignore
import owlIMG from "../../assets/owl.png";
import React from "react";

// MainContentPage component. Used to display the main content to users that have not yet logged in the application.
export default function MainContentPage(){

    return (
        <main className="scroll-container custom-font">
            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100" >
                        <Col sm={12}>
                            <img src={owlIMG} height={100} width={100} alt="Owl-logo"/>
                            <div className="p-4 shadow-lg bg-white rounded" id="welcome-sec">
                                <h1>Welcome to Athens Digital Bulletin Board!</h1>
                                <p>The digital bulletin board is Athens <strong>first</strong>&nbsp;
                                    <u>digital platform</u> where everyone can <strong>contribute</strong>
                                    &nbsp;and get <strong>informed</strong> on all charitable tasks that are currently happening.
                                    Continue scrolling or click on the button below to learn how you too can contribute.
                                </p>
                                <Button href="/signup" variant="primary" id="welcome-sec-btn">
                                    Get started!
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className=""></div>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-4 shadow-lg bg-white rounded position-relative" id="goal-sec">
                                <h1>Our goal</h1>
                                <p>
                                    The Athens Digital bulletin board was created to act as a "bridge" between citizens
                                    and citizens in need. The idea behind this application is to create a platform where
                                    citizens can contribute and get informed on all ongoing charitable tasks in the municipality
                                    of Athens. Our goal is to enable more citizens to leave a positive impact on their
                                    municipality while also helping those in need.
                                </p>
                                <div className="goal-img pb-3">
                                    <img src={goalIMG} height={220} width={333} alt="love-handshake"/>
                                </div>
                                <Button
                                    variant="link"
                                    className="position-absolute bottom-0 end-0"
                                    id="goal-sec-btn"
                                    href="/about">Learn more!</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-5 shadow-lg bg-white rounded">
                                <h1>Take a look for yourself!</h1>
                                <p className="fs-4">
                                    <a className="section-3-link" href="/browseTasks">Browse through</a>
                                 &nbsp;the many tasks that have already been published in Digital Bulletin Board.
                                    Be sure, to check each task out for details on how <b>you</b> too can contribute
                                    and be part of a greater community <span role="img">😃</span>!
                                </p>

                                <Button variant={"outline-info"} size={"lg"}>Take me there</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-5 shadow-lg bg-white rounded">
                                <h1>Interested in contributing?</h1>
                                <p>Thanks to the Athens Bulletin Board <u><strong>anyone</strong></u> can
                                    have a positive contribution to their municipality.</p>
                                <Button href = "/login" className="register-btn">Login</Button>
                                <span id="contribute-label">OR</span>
                                <Button href = "/signup" className="register-btn">Signup</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </main>
    );
}