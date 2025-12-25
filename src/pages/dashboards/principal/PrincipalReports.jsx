// src/pages/principal/Reports.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const PrincipalReports = () => {
  const downloadReport = (type) => {
    // TODO: Trigger API call to generate & download report
    alert(`Downloading ${type} report (mock)`);
  };

  return (
    <>
      <h4 className="mb-4">Reports</h4>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Student Performance Report</Card.Title>
          <Card.Text>Term-wise academic performance by class.</Card.Text>
          <Button variant="outline-primary" size="sm" onClick={() => downloadReport("Performance")}>
            Generate
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Attendance Summary</Card.Title>
          <Card.Text>Monthly attendance trends by class/section.</Card.Text>
          <Button variant="outline-primary" size="sm" onClick={() => downloadReport("Attendance")}>
            Generate
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Fee Collection Report</Card.Title>
          <Card.Text>Total fees collected vs pending.</Card.Text>
          <Button variant="outline-primary" size="sm" onClick={() => downloadReport("Fees")}>
            Generate
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default PrincipalReports;

