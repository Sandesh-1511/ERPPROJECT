// src/pages/principal/Exams.jsx
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";

const PrincipalExams = () => {
  // Mock data - replace with: GET /api/principal/exams
  const exams = [
    { id: 1, name: "Mid-Term Exam", class: "10", date: "2025-12-20", status: "Scheduled" },
    { id: 2, name: "Final Term Exam", class: "9", date: "2026-02-10", status: "Planned" },
    { id: 3, name: "Unit Test 1", class: "11", date: "2025-12-05", status: "Completed" },
  ];

  return (
    <>
      <h4 className="mb-4">Examination Management</h4>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Class</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.name}</td>
                  <td>{exam.class}</td>
                  <td>{exam.date}</td>
                  <td>
                    <Badge bg={
                      exam.status === "Scheduled" ? "info" :
                      exam.status === "Planned" ? "secondary" :
                      "success"
                    }>
                      {exam.status}
                    </Badge>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-info">View Schedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default PrincipalExams;