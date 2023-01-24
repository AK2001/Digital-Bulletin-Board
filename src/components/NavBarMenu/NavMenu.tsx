import './NavMenu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import {ImSearch} from 'react-icons/im';
import Button from 'react-bootstrap/Button'
import axios from "axios";

export default function NavMenu(props: { token: () => void; }) {

  async function logMeOut() {
    await axios({
      method: "POST",
      url:"/api/logout",
    })
        .then((response) => {
          props.token()
        }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })}

  return (
    <Navbar className="nav-menu fs-5 py-sm-3" collapseOnSelect expand="lg" fixed="top" variant="dark">
      <Container fluid>
        <Navbar.Brand id="nav-brand" href="/"><strong>Industrial Studies</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/*Nav links*/}
          <Nav className="me-auto">
            <Nav.Link id="nav-link" href="#browseTasks">Browse Tasks</Nav.Link>
            <Nav.Link id="nav-link" href="/about">About</Nav.Link>
          </Nav>

          {/*Nav search bar*/}
          <Nav className="">
            <Form className="nav-search-bar input-group">
              <Form.Control
                type="search"
                placeholder="Looking for a specific task?"
                aria-label="Looking for a specific task?"
                className="nav-search-bar-input rounded-pill bg-transparent border-0 fst-italic"
                aria-describedby="basic-addon1"
              />
              <span
                  className="input-group-text bg-transparent border-0 text-white fs-5"
                  id="basic-addon1">
                <ImSearch />
              </span>
            </Form>
          </Nav>

          {/*Signup/login buttons*/}
          <Nav className="ms-auto">
            {localStorage.getItem("token") !== null ?
                <Button
                    onClick={logMeOut}>
                  Logout
                </Button>
                :
                (<>
                      <Button
                          href = "/login"
                          className="login-btn">
                        Log in
                      </Button>

                      <Button
                          href = "/signup"
                          className="register-btn">
                        Sign Up!
                      </Button>
                    </>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
