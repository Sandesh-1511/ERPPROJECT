// src/pages/librarian/Members.jsx
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";

const Members = () => {
  const members = [
    { name: "Amit Sharma", role: "Student", department: "B.Com", active: true },
    { name: "Riya Patel", role: "Student", department: "BBA", active: true },
    { name: "Dr. Mehta", role: "Teacher", department: "Commerce", active: false },
  ];

  return (
    <div>
      <h4 className="mb-4">👥 Library Members</h4>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.department}</td>
                  <td>
                    <Badge bg={m.active ? "success" : "secondary"}>
                      {m.active ? "Active" : "Inactive"}
                    </Badge>
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

export default Members;
