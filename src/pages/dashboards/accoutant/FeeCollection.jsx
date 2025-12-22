// src/pages/accountant/FeeCollection.jsx
import React from "react";
import { Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeeCollection = () => {
  const students = [
    { id: 101, name: "Amit Sharma", class: "X B", roll: "101", totalFee: 12000, paid: 8000, due: 4000, status: "Partial" },
    { id: 102, name: "Sneha Patil", class: "IX A", roll: "102", totalFee: 10000, paid: 10000, due: 0, status: "Paid" },
    { id: 103, name: "Rahul Verma", class: "VIII C", roll: "103", totalFee: 9000, paid: 0, due: 9000, status: "Unpaid" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Fee Collection</h3>
        <Button variant="success">+ Record Payment</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Control size="sm" placeholder="Search student..." />
            </Col>
            <Col md={3}>
              <Form.Select size="sm">
                <option>All Classes</option>
                <option>VIII</option>
                <option>IX</option>
                <option>X</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button size="sm" variant="outline-secondary">Filter</Button>
            </Col>
          </Row>

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Total Fee</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.roll}</td>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>₹{s.totalFee}</td>
                  <td>₹{s.paid}</td>
                  <td className={s.due > 0 ? "text-danger" : ""}>₹{s.due}</td>
                  <td>
                    <Badge bg={
                      s.status === "Paid" ? "success" :
                      s.status === "Partial" ? "warning" : "danger"
                    }>
                      {s.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" as={Link} to={`/accountant/fees/${s.id}`}>
                      Record Payment
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeeCollection;