import "./MainContent.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import goalIMG from "../../assets/goal_img.png";
import owlIMG from "../../assets/owl.png";
import Task from "../Task/Task";

function Logo(){
    return (
        <div className="d-flex position-relative logo">
            <h1 >Citi&nbsp;&nbsp;id</h1>
            <h1 className="custom-font-logo position-absolute" id="logo-a">A</h1>
        </div>
    );
}

export default function MainContent(){
    return (
        <div className="scroll-container custom-font">

            <section className="scroll-area">
                <Container className="text-center h-100 " >
                    <Row className="align-items-center h-100" >
                        <Col sm={12}>
                            <img src={owlIMG} height={100} width={100} alt="Owl-logo"/>
                            <div className="shadow-lg bg-white rounded" id="welcome-sec">
                                <div className="d-flex justify-content-center">
                                    <h1>Welcome to</h1>&nbsp;
                                    <Logo />
                                </div>
                                <p>The digital bulletin board is Athens <strong>first</strong>&nbsp;
                                    <u>digital platform</u> where everyone can <strong>contribute</strong>
                                    &nbsp;and get <strong>informed</strong> on all charitable tasks that are currently happening.
                                    Continue scrolling or click on the button below to learn how you too can contribute.
                                </p>
                                <Button href="/#login" variant="primary" id="welcome-sec-btn">
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
                        <Col sm={12} className="p-4 shadow-lg bg-white rounded position-relative">
                            <h1>Our goal</h1>
                            <p className="text-justify">
                                The Athens Digital bulletin board was created to act as a "bridge" between citizens
                                and citizens in need. The idea behind this application is to create a platform where
                                citizens can contribute and get informed on all ongoing charitable tasks in the municipality
                                of Athens. Our goal is to enable more citizens to leave their positive impact on their
                                municipality while also helping those in need.
                            </p>
                            <div className="goal-img pb-3">
                                <img src={goalIMG} height={220} width={333} alt="love-handshake"/>
                            </div>
                            <Button
                                variant="link"
                                className="position-absolute bottom-0 end-0"
                                id="goal-sec-btn"
                                href="/#about">Learn more!</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12} className="p-4 shadow-lg bg-white rounded ">
                            <Row>
                                <h1>Take a look!</h1>
                            </Row>

                            <Row className="justify-content-center task-container">
                                <Col sm={3}>
                                    <h4 className="task-title">Ongoing tasks</h4>
                                    <Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/>
                                    <Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/>
                                    <Task title={"task3"} desc={"Small description"}/>
                                </Col>

                                <Col sm={3}>
                                    <h4 className="task-title">Completed tasks</h4>
                                    <Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/>
                                    <Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/>
                                    <Task title={"task3"} desc={"Small description"}/>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*<section className="py-5 scroll-area">*/}
            {/*    <Container className="text-center mt-5 py-5 shadow-lg bg-white rounded">*/}
            {/*        <Row>*/}
            {/*            <Col sm={12}>*/}
            {/*                <h1>Take a look!</h1>*/}

            {/*            </Col>*/}
            {/*        </Row>*/}

            {/*        <Row className="justify-content-center">*/}
            {/*            <Col sm={3}>*/}
            {/*                <h3>Ongoing tasks</h3>*/}
            {/*                <Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/>*/}
            {/*                <Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/>*/}
            {/*                <Task title={"task3"} desc={"Small description"}/>*/}
            {/*            </Col>*/}

            {/*            <Col sm={3}>*/}
            {/*                <h3>Completed tasks</h3>*/}
            {/*                <Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/>*/}
            {/*                <Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/>*/}
            {/*                <Task title={"task3"} desc={"Small description"}/>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*</section>*/}

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-4 shadow-lg bg-white rounded">
                                <h1>Interested in contributing?</h1>
                                <p>Thanks to the Athens Bulletin Board <u><strong>anyone</strong></u> can
                                    have a positive contribution to their municipality.</p>
                                <Button>Login</Button>OR
                                <Button>Signup</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    );
}