import './Login.css'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
}
    from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";

export default function Login(){
    return(
        <main className="min-vh-100 main-container-login">
            <MDBContainer className='vh-100'>

                <MDBRow className="vh-100 align-items-center">

                    <MDBCol lg='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-4 display-3 fw-bold ls-tight px-3">
                            Welcome Back! <br />
                            <span className="text-primary fs-1">We're happy to see you again.</span>
                        </h1>

                        <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                            <u>Remember:</u> By contributing to your municipality, <b>you</b> are able to make an impact
                            and help your fellow citizens in need.
                        </p>

                    </MDBCol>

                    <MDBCol lg='6'>

                        <MDBCard className='my-5 border-0 shadow-lg bg-white rounded'>
                            <MDBCardBody className='p-4 form-container'>

                                <form>

                                    <MDBInput wrapperClass='mb-4' label='Email' id='eml' type='email'/>
                                    <MDBInput wrapperClass='mb-4' label='Password' id='pwl' type='password'/>

                                    <MDBRow className='mb-4'>
                                        <MDBCol className='d-flex justify-content-center'>
                                            <a href='#forgotpass' id="forgot-pass">Forgot password?</a>
                                        </MDBCol>
                                    </MDBRow>

                                    <Button className="w-100" variant={"primary"} type={"submit"}>
                                        <b>Log in</b>
                                    </Button>

                                </form>

                                <MDBRow className='mt-4'>
                                    <MDBCol id="register-msg">
                                        <label>Don't have an account yet?
                                            <a href='/signup' id="register-msg" className="ps-2">Register now!</a>
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