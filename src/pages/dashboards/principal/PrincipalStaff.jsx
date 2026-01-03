// src/pages/principal/Staff.jsx
import React from "react";
import { Table, Badge, Container } from "react-bootstrap";

const PrincipalStaff = () => {
  // Mock data - replace with: GET /api/principal/staff
  const staff = [
    { id: 1, name: "Dr. Anjali Gupta", role: "Math Teacher", email: "anjali@school.edu", status: "Active" },
    { id: 2, name: "Mr. Rajesh Verma", role: "Principal", email: "rajesh@school.edu", status: "Active" },
    { id: 3, name: "Mrs. Sunita Rao", role: "Science Teacher", email: "sunita@school.edu", status: "On Leave" },
  ];

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <h4 className="mb-4">Staff Directory</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td>
                <Badge bg={member.status === "Active" ? "success" : "warning"}>
                  {member.status}
                </Badge>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary">View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PrincipalStaff;