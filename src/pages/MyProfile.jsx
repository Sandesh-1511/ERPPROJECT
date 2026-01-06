// src/pages/MyProfile.jsx
import React from "react";
import { Card, Badge, Row, Col, Container } from "react-bootstrap";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles?.[0]?.name || "User";

  // Role badge styling
  const getRoleVariant = () => {
    switch (role.toLowerCase()) {
      case "principal":
        return "primary";
      case "teacher":
        return "success";
      case "student":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <div>
        <h3 className="mb-4 text-dark fw-bold">My Profile</h3>

        <Card
          className="shadow-lg border-0 rounded-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
          }}
        >
          <Row className="g-0">
            <Col md={4} className="d-flex flex-column align-items-center justify-content-center p-4 bg-light">
              <div className="mb-3 position-relative">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-circle border border-3 border-white shadow-sm"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h5 className="text-dark mb-2 fw-semibold">{user?.name || "N/A"}</h5>
              <Badge
                bg={getRoleVariant()}
                className="text-uppercase px-3 py-2 fw-medium rounded-pill"
                style={{ fontSize: "0.85rem" }}
              >
                {role}
              </Badge>
            </Col>

            <Col md={8} className="p-4 d-flex flex-column">
              <div className="mb-3">
                <p className="mb-1">
                  <strong className="text-muted">Email:</strong>{" "}
                  <span className="text-dark">{user?.email || "N/A"}</span>
                </p>
                <p className="mb-1">
                  <strong className="text-muted">User ID:</strong>{" "}
                  <span className="text-dark">{user?.id || "N/A"}</span>
                </p>
              </div>

              {/* ROLE-BASED INFO */}
              {role === "principal" && (
                <div className="mt-auto">
                  <p className="mb-0">
                    <strong className="text-muted">Access Level:</strong>{" "}
                    <span className="text-primary">Full Academic Control</span>
                  </p>
                </div>
              )}

              {role === "teacher" && (
                <div className="mt-auto">
                  <p className="mb-0">
                    <strong className="text-muted">Designation:</strong>{" "}
                    <span className="text-success">Subject Teacher</span>
                  </p>
                </div>
              )}

              {role === "student" && (
                <div className="mt-auto">
                  <p className="mb-0">
                    <strong className="text-muted">Enrollment Status:</strong>{" "}
                    <span className="text-info">Active</span>
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default MyProfile;