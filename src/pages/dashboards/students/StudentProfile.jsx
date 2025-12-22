// src/components/StudentProfile.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const StudentProfile = () => {
  const student = {
    name: "Amit Sharma",
    class: "10th",
    section: "A",
    email: "amit@gmail.com",
    phone: "9876543210",
  };

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">Student Profile</h4>

      <Row>
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">{student.name}</h5>
              <p><strong>Class:</strong> {student.class}</p>
              <p><strong>Section:</strong> {student.section}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;
