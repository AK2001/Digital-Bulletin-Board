import './Task.css';
import Button from "react-bootstrap/Button";

type TaskProps = {
    title:string
    desc:string
}

export default function Task({title,desc}:TaskProps){
    return (
        <div className="task-container">
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
    );
}