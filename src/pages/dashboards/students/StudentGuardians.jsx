// src/components/StudentGuardians.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const guardians = [
  { name: "Rajesh Sharma", relation: "Father", phone: "9999999999" },
  { name: "Sunita Sharma", relation: "Mother", phone: "8888888888" },
];

const StudentGuardians = () => {
  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">Student Guardians</h4>

      <Row>
        {guardians.map((g, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-3">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h5>{g.name}</h5>
                <p><strong>Relation:</strong> {g.relation}</p>
                <p><strong>Phone:</strong> {g.phone}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentGuardians;
