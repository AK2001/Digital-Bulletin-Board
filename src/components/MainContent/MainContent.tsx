import "./MainContent.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// @ts-ignore
import goalIMG from "../../assets/goal_img.png";
// @ts-ignore
import owlIMG from "../../assets/owl.png";
import Task from "../Task/Task";

export default function MainContent(){
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
                                    href="/#about">Learn more!</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-4 pb-0 shadow-lg bg-white rounded">
                                <h1>Take a look!</h1>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Ongoing Tasks</th>
                                        <th scope="col">Completed Tasks</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/></td>
                                        <td><Task title={"task1"} desc={"The feelgood org. collects clothes at St.John church for the homeless of the area"}/></td>
                                    </tr>
                                    <tr>
                                        <td><Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/></td>
                                        <td><Task title={"task3"} desc={"Small description"}/></td>
                                    </tr>
                                    <tr>
                                        <td><Task title={"task3"} desc={"Small description"}/></td>
                                        <td><Task title={"task2"} desc={"The friends of the forest want volunteers to plant more than 100000 trees in athens at 29/4/2023"}/></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="scroll-area">
                <Container className="text-center h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={12}>
                            <div className="p-4 shadow-lg bg-white rounded">
                                <h1>Interested in contributing?</h1>
                                <p>Thanks to the Athens Bulletin Board <u><strong>anyone</strong></u> can
                                    have a positive contribution to their municipality.</p>
                                <Button href = "/login">Login</Button>
                                <span id="contribute-label">OR</span>
                                <Button href = "/signup">Signup</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </main>
    );
}