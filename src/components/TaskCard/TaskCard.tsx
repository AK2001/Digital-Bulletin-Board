import "../BrowseTasksPage/BrowseTasksPage.css";
import {Card} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";

// Type alias to define task variables
// publisherControl: boolean to hold if publisher has control over this component
// if true, then we can call removeTask() function and remove this task (its instance from the system not the component)
type TaskCardProps = {
    taskTitle: string,
    taskType: string,
    taskDesc: string,
    taskStatus: string,
    taskPDate: string,
    publisherControl?: boolean,
    taskId: number,
    taskPublisherName: string
}

export default function TaskCard({taskTitle, taskType, taskDesc, taskStatus, taskPDate, publisherControl=false, taskId, taskPublisherName}: TaskCardProps) {

    // Async function that makes the API call and removes specific task
    async function removeTask(){
        await axios.get("/api/deleteTask/" + taskId, {
            headers : {"X-CSRF-TOKEN": Cookies.get("csrf_access_token")}
            })
            .then(() => {
                window.location.reload()
            }).catch(err => {
                console.log(err)
            });
    }

    const handleRemoveTask = () => {
        let deleteTask = window.confirm("Are you sure you want to delete this task? This action is permanent")

        if (deleteTask) removeTask()
    }

    return (
        <Col md="12" lg="12" className="mb-4 mb-lg-0">
            <Card className="task-card mb-3">
                <div className="d-flex justify-content-between p-3">
                    <p className="fs-5 mb-0 task-card-title">{taskTitle}</p>


                        {taskStatus==="Ongoing"?
                            <div
                                className="bg-info rounded-1 px-2 d-flex align-items-center justify-content-center shadow-1-strong task-status">
                                <p className="text-white mb-0 small">{taskStatus}</p>
                            </div>
                        :   <>
                                {taskStatus==="Completed" ?
                                    <div
                                        className="bg-warning rounded-1 px-2 d-flex align-items-center justify-content-center shadow-1-strong task-status">
                                        <p className="text-white mb-0 small">{taskStatus}</p>
                                    </div>
                                :   <div
                                        className="bg-success rounded-1 px-2 d-flex align-items-center justify-content-center shadow-1-strong task-status">
                                        <p className="text-white mb-0 small">{taskStatus}</p>
                                    </div>}
                            </>}

                </div>
                <Card.Body className="pt-0">
                    <div className="d-flex">
                        <p>
                            <u>Description</u>:
                        </p>
                        <p className="ps-1 overflow-auto task-card-description">
                            {taskDesc}
                        </p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <p className="text-dark mb-0">Published by: {taskPublisherName}</p>
                        <p className="mb-0"><span className="fw-bold">Task type:</span> {taskType}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="mb-0">
                            <a className="task-details-link"
                               href={"/browseTasks/" + taskId}>
                                View details
                            </a>
                        </p>

                        {publisherControl &&
                            <Button className="task-remove-btn" variant="danger" onClick={handleRemoveTask}>
                                Delete task
                            </Button>
                        }
                        <p className="mb-0">
                            Published: {taskPDate}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}