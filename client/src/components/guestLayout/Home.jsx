import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <div style={heroStyle}>
        <div style={overlayStyle}>
          <Container>
            <h1 style={heroTitle}>
              Student <span style={{ color: "#ffc107" }}>Management System</span>
            </h1>

            <p style={heroText}>
              A complete solution to manage students, courses, and academics.
            </p>

            <div style={{ marginTop: "30px" }}>
              <Button
                as={NavLink}
                to="/register"
                variant="warning"
                size="lg"
                className="me-3"
              >
                Get Started
              </Button>

              <Button
                as={NavLink}
                to="/login"
                variant="outline-light"
                size="lg"
              >
                Login
              </Button>
            </div>
          </Container>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <Container style={{ marginTop: "60px", marginBottom: "60px" }}>
        <h2 className="text-center mb-5">Our Features</h2>

        <Row>
          <Col md={4} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <h4>📘 Student Records</h4>
                <p>
                  Easily manage student personal and academic information.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <h4>📚 Course Management</h4>
                <p>
                  Organize courses, subjects, and academic performance.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <h4>🔐 Secure Login</h4>
                <p>
                  Role-based authentication for students and administrators.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

/* ---------- STYLES ---------- */

const heroStyle = {
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')", // 📸 different image
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const overlayStyle = {
  minHeight: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "3rem",
  fontWeight: "bold",
};

const heroText = {
  fontSize: "1.2rem",
  marginTop: "10px",
};

const cardStyle = {
  textAlign: "center",
  padding: "25px",
  height: "100%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default Home;