// src/pages/librarian/Reports.jsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Reports = () => {
  const stats = [
    { title: "Total Books", value: 1240 },
    { title: "Books Issued", value: 320 },
    { title: "Overdue Books", value: 18 },
    { title: "Active Members", value: 560 },
  ];

  return (
    <div>
      <h4 className="mb-4">📊 Library Reports</h4>

      <Row>
        {stats.map((s, i) => (
          <Col md={3} sm={6} xs={12} key={i} className="mb-3">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h6 className="text-muted">{s.title}</h6>
                <h3 className="text-primary">{s.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reports;
