// src/pages/principal/Academic.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const PrincipalAcademic = () => {
  // Mock data - replace with: GET /api/principal/academic
  const academicData = [
    { title: "Curriculum Updates", content: "New syllabus for Class 10 Science effective Jan 2026." },
    { title: "Teacher Training", content: "Workshop on Digital Teaching Tools scheduled for Dec 28." },
    { title: "Library Resources", content: "Added 50 new books in the Science section." },
  ];

  return (
    <>
      <h4 className="mb-4">Academic Management</h4>

      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            {academicData.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{item.title}</strong>
                <p className="mt-1 mb-0">{item.content}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default PrincipalAcademic;