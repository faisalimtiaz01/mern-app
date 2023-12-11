import React from "react";
import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedoutInView from "./NavBarLoggedoutInView";
import { Link } from "react-router-dom";

interface navbarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoggeInClicked: () => void;
  onLoggedOutSucessfull: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoggeInClicked,
  onLoggedOutSucessfull,
}: navbarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Cool Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nabvar" />
        <Navbar.Collapse id="main-nabvar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLoggeoutSuccessful={onLoggedOutSucessfull}
              />
            ) : (
              <NavBarLoggedoutInView
                onLoginClicked={onLoggeInClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
