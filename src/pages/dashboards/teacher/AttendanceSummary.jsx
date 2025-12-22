import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const AttendanceSummary = () => {
  return (
    <> 
      <h3 className="mb-4">Attendance Summary</h3>
      <Row className="mb-4">
        <Col md={6} xs={12} className="mb-3">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h6>Average Student Attendance</h6>
              <h3 className="text-success">86%</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xs={12}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h6>Your Attendance</h6>
              <h3 className="text-primary">92%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AttendanceSummary;
