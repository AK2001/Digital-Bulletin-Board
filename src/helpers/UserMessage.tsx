import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast';


function UserMessage() {

    const [show, setShow] = useState(true);

    const toggleShow = () => setShow(!show);

    const messengers = Array("Alex Kelaiditis", "Sotiris", "Alex Ntostoglou", "Spyros")

    const [messenger, setMessenger] = useState("");

    useEffect(() => {
        setMessenger(messengers[Math.floor(Math.random() * messengers.length)]);
    })

    return (
        <Toast show={show} onClose={toggleShow} bg={"info"} animation={true}>
            <Toast.Header>
                <svg width="20" height="20">
                    <rect rx="20" ry="20" width="20" height="20" style={{fill:"forestgreen",stroke:"forestgreen",strokeWidth:"5"}} />
                    Sorry, your browser does not support inline SVG.
                </svg>
                <strong className="me-auto ms-1">{messenger}</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Hey there! Thanks for taking the time to help your community <span role="img">😃</span></Toast.Body>
        </Toast>
    );
}

export default UserMessage;