import "./AddTaskPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MDBInput} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import {CheckAddTaskInputs, ValidateAddTaskInputs} from "../LoginSignup/InputValidation/ValidateUserInputs";
import {useContext, useState} from "react";
import AuthContext from "../../helpers/AuthContextProvider";

export default function AddTaskPage(){

    // Takes createTask function as defined withing the AuthContext in AuthContextProvider.tsx
    // Used to create a task
    const {createTask} = useContext(AuthContext)

    // State variable holding task data
    const [taskData, setTaskData] = useState({
        taskTitle: "",
        taskDescription: "",
        taskType: "",
        taskGoal: 0,
        taskDuration: 0,
        taskState: "Ongoing"
    })

    // Function used to handle submit of form
    const handleTaskSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        if (ValidateAddTaskInputs(taskData.taskTitle, taskData.taskType)){

            const data = JSON.stringify({
                "taskTitle": taskData.taskTitle,
                "taskDescription": taskData.taskDescription,
                "taskType": taskData.taskType,
                "taskGoal": taskData.taskGoal,
                "taskDuration": taskData.taskDuration,
                "taskState": taskData.taskState,
            })

            createTask(data);

        }else{
            console.log("Wrong call")
        }
    }

    // Functions used to handle what happens on input change
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {

        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value
        })

        CheckAddTaskInputs(event.target.name, event.target.value);
    }

    return (
        <main className="custom-font">
            <Container className="add-task-container">

                <Row>
                    <h2>Fill the following form to publish your task!</h2>
                </Row>

                <Row className="p-4 bg-white shadow-lg rounded">
                    <form onSubmit={handleTaskSubmit} >

                        <Row>

                            <span className="fs-6 input-validation-msg" id="name-validation-msg"><b>(!)</b> Names should only include latin characters</span>
                            <span id="name-validation-msg-org"></span>

                            <Col>
                                <MDBInput wrapperClass='mb-4'
                                          name="taskTitle"
                                          value={taskData.taskTitle}
                                          label='Task title'
                                          id='tt'
                                          type='text'
                                          required={true}
                                          onChange={handleInputChange}/>
                            </Col>
                        </Row>

                        <Row>

                            <span className="fs-6 input-validation-msg" id="name-validation-msg"><b>(!)</b> Names should only include latin characters</span>

                            <Col>
                                <MDBInput wrapperClass='mb-4'
                                          name="taskDescription"
                                          value={taskData.taskDescription}
                                          label='Task description'
                                          id='tds'
                                          type='text'
                                          required={true}
                                          onChange={handleInputChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <span className="fs-6 input-validation-msg" id="name-validation-msg"><b>(!)</b> Please enter a valid email <u>format</u>. E.g., ilove@my.community</span>

                            <Col md={4}>
                                <MDBInput wrapperClass='mb-4'
                                          name="taskType"
                                          value={taskData.taskType}
                                          label='Type of task'
                                          id='eml'
                                          type='text'
                                          required={true}
                                          onChange={handleInputChange}/>
                            </Col>

                            <Col md={4}>
                                <MDBInput wrapperClass='mb-4'
                                          name="taskGoal"
                                          value={taskData.taskGoal}
                                          label='Goal (in Contributions)'
                                          id='eml'
                                          type='number'
                                          required={true}
                                          onChange={handleInputChange}/>
                            </Col>

                            <Col md={4}>
                                <MDBInput wrapperClass='mb-4'
                                          name="taskDuration"
                                          value={taskData.taskDuration}
                                          label='Duration (in Days)'
                                          id='eml'
                                          type='number'
                                          required={true}
                                          onChange={handleInputChange}/>
                            </Col>

                        </Row>

                        <Button className="w-100" variant={"primary"} type={"submit"}>
                            <b>Add your task!</b>
                        </Button>
                    </form>
                </Row>

            </Container>

        </main>
    );
}