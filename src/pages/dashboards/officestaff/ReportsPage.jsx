// src/pages/office/ReportsPage.jsx
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ReportsPage = () => {
  const reportTypes = [
    { title: "Student List", desc: "Export all student records" },
    { title: "Admission Summary", desc: "Monthly admission stats" },
    { title: "Certificate Log", desc: "Issued certificates (30 days)" },
    { title: "Fee Defaulters", desc: "Students with pending fees" },
    { title: "Enquiry Conversion", desc: "Enquiry to admission ratio" },
  ];

  const generateReport = (title) => {
    alert(`Generating ${title} report... (In real app: PDF/Excel download)`);
  };

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Reports</h3>

      <Row>
        {reportTypes.map((report, i) => (
          <Col md={6} lg={4} key={i} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{report.title}</Card.Title>
                <Card.Text className="text-muted">{report.desc}</Card.Text>
                <Button variant="outline-primary" size="sm" onClick={() => generateReport(report.title)}>
                  Generate Report
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ReportsPage;