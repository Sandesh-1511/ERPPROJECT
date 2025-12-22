// src/pages/accountant/Invoices.jsx
import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const Invoices = () => {
  const invoices = [
    { id: "INV-101", date: "2025-01-12", to: "Amit Sharma", amount: 5000, status: "Paid" },
    { id: "INV-102", date: "2025-01-12", to: "Sneha Patil", amount: 3500, status: "Paid" },
    { id: "INV-103", date: "2025-01-15", to: "Rahul Verma", amount: 4500, status: "Unpaid" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Invoices</h3>
        <Button variant="success">+ Create Invoice</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Invoice No</th>
                <th>Date</th>
                <th>To</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.to}</td>
                  <td>₹{inv.amount}</td>
                  <td>
                    <Badge bg={inv.status === "Paid" ? "success" : "warning"}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-secondary" size="sm" className="me-2">View</Button>
                    <Button variant="outline-primary" size="sm">Download</Button>
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

export default Invoices;