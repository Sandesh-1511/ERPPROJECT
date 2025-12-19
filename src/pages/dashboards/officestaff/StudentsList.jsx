// src/pages/office/StudentsList.jsx
import React from "react";
import { Card, Table, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const students = [
    { id: 101, name: "Amit Sharma", roll: "B101", class: "B.Com - I", phone: "+91 98765 43210", status: "Active" },
    { id: 102, name: "Sneha Patil", roll: "BB201", class: "BBA - II", phone: "+91 87654 32109", status: "Active" },
    { id: 103, name: "Rahul Verma", roll: "BA101", class: "BA - I", phone: "+91 76543 21098", status: "Active" },
    { id: 104, name: "Neha Singh", roll: "B102", class: "B.Com - I", phone: "+91 65432 10987", status: "Inactive" },
  ];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>All Students</h3>
        <Button as={Link} to="/dashboard/office/students/new" variant="primary">
          + Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Control size="sm" placeholder="Search by name..." />
            </Col>
            <Col md={3}>
              <Form.Select size="sm">
                <option>All Classes</option>
                <option>BA - I</option>
                <option>B.Com - I</option>
                <option>BBA - II</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button size="sm" variant="outline-secondary">Filter</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Students Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.class}</td>
                  <td>{s.phone}</td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" as={Link} to={`/dashboard/office/students/${s.id}`}>
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

export default StudentsList;