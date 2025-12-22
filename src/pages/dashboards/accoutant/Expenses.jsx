// src/pages/accountant/Expenses.jsx
import React from "react";
import { Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";

const Expenses = () => {
  const expenses = [
    { id: 201, date: "2025-01-12", category: "Electricity", vendor: "Power Co.", amount: 2500, status: "Paid" },
    { id: 202, date: "2025-01-11", category: "Stationery", vendor: "Office Supplies", amount: 800, status: "Paid" },
    { id: 203, date: "2025-01-15", category: "Maintenance", vendor: "ABC Services", amount: 5000, status: "Pending" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Expenses</h3>
        <Button variant="primary">+ Add Expense</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Control size="sm" placeholder="Search vendor..." />
            </Col>
            <Col md={3}>
              <Form.Select size="sm">
                <option>All Categories</option>
                <option>Electricity</option>
                <option>Stationery</option>
                <option>Maintenance</option>
              </Form.Select>
            </Col>
          </Row>

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.date}</td>
                  <td>{e.category}</td>
                  <td>{e.vendor}</td>
                  <td>₹{e.amount}</td>
                  <td>
                    <Badge bg={e.status === "Paid" ? "success" : "warning"}>
                      {e.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-secondary" size="sm">View</Button>
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

export default Expenses;