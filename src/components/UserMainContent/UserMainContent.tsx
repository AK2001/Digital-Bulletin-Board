import "./UserMainContent.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../helpers/AuthContextProvider";
import TaskCard from "../TaskCard/TaskCard";
import axios from "axios";

// Type alias to provide info on the contents of user context variable
type UserDataType = {
    first_name: string,
    last_name: string,
    id: number,
    user_type:string
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
    taskPublisherId: string,
    taskPublisherName: string,
    taskDateCreated: string
}

// UserMainContent component. Used to display the main content to users that have logged in the application.
export default function UserMainContent(){

    // Takes user variable as defined withing the AuthContext in AuthContextProvider.tsx
    // User -- holds information about the user, given by the backend
    const { user, handleSessionExpired } = useContext(AuthContext);

    // Stringify the JSON object
    const userDataString = JSON.stringify(user);

    // Parse the JSON string
    const userData:UserDataType = JSON.parse(userDataString);

    // Variable to hold greeting message
    const greetingMsg = userData.last_name===null? userData.first_name : userData.first_name + " " + userData.last_name

    // State variable that stores all tasks provided by the backend
    const [allTasks, setAllTasks] = useState([]);

    // State variable that stores all tasks provided by the backend
    const [allTasksByUser, setAllTasksByUser] = useState([]);

    // Async function that makes the api call and gets data
    async function getTasks(){
        await axios.get("/api/getTasks")
            .then((res) => {
                setAllTasks(res.data.all_tasks)
            }).catch(err => {
                console.log(err)
            });
    }

    // Async function that makes the api call and gets data
    async function getTasksByUser(){
        await axios.get("/api/getTasksByUser")
            .then((res) => {
                setAllTasksByUser(res.data.all_tasks)
            }).catch(err => {
                if (err.response.statusText === "UNAUTHORIZED"){
                    handleSessionExpired()
                }
            });
    }

    // Use effect to gather all tasks upon component render
    useEffect(() =>{
        getTasks()
        getTasksByUser()
    },[])

    return (
        <main className="custom-font">
            <Container className="user-main-content-container">
                <Row className="p-3 shadow-lg bg-white rounded mb-5">
                    <Col >
                        <Row>
                            {<h1>Welcome back <span className="user-name">{greetingMsg}!</span>, so good to see you again!</h1>}
                        </Row>
                        <Row>
                            <h4 className="fw-semibold">Are you ready to contribute to your Municipality?</h4>
                        </Row>
                        <Row className="latest-tasks">
                            <h4><u>Tasks you have contributed to:</u></h4>
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
                        <Row className="latest-tasks">
                            <h4><u>Check out the latest task publishes:</u></h4>
                            {allTasks.length>3 ?
                                allTasks.slice(-3).map((task: taskProps) => (
                                    <TaskCard key={"task" + task.id + Math.random()} taskTitle={task.taskTitle} taskType={task.taskType} taskDesc={task.taskDesc} taskStatus={task.taskState} taskPDate={task.taskDateCreated[0]} taskId={task.id} taskPublisherName={task.taskPublisherName}/>))
                            :
                                allTasks.map((task: taskProps) => (
                                    <TaskCard key={"task" + task.id + Math.random()} taskTitle={task.taskTitle} taskType={task.taskType} taskDesc={task.taskDesc} taskStatus={task.taskState} taskPDate={task.taskDateCreated[0]} taskId={task.id} taskPublisherName={task.taskPublisherName}/>))
                            }
                        </Row>
                        <Row className="pt-4">
                            <p>If you want to view all published tasks, <a href="/browseTasks">click here</a> instead!</p>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </main>
    )
}