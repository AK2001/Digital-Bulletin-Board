import './Login.css'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../InputValidation/ValidateUserInputs";
import {CheckLoginInputs, ValidateLoginInputs} from "../InputValidation/ValidateUserInputs";
import axios from "axios";

export default function Login(props: { setToken: (arg: any) => void; }){

    // Navigate hook to redirect user to their profile
    const navigate = useNavigate();

    // Holds login data for the user, their email and password
    const [loginData, setLoginData] = useState({
        userEmail: "",
        userPass: "",
    })

    // Holds the login token given by the backend
    const token = sessionStorage.getItem("token");

    // Handles input change and saves input to component state
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {

        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })

        // checkInputFormat(event.target.name, event.target.value);
        CheckLoginInputs(event.target.name, event.target.value);
    }

    // Handles submit action of form
    async function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        if (ValidateLoginInputs(loginData.userEmail, loginData.userPass)){

            const data = JSON.stringify({
                "email": loginData.userEmail,
                "password": loginData.userPass
            })

            await axios.post("/api/token", data, {
                headers : {"Content-Type": "application/json"}
            })
                .then(res =>{
                    // sessionStorage.setItem("token", res.data.access_token);
                    props.setToken(res.data.access_token);
                    navigate("/profile");
                }).catch(err => {
                    console.log(err)
                })

        }else{
            console.log(loginData)
        }
    }
    
    return(
        <main className="min-vh-100 main-container-login">

            <MDBContainer className='vh-100'>

                <MDBRow className="vh-100 align-items-center ">

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="mt-4 display-3 fw-bold ls-tight px-3">
                            Welcome Back! <br />
                        </h1>

                        <p className="text-primary fs-1 fw-bold lh-sm px-3">We're happy to see you again.</p>

                        <p className='px-3 ' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                            <u>Remember:</u> By contributing to your municipality, <b>you</b> are able to make an impact
                            and help your fellow citizens in need.
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5 border-0 shadow-lg bg-white rounded'>
                            <MDBCardBody className='p-4'>

                                <form onSubmit={handleSubmit}>

                                    <span className="fs-6 input-validation-msg" id="email-validation-msg"><b>(!)</b> Please enter a valid email <u>format</u>. E.g., ilove@my.community</span>
                                    <span id="email-validation-msg-org"></span>

                                    <MDBInput wrapperClass='mb-4'
                                              name="userEmail"
                                              value={loginData.userEmail}
                                              label='Email'
                                              id='eml'
                                              type='email'
                                              required={true}
                                              onChange={handleInputChange}
                                    />

                                    <span className="fs-6 input-validation-msg" id="pass-validation-msg"><b>(!)</b> Passwords <u>must</u> be minimum eight characters, have at least one letter, one number and one special character</span>
                                    <span id="pass-validation-msg-org"></span>

                                    <MDBInput wrapperClass='mb-4'
                                              name="userPass"
                                              value={loginData.userPass}
                                              label='Password'
                                              id='pwl'
                                              type='password'
                                              required={true}
                                              onChange={handleInputChange}
                                    />

                                    <MDBRow className='mb-4'>
                                        <MDBCol className='d-flex justify-content-center'>
                                            <a href='#forgotpass' id="forgot-pass">Forgot password?</a>
                                        </MDBCol>
                                    </MDBRow>

                                    <Button className="w-100" variant={"primary"} type={"submit"} id="submitBtn">
                                        <b>Log in</b>
                                    </Button>

                                </form>

                                <MDBRow className='mt-4'>
                                    <MDBCol>
                                        <label>Don't have an account yet?
                                            <a href='/signup' className="ps-2" id="register-msg">Register now!</a>
                                        </label>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </main>
    );
}