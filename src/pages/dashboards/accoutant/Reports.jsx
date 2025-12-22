// src/pages/accountant/Reports.jsx
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const Reports = () => {
  const reports = [
    { title: "Fee Collection Report", desc: "Monthly fee summary" },
    { title: "Expense Report", desc: "Category-wise spending" },
    { title: "Salary Report", desc: "Staff payment history" },
    { title: "Dues Report", desc: "List of defaulters" },
    { title: "Income vs Expense", desc: "Financial comparison" },
  ];

  const generateReport = (title) => {
    alert(`Generating ${title}... (In real app: PDF/Excel)`);
  };

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Reports</h3>
      <Row>
        {reports.map((report, i) => (
          <Col md={6} lg={4} key={i} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{report.title}</Card.Title>
                <Card.Text className="text-muted">{report.desc}</Card.Text>
                <Button variant="outline-primary" size="sm" onClick={() => generateReport(report.title)}>
                  Generate
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reports;