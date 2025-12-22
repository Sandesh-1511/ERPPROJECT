// src/pages/accountant/Receipts.jsx
import React from "react";
import { Card, Table, Button } from "react-bootstrap";

const Receipts = () => {
  const receipts = [
    { id: "RCT-101", date: "2025-01-12", student: "Amit Sharma", amount: 5000, mode: "Cash" },
    { id: "RCT-102", date: "2025-01-12", student: "Sneha Patil", amount: 3500, mode: "Online" },
    { id: "RCT-103", date: "2025-01-15", student: "Rahul Verma", amount: 2000, mode: "Cheque" },
  ];

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Receipts</h3>
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Receipt No</th>
                <th>Date</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.student}</td>
                  <td>₹{r.amount}</td>
                  <td>{r.mode}</td>
                  <td>
                    <Button variant="outline-primary" size="sm">Print</Button>
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

export default Receipts;