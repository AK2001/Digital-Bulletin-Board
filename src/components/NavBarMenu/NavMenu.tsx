import './NavMenu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {MdOutlineAccountCircle} from 'react-icons/md';
import Button from 'react-bootstrap/Button'
import AuthContext from "../../helpers/AuthContextProvider"
import {useContext} from "react";

// NavMenu component serves as the navigation menu of the frontend.
export default function NavMenu() {

  // Takes both user variable and logout function as defined withing the AuthContext in AuthContextProvider.tsx
  // User -- is used to "check" whether the user has logged in the system and if so, displays the appropriated choices in the navbar
  // In reality, User holds information given for the user by the backend
  // Logout -- is used to log out the user from the system, i.e., delete the HTTP-only cookie that exists and relevant localStorage items (See AuthContextProvider.tsx for implementation)
  const { user, logout } = useContext(AuthContext);

  return (

    <Navbar className="nav-menu fs-5 py-sm-3" collapseOnSelect expand="lg" fixed="top" variant="dark">
      <Container fluid>
        <Navbar.Brand id="nav-brand" href="/"><strong>Industrial Studies</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {/*Nav links*/}
          <Nav className="me-auto">
            <Nav.Link id="nav-link" href="/browseTasks">Browse Tasks</Nav.Link>
            <Nav.Link id="nav-link" href="/about">About</Nav.Link>
          </Nav>

          {/*SignupPage/LoginPage/Logout/Account buttons*/}
          <Nav className="ms-auto button-group">
            {/*If a user has logged in the system then...*/}
            {user ?
                (<>

                  <a href="/profile" className="account-btn">
                    View Account
                    <span>
                      <MdOutlineAccountCircle className="ps-1 pb-1" size={25}/>
                    </span>
                  </a>

                  <Button
                      onClick={() => logout()}
                      className="logout-btn">
                    Logout
                  </Button>
                </>)
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
