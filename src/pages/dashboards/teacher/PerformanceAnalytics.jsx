import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

const PerformanceAnalytics = () => {
  return (
    <>
      <h3 className="mb-4">Performance Analytics</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5>Student Performance Overview</h5>
          <p className="text-muted">Average Marks</p>
          <ProgressBar now={78} label="78%" />
        </Card.Body>
      </Card>
    </>
  );
};

export default PerformanceAnalytics;
