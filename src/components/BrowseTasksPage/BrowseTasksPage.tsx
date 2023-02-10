import "./BrowseTasksPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import UserMessage from "../../helpers/UserMessage";
import {useEffect, useState} from "react";
import TaskCard from "../TaskCard/TaskCard";
import axios from "axios";

// Browse tasks page is the page that users can browse all task publishes inside the system
// and find more information about each
export default function BrowseTasksPage(){

    // Type alias for the tasks that are provided by the backend
    type taskProps = {
        id: number,
        taskTitle: string,
        taskDesc: string,
        taskType: string,
        taskGoal: string,
        taskDuration: string,
        taskState: string,
        taskPublisherId: string,
        taskPublisherName: string,
        taskDateCreated: string
    }

    // State variable that is used to showcase the message (UI element)
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // State variable that stores all tasks provided by the backend
    const [allTasks, setAllTasks] = useState([]);

    // State variable that stores the tasks to showcase
    const [tasksToShow, setTasksToShow] = useState([]);

    // State variable that holds information about the data view
    const [clickFilter, setClickFilter] = useState(true);

    // Function to handle data view
    const handleViewRequest = (event: { target: { name: any; }; }) => {
        if (clickFilter){
            setTasksToShow(allTasks.filter((task:taskProps) => task.taskState===event.target.name))
        }else{
            setTasksToShow(allTasks)
        }

        setClickFilter(!clickFilter)
    }

    // Async function that makes the api call and gets data
    async function getTasks(){
        await axios.get("/api/getTasks")
            .then((res) => {
                setAllTasks(res.data.all_tasks)
                setTasksToShow(res.data.all_tasks)
            }).catch(err => {
                console.log(err)
            });
    }

    // Use effect to gather all tasks upon component render
    useEffect(() =>{
        getTasks()
    },[])


    return (
        <main className="browse-tasks-main custom-font">
            <Container >
                <Row className="browse-tasks-header text-center">
                    <h2>Check out <u>all</u> the Tasks that have been published for your Municipality!</h2>
                    <p className="fs-6"><b>Click</b> on any task to find out more details about how you too can contribute.</p>
                </Row>

                <Row>
                    <Col className="shadow-lg bg-white rounded mb-4">
                        <Row className="task-filters">
                            <Col md={12} className="d-inline-block">
                                <p className="fs-5 pe-2 d-inline-block">Select to view:</p>

                                <Form className="d-inline-block ps-1">
                                    <div key={`inline-checkbox`} className="mb-3">
                                        <Form.Check
                                            onChange={handleViewRequest}
                                            inline
                                            label="Ongoing Tasks"
                                            name="Ongoing"
                                            type={"checkbox"}
                                            id={`checkbox-ongoing`}
                                        />
                                        <Form.Check
                                            onChange={handleViewRequest}
                                            inline
                                            label="Completed Tasks"
                                            name="Completed"
                                            type={"checkbox"}
                                            id={`checkbox-completed`}
                                        />
                                        <Form.Check
                                            onChange={handleViewRequest}
                                            inline
                                            label="Achieved Tasks"
                                            name="Achieved"
                                            type={"checkbox"}
                                            id={`checkbox-achieved`}
                                        />
                                    </div>
                                </Form>
                            </Col>
                        </Row>

                        <Row className="task-catalog">
                            {tasksToShow.length===0?
                                <div>
                                    <p className="fs-5">There are no tasks published yet!</p>
                                </div>
                                :
                                <>
                                    {tasksToShow.map((task: taskProps) => (
                                        <TaskCard key={"task" + task.id} taskTitle={task.taskTitle} taskType={task.taskType} taskDesc={task.taskDesc} taskStatus={task.taskState} taskPDate={task.taskDateCreated[0]} taskId={task.id} taskPublisherName={task.taskPublisherName}/>
                                    ))}
                                </>
                            }
                        </Row>
                    </Col>
                </Row>

            </Container>

            {showMessage &&
                <div className="user-message">
                    <UserMessage/>
                </div>
            }

        </main>
    );
}