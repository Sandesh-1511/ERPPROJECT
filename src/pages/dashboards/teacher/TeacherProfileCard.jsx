import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";

const TeacherProfileCard = () => {
  const teacher = {
    name: "Dr. Anjali Sharma",
    empId: "EMP1023",
    department: "Commerce",
    designation: "Senior Lecturer",
    subjects: ["Accounting", "Business Studies"],
    classes: ["B.Com I", "B.Com II"],
  };

  return (
    <>
    <h3 className="mb-4">My Profile</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} sm={3} xs={12} className="text-center mb-3">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="rounded-circle img-fluid"
              />
            </Col>

            <Col md={7} sm={9} xs={12}>
              <h5>{teacher.name}</h5>
              <p className="mb-1 text-muted">
                {teacher.designation} | {teacher.department}
              </p>
              <Badge bg="secondary" className="me-2">
                ID: {teacher.empId}
              </Badge>

              <div className="mt-2">
                {teacher.subjects.map((s, i) => (
                  <Badge bg="info" key={i} className="me-2">
                    {s}
                  </Badge>
                ))}
              </div>
            </Col>

            <Col md={3} xs={12} className="text-md-end mt-3 mt-md-0">
              <Button size="sm" variant="outline-primary">
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default TeacherProfileCard;
