import './Task.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

type TaskProps = {
    title:string
    desc:string
}

export default function Task({title,desc}:TaskProps){
    return (
        <div className="task-container border">
            <div id="task-title">
                <p>{title}</p>
            </div>
            <div id="task-desc">
                <p>{desc}</p>
            </div>
            <div id="task-btn">
                <Button variant={"link"}>Go to task</Button>
            </div>
        </div>

        // <Container fluid className="border task-container">
        //     <Row>
        //         <p>{title}</p>
        //     </Row>
        //     <Row id="task-desc">
        //         <p>{desc}</p>
        //     </Row>
        //
        //     <Row>
        //         <Button variant={"link"}>Go to task</Button>
        //     </Row>
        // </Container>
    );
}