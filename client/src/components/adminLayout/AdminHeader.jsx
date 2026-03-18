import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin">
          Admin Panel
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/admin/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;