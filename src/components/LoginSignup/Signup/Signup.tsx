import {MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";


export default function Signup(){
    return(
        <main className="min-vh-100">
            <MDBContainer className='vh-100'>

                <MDBRow className="vh-100 align-items-center">

                    <MDBCol lg='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-4 display-3 fw-bold ls-tight px-3">
                            Hey there! <br />
                            <h2 className="text-primary pt-1">Are you ready to help your municipality?</h2>
                        </h1>

                        <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                            By joining the Digital Bulletin Board <b>you</b> will be able to leave your positive impact
                            on the world... starting from your municipality.
                        </p>

                    </MDBCol>

                    <MDBCol lg='6'>

                        <MDBCard className='my-5 border-0 shadow-lg bg-white rounded'>
                            <MDBCardBody className='p-5'>

                                <form>

                                    <MDBRow>
                                        <MDBCol md='6'>
                                            <MDBInput wrapperClass='mb-4' label='First name' id='fnl' type='text'/>
                                        </MDBCol>

                                        <MDBCol md='6'>
                                            <MDBInput wrapperClass='mb-4' label='Last name' id='lsl' type='text'/>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBInput wrapperClass='mb-4' label='Email' id='eml' type='email'/>
                                    <MDBInput wrapperClass='mb-4' label='Password' id='pwl' type='password'/>

                                    <MDBRow className='mb-4'>
                                        <MDBCol md='8' className='d-flex justify-content-center'>
                                            <MDBCheckbox id='tosl' label='' aria-label='terms of service agreement'/>
                                            <label className="ps-2">I agree to the
                                                <a href="#Terms" className="ps-1" >Terms and Services</a>.
                                            </label>
                                        </MDBCol>
                                        <MDBCol md='4' className='d-flex justify-content-center'>
                                            <a href='#forgotpass' id="forgot-pass">Forgot password?</a>
                                        </MDBCol>
                                    </MDBRow>

                                    <Button className="w-100" variant={"primary"} type={"submit"}>
                                        <b>Sign up</b>
                                    </Button>
                                </form>

                                <MDBRow className='mt-4'>
                                    <MDBCol id="register-msg">
                                        <label>Already have an account?
                                            <a href='/login' id="register-msg" className="ps-2">Log in instead!</a>
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