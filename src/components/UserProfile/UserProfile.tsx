import "./UserProfile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useContext, useState} from "react";
import axios from "axios";
import AuthContext from "../../AuthContextProvider";

// User profile. The user's profile, where they can see various see and also edit their personal information
export default function UserProfile(){

    const [profileData, setProfileData] = useState({
        profile_name: "",
        about_me: ""
    })

    const { user } = useContext(AuthContext);

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