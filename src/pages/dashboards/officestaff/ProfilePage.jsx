// src/pages/office/ProfilePage.jsx
import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">My Profile</h3>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div
                className="bg-light d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              >
                <span style={{ fontSize: "48px" }}>👤</span>
              </div>
              <div className="mt-2">
                <Button variant="outline-secondary" size="sm">Change Photo</Button>
              </div>
            </Col>

            <Col md={8}>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control defaultValue="Rajesh Kumar" />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control defaultValue="Office Staff" readOnly />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue="rajesh@college.edu" />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control defaultValue="+91 98765 43210" />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control defaultValue="Administration" />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control defaultValue="OFF-101" readOnly />
                  </Col>
                </Row>

                <Button variant="primary">Save Changes</Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;