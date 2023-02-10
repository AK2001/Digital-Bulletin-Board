import "./TaskPage.css"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AuthContext from "../../helpers/AuthContextProvider";
import Col from "react-bootstrap/Col";

// Type alias to provide info on the contents of user context variable
type UserDataType = {
    id: number,
    first_name: string,
    last_name: string,
    user_email: string,
    user_pass: string,
    user_tin: string,
    user_type: string;
}

// Interface used to define task variable
interface ITask{
    id: number | null,
    taskTitle: string,
    taskDesc: string,
    taskType: string,
    taskGoal: string,
    taskDuration: string,
    taskState: string,
    taskPublisherId: number | null,
    taskPublisherName: string,
    taskDateCreated: string
    totalContributions: number | null
}

// User profile. The user's profile, where they can see various see and also edit their personal information
export default function TaskPage(){

    // Takes user variable as defined withing the AuthContext in AuthContextProvider.tsx
    // User -- holds information about the user, given by the backend
    const { user } = useContext(AuthContext);

    // Stringify the JSON object
    const userDataString = JSON.stringify(user);

    // Parse the JSON string
    const userData:UserDataType = JSON.parse(userDataString);

    // Create a constant that will hold useNavigate hook
    // used to "change" the path and thus components
    const navigate = useNavigate();

    // Task id parameters from routing
    const { taskId } = useParams()

    // State variable to hold task information based on predifined interface
    const [taskData, setTaskData] = useState<ITask>({
        id: null,
        taskTitle: "",
        taskDesc: "",
        taskType: "",
        taskGoal: "",
        taskDuration: "",
        taskState: "",
        taskPublisherId: null,
        taskPublisherName: "",
        taskDateCreated: "",
        totalContributions: null
    })

    // Async function that makes the api call and get task data
    async function getSpecificTask(){
        await axios.get("/api/getTask/"+taskId)
            .then((res) => {
                setTaskData(res.data)
            }).catch(err => {
                console.log(err)
                if (err.response.status===404){
                    navigate("/browseTasks")
                }
            });
    }

    // Use effect to gather task information
    useEffect(() => {
        getSpecificTask()
    },[])

    // Async function that makes the API call and registers the user as "contributor" to the specific task
    async function contributeToTask(){
        await axios.get("/api/contributeToTask/"+taskId)
            .then(() => {
                window.location.reload()
            }).catch(err => {
                console.log(err)
                if (err.response.status===404){
                    navigate("/browseTasks")
                }
                if (err.response.status===400){
                    window.alert("You cannot contribute to a task that is either Completed or Achieved")
                }
            });
    }

    const handleContribute = () => {
        if (!userData){
            window.alert("You need to login first in order to contribute to a task")
        }else {
            if (taskData.taskPublisherId === userData.id) {
                window.alert("You cannot contribute to a task you have published.")
            } else {
                contributeToTask()
            }
        }

    }

    return (
        <main className="custom-font task-page-container">
            <Container>
                <Row className="p-3 shadow-lg bg-white rounded mb-5">
                    <Col>
                        <Row className="mb-2">
                            <div className="d-flex justify-content-between fs-3">
                                <p className="text-dark mb-0"><u>Title: {taskData.taskTitle}</u> - {taskData.taskType}</p>
                                <div className="text-end">
                                    <p className="mb-0 fs-4"><span className="fw-bold">Published by:</span> {taskData.taskPublisherName}</p>
                                    <p className="pe-0 fs-5">on {taskData.taskDateCreated[0]}</p>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-5">
                            <div className="fs-4 mb-1">
                                <p className="text-dark mb-0"><i>Task description:</i> {taskData.taskDesc}</p>
                            </div>
                        </Row>
                        <Row className="mb-4">
                            <div className="d-flex justify-content-between fs-3">
                                <div className="fs-4 mb-1">
                                    <p className="text-dark mb-0"><i>This task is currently</i> <b>-{taskData.taskState}-</b></p>
                                </div>
                                <div className="text-end">
                                    <p className="mb-0 fs-4"><span className="fw-bold">Total contributions:</span> {taskData.totalContributions}/{taskData.taskGoal}</p>
                                </div>
                            </div>
                        </Row>
                    </Col>

                    <Button className="contribute-btn" onClick={handleContribute}>
                        Contribute
                    </Button>
                </Row>

            </Container>
        </main>
    );
}


