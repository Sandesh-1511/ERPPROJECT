// src/pages/office/EnquiriesList.jsx
import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const EnquiriesList = () => {
  const enquiries = [
    { id: 301, name: "Mr. Mehta", course: "BBA", phone: "+91 98765 43210", date: "2025-01-12", status: "New" },
    { id: 302, name: "Mrs. Patil", course: "B.Com", phone: "+91 87654 32109", date: "2025-01-11", status: "Followed Up" },
    { id: 303, name: "Mr. Verma", course: "BA", phone: "+91 76543 21098", date: "2025-01-10", status: "Converted" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Enquiries</h3>
        <Button variant="info" disabled>
          + Add Enquiry (via Form)
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course Interested</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.course}</td>
                  <td>{e.phone}</td>
                  <td>{e.date}</td>
                  <td>
                    <Badge bg={
                      e.status === "New" ? "primary" :
                      e.status === "Followed Up" ? "warning" : "success"
                    }>
                      {e.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm">
                      Follow Up
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

export default EnquiriesList;
