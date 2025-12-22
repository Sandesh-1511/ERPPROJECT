// src/pages/accountant/SalaryManagement.jsx
import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const SalaryManagement = () => {
  const staff = [
    { id: 301, name: "Mr. Rajesh", role: "Teacher", salary: 45000, paid: true, month: "Dec 2025" },
    { id: 302, name: "Mrs. Sunita", role: "Librarian", salary: 30000, paid: true, month: "Dec 2025" },
    { id: 303, name: "Mr. Amit", role: "Office Staff", salary: 25000, paid: false, month: "Dec 2025" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Salary Management</h3>
        <Button variant="info">+ Generate Payslips</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Staff Name</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Month</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>₹{s.salary}</td>
                  <td>{s.month}</td>
                  <td>
                    <Badge bg={s.paid ? "success" : "danger"}>
                      {s.paid ? "Paid" : "Pending"}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm">View Slip</Button>
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

export default SalaryManagement;