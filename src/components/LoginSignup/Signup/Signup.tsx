import '../LoginSignup.css';
import {MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow,MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import TOSPopup from "../TOSPopup/TOSPopup";
import "../InputValidation/ValidateUserInputs";
import {
    CheckCitizenSignupInputs,
    CheckOrganizationSignupInputs,
    ValidateCitizenSignupInputs, ValidateOrganizationSignupInputs
} from "../InputValidation/ValidateUserInputs";
import {Navigate} from "react-router-dom";


export default function Signup(){

    // Holds register data for the user (citizen)
    const [userData, setUserData] = useState({
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPass: "",
        userTOS: false,
    })

    // Holds register data for the user (organization)
    const [orgData, setOrgData] = useState({
        organizationName: "",
        organizationTIN: null,
        organizationEmail: "",
        organizationPass: "",
        userTOS: false,
    })

    // Handles input change and saves input to component state
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {

        if (event.target.name.startsWith("user")){
            setUserData({
                ...userData,
                [event.target.name]: event.target.value
            })

            CheckCitizenSignupInputs(event.target.name, event.target.value);
        }else{
            setOrgData({
                ...orgData,
                [event.target.name]: event.target.value
            })

            CheckOrganizationSignupInputs(event.target.name, event.target.value);
        }
    }

    // Handles submit action of form
    const handleCitizenSubmit = (event: { preventDefault: () => void; }) => {
        if (ValidateCitizenSignupInputs(userData.userFirstName, userData.userLastName, userData.userEmail, userData.userPass)){
            return true;
        }else{
            event.preventDefault();
            return false;
        }
    }

    const handleOrganizationSubmit = (event: { preventDefault: () => void; }) => {
        if (orgData.organizationTIN != null) {
            if (ValidateOrganizationSignupInputs(orgData.organizationName, orgData.organizationTIN, orgData.organizationEmail, orgData.organizationPass)) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        }
    }

    // Boolean state to control TOS pop up window
    const [popupShow, setPopupShow] = useState(false);

    // State to hold register option for users (Citizens or Organizations)
    const [registerOption, setRegisterOption] = useState("opt1");

    // Function to handle sign up option selection
    const handleOptionChange = (value: string) => {
        if (value === registerOption){
            return;
        }
        setRegisterOption(value);
    }

    // If user has already logged in, redirect to profile page
    if (localStorage.getItem("isUserLoggedIn") === "true"){
        return <Navigate replace to="/profile" />;
    }

    return(
        <main className="min-vh-100 main-container-signup">

            <MDBContainer className='vh-100'>

                <MDBRow className="vh-100 align-items-center">

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="mt-4 display-3 fw-bold ls-tight px-3">
                            Hey there! <br />
                        </h1>

                        <p className="text-primary fs-1 fw-bold lh-sm px-3">Are you ready to help your municipality?</p>

                        <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                            By joining the Digital Bulletin Board <b>you</b> will be able to leave your positive impact
                            on the world... starting from your municipality.
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5 border-0 shadow-lg bg-white rounded'>
                            <MDBCardBody className='p-4'>

                                {/*Option selection*/}
                                <MDBTabs justify className='mb-3'>
                                    <MDBTabsItem>
                                        <MDBTabsLink onClick={() => handleOptionChange('opt1')} active={registerOption === 'opt1'}>
                                            Sign up as <b>Citizen</b>
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <MDBTabsLink onClick={() => handleOptionChange('opt2')} active={registerOption === 'opt2'}>
                                            Sign up as <b>Organization</b>
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                </MDBTabs>

                                <MDBTabsContent>

                                    {/*Sign up as Citizen*/}
                                    <MDBTabsPane show={registerOption === 'opt1'}>
                                        <form onSubmit={handleCitizenSubmit} >

                                            <MDBRow>
                                                <span className="fs-6 input-validation-msg" id="name-validation-msg"><b>(!)</b> Names should only include latin characters</span>

                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4'
                                                              name="userFirstName"
                                                              value={userData.userFirstName}
                                                              label='First name'
                                                              id='fnl'
                                                              type='text'
                                                              required={true}
                                                              onChange={handleInputChange}/>
                                                </MDBCol>

                                                <MDBCol md='6'>
                                                    <MDBInput wrapperClass='mb-4'
                                                              name="userLastName"
                                                              value={userData.userLastName}
                                                              label='Last name'
                                                              id='lsl'
                                                              type='text'
                                                              required={true}
                                                              onChange={handleInputChange}/>
                                                </MDBCol>
                                            </MDBRow>

                                            <span className="fs-6 input-validation-msg" id="email-validation-msg"><b>(!)</b> Please enter a valid email <u>format</u>. E.g., ilove@my.community</span>

                                            <MDBInput wrapperClass='mb-4'
                                                      name="userEmail"
                                                      value={userData.userEmail}
                                                      label='Email'
                                                      id='eml'
                                                      type='email'
                                                      required={true}
                                                      onChange={handleInputChange}/>

                                            <span className="fs-6 input-validation-msg" id="pass-validation-msg"><b>(!)</b> Passwords <u>must</u> be minimum eight characters, have at least one letter, one number and one special character</span>

                                            <MDBInput wrapperClass='mb-4'
                                                      name="userPass"
                                                      value={userData.userPass}
                                                      label='Password'
                                                      id='pwl'
                                                      type='password'
                                                      required={true}
                                                      onChange={handleInputChange}/>

                                            <MDBRow className='mb-4'>
                                                <MDBCol md='8' className='d-flex'>

                                                    <MDBCheckbox
                                                        className="mt-2"
                                                        id='tos'
                                                        label=''
                                                        aria-label='terms of service agreement'
                                                        type="checkbox"
                                                        required={true}
                                                        onChange={handleInputChange}/>

                                                    <label className="ps-2 pb-2">I agree to the
                                                        <Button variant="link" onClick={()=> setPopupShow(true)} className="ps-1 pb-2" >Terms of Service</Button>
                                                    </label>

                                                    <TOSPopup
                                                        show={popupShow}
                                                        onHide={() => setPopupShow(false)}/>

                                                </MDBCol>
                                                <MDBCol md='4' className='d-flex pt-2'>
                                                    <a href='#forgotpass' id="forgot-pass">Forgot password?</a>
                                                </MDBCol>
                                            </MDBRow>

                                            <Button className="w-100" variant={"primary"} type={"submit"}>
                                                <b>Sign up</b>
                                            </Button>
                                        </form>
                                    </MDBTabsPane>

                                    {/*Sign up as Organization*/}
                                    <MDBTabsPane show={registerOption === 'opt2'}>
                                        <form onSubmit={handleOrganizationSubmit} >

                                            <MDBRow>

                                                <span className="fs-6 input-validation-msg" id="name-validation-msg-org"><b>(!)</b> Names should only include latin characters</span>
                                                <span className="fs-6 input-validation-msg" id="tin-validation-msg"><b>(!)</b> The TIN number must be 9 digits</span>

                                                <MDBCol md='8'>

                                                    <MDBInput wrapperClass='mb-4'
                                                              name="organizationName"
                                                              value={orgData.organizationName}
                                                              label='Organization Name'
                                                              type='text'
                                                              required={true}
                                                              onChange={handleInputChange}/>
                                                </MDBCol>

                                                <MDBCol md='4'>

                                                    <MDBInput wrapperClass='mb-4'
                                                              name="organizationTIN"
                                                              value={orgData.organizationTIN || ""}
                                                              label='Org. T.I.N.'
                                                              type='number'
                                                              required={true}
                                                              onChange={handleInputChange}/>
                                                </MDBCol>
                                            </MDBRow>

                                            <span className="fs-6 input-validation-msg" id="email-validation-msg-org"><b>(!)</b> Please enter a valid email <u>format</u>. E.g., ilove@my.community</span>

                                            <MDBInput wrapperClass='mb-4'
                                                      name="organizationEmail"
                                                      value={orgData.organizationEmail}
                                                      label='Org. Email'
                                                      type='email'
                                                      required={true}
                                                      onChange={handleInputChange}/>

                                            <span className="fs-6 input-validation-msg" id="pass-validation-msg-org"><b>(!)</b> Passwords <u>must</u> be minimum eight characters, have at least one letter, one number and one special character</span>

                                            <MDBInput wrapperClass='mb-4'
                                                      name="organizationPass"
                                                      value={orgData.organizationPass}
                                                      label='Password'
                                                      type='password'
                                                      required={true}
                                                      onChange={handleInputChange}/>

                                            <MDBRow className='mb-4'>
                                                <MDBCol md='8' className='d-flex'>

                                                    <MDBCheckbox
                                                        className="mt-2"
                                                        label=''
                                                        aria-label='terms of service agreement'
                                                        type="checkbox"
                                                        required={true}
                                                        onChange={handleInputChange}/>

                                                    <label className="ps-2 pb-2">I agree to the
                                                        <Button variant="link" onClick={()=> setPopupShow(true)} className="ps-1 pb-2" >Terms of Service</Button>
                                                    </label>

                                                    <TOSPopup
                                                        show={popupShow}
                                                        onHide={() => setPopupShow(false)}/>

                                                </MDBCol>
                                                <MDBCol md='4' className='d-flex pt-2'>
                                                    <a href='#forgotpass' id="forgot-pass">Forgot password?</a>
                                                </MDBCol>
                                            </MDBRow>

                                            <Button className="w-100" variant={"primary"} type={"submit"}>
                                                <b>Sign up</b>
                                            </Button>
                                        </form>
                                    </MDBTabsPane>
                                </MDBTabsContent>

                                <MDBRow className='mt-4 '>
                                    <MDBCol>
                                        <label>Already have an account?
                                            <a href='/login' className="ps-2">Log in instead!</a>
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
//
// <MDBRow>
//     <MDBCol id="">
//         <Button className="w-100" variant={"primary"}>
//             <b>Sign up</b>
//         </Button>
//     </MDBCol>
//
//     <MDBCol id="">
//         <Button className="w-100" variant={"primary"}>
//             <b>Sign up</b>
//         </Button>
//     </MDBCol>
// </MDBRow>