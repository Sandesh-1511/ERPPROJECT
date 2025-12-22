import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const stats = [
  { title: "Subjects", value: 4, color: "primary" },
  { title: "Students", value: 180, color: "success" },
  { title: "Today's Classes", value: 3, color: "warning" },
  { title: "Pending Topics", value: 7, color: "danger" },
  { title: "Upcoming Exams", value: 2, color: "info" },
  { title: "Avg Performance", value: "78%", color: "secondary" },
];

const TeacherStats = () => {
  return (
    <>
      <h3 className="mb-4">Teacher Stats</h3>
      <Row className="mb-4">
        {stats.map((s, i) => (
          <Col md={4} lg={2} sm={6} xs={12} key={i} className="mb-3">
            <Card className={`border-${s.color} shadow-sm`}>
              <Card.Body className="text-center">
                <h6 className="text-muted">{s.title}</h6>
                <h4 className={`text-${s.color} fw-bold`}>{s.value}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TeacherStats;
