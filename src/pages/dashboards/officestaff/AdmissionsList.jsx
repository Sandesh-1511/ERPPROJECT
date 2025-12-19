// src/pages/office/AdmissionsList.jsx
import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdmissionsList = () => {
  const admissions = [
    { id: 201, name: "Amit Sharma", course: "B.Com", date: "2025-01-12", status: "Completed" },
    { id: 202, name: "Sneha Patil", course: "BBA", date: "2025-01-11", status: "Pending Docs" },
    { id: 203, name: "Rahul Verma", course: "BA", date: "2025-01-10", status: "Completed" },
    { id: 204, name: "Priya Desai", course: "B.Sc", date: "2025-01-09", status: "Rejected" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Admissions</h3>
        <Button as={Link} to="/office/admissions/new" variant="success">
          + New Admission
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>App. ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.course}</td>
                  <td>{a.date}</td>
                  <td>
                    <span className={`badge ${
                      a.status === 'Completed' ? 'bg-success' :
                      a.status === 'Pending Docs' ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" as={Link} to={`/office/admissions/${a.id}`}>
                      View
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

export default AdmissionsList;