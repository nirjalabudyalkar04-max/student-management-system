import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const GuestNavbar = () => {
  return (
    <>
      <style>
        {`
          .navbarStyle {
            background-color: #1c1c1c;
          }
          .brandStyle {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brandText {
            font-size: 22px;
            font-weight: bold;
            color: #ffffff;
          }
          .brandText span {
            color: #ffc107;
          }
          .navItemStyle {
            font-size: 18px;
            margin-left: 15px;
            transition: all 0.3s ease;
          }
          .navItemStyle:hover {
            color: #ffc107 !important;
            transform: scale(1.1);
          }
          .logoStyle {
            width: 45px;
            height: 45px;
            transition: transform 0.3s ease;
          }
          .logoStyle:hover {
            transform: scale(1.15);
          }
        `}
      </style>

      <Navbar expand="lg" variant="dark" className="navbarStyle">
        <Container>
          {/* LOGO + TITLE */}
          <Navbar.Brand as={NavLink} to="/home" className="brandStyle">
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/158/851/large_2x/school-graduation-logo-template-design-vector.jpg"   // ✅ student cap logo
              alt="Student Logo"
              className="logoStyle"
            />
            <div className="brandText">
              Student <span>Management System</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="guest-navbar" />
          <Navbar.Collapse id="guest-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home" className="navItemStyle">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="navItemStyle">
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" className="navItemStyle">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default GuestNavbar;