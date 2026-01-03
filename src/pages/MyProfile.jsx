import React from "react";
import { Card, Badge, Row, Col, Container } from "react-bootstrap";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles?.[0]?.name;

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <div>
        <h3 className="mb-4">My Profile</h3>

        <Card className="shadow-sm p-4">
          <Row>
            <Col md={4} className="text-center mb-3">
              <img
                src="https://via.placeholder.com/120"
                alt="Profile"
                className="rounded-circle mb-3"
              />
              <h5>{user?.name}</h5>
              <Badge bg="secondary" className="text-uppercase">
                {role}
              </Badge>
            </Col>

            <Col md={8}>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>

              {/* ROLE-BASED INFO */}
              {role === "principal" && (
                <p>
                  <strong>Access Level:</strong> Full Academic Control
                </p>
              )}

              {role === "teacher" && (
                <p>
                  <strong>Designation:</strong> Subject Teacher
                </p>
              )}

              {role === "student" && (
                <p>
                  <strong>Enrollment Status:</strong> Active
                </p>
              )}
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default MyProfile;
