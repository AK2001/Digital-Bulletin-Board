import "./UserProfilePage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../helpers/AuthContextProvider";
import Col from "react-bootstrap/Col";
import axios from "axios";
import TaskCard from "../TaskCard/TaskCard";
import Button from "react-bootstrap/Button";

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

// Type alias for the tasks that are provided by the backend
type taskProps = {
    id: number,
    taskTitle: string,
    taskDesc: string,
    taskType: string,
    taskGoal: string,
    taskDuration: string,
    taskState: string,
    taskPublisherId: number,
    taskPublisherName: string,
    taskDateCreated: string
}

// User profile. The user's profile, where they can see various see and also edit their personal information
export default function UserProfilePage(){

    // Takes user variable as defined withing the AuthContext in AuthContextProvider.tsx
    // User -- holds information about the user, given by the backend
    const { user } = useContext(AuthContext);

    // Stringify the JSON object
    const userDataString = JSON.stringify(user);

    // Parse the JSON string
    const userData:UserDataType = JSON.parse(userDataString);

    // State variable that stores all tasks the user has published
    const [userTasks, setUserTasks] = useState([]);

    // Variable to store if user is of type organization
    const isOrganization = userData.user_type==="Organization"

    // Async function that makes the api call and gets data
    async function getTasksCreatedByUser(){
        await axios.get("/api/getOwnTasks")
            .then((res) => {
                setUserTasks(res.data.all_tasks)
            }).catch(err => {
                console.log(err)
            });
    }

    // State variable that stores all tasks provided by the backend that user has contributed to
    const [allTasksByUser, setAllTasksByUser] = useState([]);

    // Async function that makes the api call and gets data
    async function getTasksByUser(){
        await axios.get("/api/getTasksByUser")
            .then((res) => {
                setAllTasksByUser(res.data.all_tasks)
            }).catch(err => {
                console.log(err)
            });
    }

    // Use effect to gather all tasks upon component render
    useEffect(() =>{

        getTasksByUser()
        // We want to query this data only when user is "Organization"
        if (userData.user_type === "Organization") getTasksCreatedByUser()
    },[])


    return (
        <main className="custom-font">
            <Container className="profile-contents">
                <Row className="p-3 shadow-lg bg-white rounded mb-5">
                    <Col >
                        <Row>
                            <h1><u>Account Details</u></h1>
                        </Row>
                        <Row>
                            <div>
                                <h4 className="d-inline-block pe-1 text-info">Username:</h4>
                                <h4 className="d-inline-block">{userData.last_name ? userData.first_name + " " + userData.last_name : userData.first_name}</h4>
                            </div>
                        </Row>
                        <Row >
                            <div>
                                <h4 className="d-inline-block pe-1 text-info">Email:</h4>
                                <h4 className="d-inline-block">{userData.user_email}</h4>
                            </div>
                        </Row>
                        <Row >
                            <div>
                                <h4 className="d-inline-block pe-1 text-info">Password:</h4>
                                <h4 className="d-inline-block">{userData.user_pass}</h4>
                            </div>
                        </Row>
                        <Row >
                            {userData.user_tin &&
                                <div>
                                    <h4 className="d-inline-block pe-1 text-info">TIN:</h4>
                                    <h4 className="d-inline-block">{userData.user_tin}</h4>
                                </div>
                            }
                        </Row>
                    </Col>
                </Row>

                <Row className="latest-tasks p-3 shadow-lg bg-white rounded mb-5">
                    <h4>Tasks you have contributed to:</h4>
                    {
                        allTasksByUser.length===0?
                            <div>
                                <p className="fs-5">It seems like you haven't contributed to any tasks.&nbsp;
                                    <a href="/browseTasks">Take a look!</a> on some of the published ones and be part of
                                    a greater community</p>
                            </div>
                            :
                            allTasksByUser.map((task: taskProps) => (
                                <TaskCard key={"task" + task.id + Math.random()} taskTitle={task.taskTitle} taskType={task.taskType} taskDesc={task.taskDesc} taskStatus={task.taskState} taskPDate={task.taskDateCreated[0]} taskId={task.id} taskPublisherName={task.taskPublisherName}/>
                            ))
                    }
                </Row>
                {isOrganization &&
                    <Row className="latest-tasks p-3 shadow-lg bg-white rounded mb-3">
                        <h4>Tasks you have published</h4>
                        {
                            userTasks.length===0?
                                <div>
                                    <p className="fs-5">You haven't published any tasks yet!</p>
                                </div>
                                :
                                userTasks.map((task: taskProps) => (
                                    <TaskCard key={"task" + task.id + Math.random()} taskTitle={task.taskTitle} taskType={task.taskType} taskDesc={task.taskDesc} taskStatus={task.taskState} taskPDate={task.taskDateCreated[0]} publisherControl={true} taskId={task.id} taskPublisherName={task.taskPublisherName}/>
                                ))
                        }
                    </Row>
                }



                {isOrganization &&
                    <Row className="text-center align-content-center mb-4">
                        <div>
                            <Button href="/addTask" className="add-task-btn w-100">Add a Task</Button>
                        </div>
                    </Row>
                }
            </Container>
        </main>
    );
}


