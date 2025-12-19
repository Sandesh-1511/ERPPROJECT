// src/pages/office/NoticesPage.jsx
import React from "react";
import { Card, Button, ListGroup, Form } from "react-bootstrap";

const NoticesPage = () => {
  const notices = [
    { id: 1, title: "PTM Schedule", date: "2025-01-12", audience: "Parents", content: "PTM will be held on Jan 15..." },
    { id: 2, title: "Exam Reschedule", date: "2025-01-10", audience: "Students", content: "Maths exam moved to Jan 20..." },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Notices</h3>
        <Button variant="primary">+ Create Notice</Button>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <ListGroup variant="flush">
                {notices.map((notice) => (
                  <ListGroup.Item key={notice.id}>
                    <div className="d-flex justify-content-between">
                      <strong>{notice.title}</strong>
                      <small className="text-muted">{notice.date}</small>
                    </div>
                    <div className="text-muted small mb-2">For: {notice.audience}</div>
                    <p className="mb-1">{notice.content}</p>
                    <div>
                      <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                      <Button variant="outline-danger" size="sm">Delete</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Create New Notice</h5>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Control size="sm" placeholder="Notice Title" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control as="textarea" rows={3} placeholder="Notice Content" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Select size="sm">
                    <option>Audience</option>
                    <option>Students</option>
                    <option>Parents</option>
                    <option>All</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" size="sm" className="mt-2">Post Notice</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NoticesPage;