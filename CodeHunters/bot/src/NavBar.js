import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <main>
      <Navbar bg="body-tertiary" expand="lg" className="flex-column">
        <div className="container-fluid">
          <Navbar.Brand as={NavLink} to="/get-started" className="nav-link">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto mt-3">
              <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/get-symptoms">
                  Get symptoms for Disease
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/predict-disease">
                  Predict disease from symptoms
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/schedular">
                  Schedule Planner
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </main>
  );
};

export default NavBar;