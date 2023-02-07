import "./UserProfile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function UserProfile(){

    const [profileData, setProfileData] = useState({
        profile_name: "",
        about_me: ""
    })

    async function getData(){
        await axios.get("/profile"). then((response) => {
            const res = response.data

            setProfileData({
                profile_name: res.name,
                about_me: res.about
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    // If user has NOT logged in, redirects them to login page
    if (localStorage.getItem("isUserLoggedIn") !== "true"){
        return <Navigate replace to="/login" />;
    }

    return (
        <main className="min-vh-100 custom-font user-profile-container">
            <Container className="vh-100">
                <Row className="pt-5">
                    <h1>This is your profile, enjoy</h1>

                    <p>To get your profile details: </p><button onClick={getData}>Click me</button>
                    {profileData && <div>
                        <p>Profile name: {profileData.profile_name}</p>
                        <p>About me: {profileData.about_me}</p>
                    </div>
                    }

                </Row>
            </Container>
        </main>
    );
}