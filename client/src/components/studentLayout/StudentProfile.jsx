import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner
} from "react-bootstrap";

const API_BASE = "https://student-management-system-hla4.onrender.com";

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_BASE}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const user = res.data.user || res.data;

      setProfile(user);

      setFormData({
        name: user.name,
        email: user.email,
        contact: user.contact
      });

    } catch (err) {
      setError("Failed to fetch profile");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);

    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        contact: profile.contact
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedUser = res.data.user || res.data;

      setProfile(updatedUser);

      setSuccess("Profile updated successfully ✅");

      setIsEditing(false);

    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">

      <Row className="justify-content-center">

        <Col md={8} lg={6}>

          <Card className="shadow">

            <Card.Body>

              <h2 className="text-center mb-4 text-primary">
                My Profile
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {isEditing ? (

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success" className="w-100 mb-2">
                    Save Changes
                  </Button>

                  <Button variant="secondary" className="w-100" onClick={handleCancel}>
                    Cancel
                  </Button>

                </Form>

              ) : (

                profile && (

                  <>

                    <p><b>Name:</b> {profile.name}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    <p><b>Contact:</b> {profile.contact}</p>
                    <p><b>Role:</b> {profile.role}</p>

                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </Button>

                  </>

                )

              )}

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default Profile;
