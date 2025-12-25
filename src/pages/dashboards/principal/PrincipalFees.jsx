// src/pages/principal/Fees.jsx
import React from "react";
import { Table, Badge, Button } from "react-bootstrap";

const PrincipalFees = () => {
  // Mock data - replace with: GET /api/principal/fees
  const feeRecords = [
    { id: 1, studentName: "Aarav Singh", admissionNo: "ADM2025001", class: "10", amount: 5000, status: "Paid", dueDate: "2025-12-10" },
    { id: 2, studentName: "Priya Mehta", admissionNo: "ADM2025002", class: "9", amount: 4500, status: "Pending", dueDate: "2025-12-15" },
    { id: 3, studentName: "Rohan Desai", admissionNo: "ADM2025003", class: "11", amount: 5200, status: "Overdue", dueDate: "2025-12-05" },
  ];

  return (
    <>
      <h4 className="mb-4">Fee Management</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student</th>
            <th>Admission No</th>
            <th>Class</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.studentName}</td>
              <td>{record.admissionNo}</td>
              <td>{record.class}</td>
              <td>₹{record.amount}</td>
              <td>
                <Badge bg={
                  record.status === "Paid" ? "success" :
                  record.status === "Pending" ? "warning" :
                  "danger"
                }>
                  {record.status}
                </Badge>
              </td>
              <td>{record.dueDate}</td>
              <td>
                <Button variant="outline-primary" size="sm">View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
  
};

export default PrincipalFees;