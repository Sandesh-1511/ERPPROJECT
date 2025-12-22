// src/components/StudentList.jsx
import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const students = [
  { id: 1, name: "Amit Sharma", class: "10th", section: "A" },
  { id: 2, name: "Neha Verma", class: "9th", section: "B" },
  { id: 3, name: "Rahul Singh", class: "11th", section: "C" },
];

const StudentList = () => {
  return (
    <Container fluid className="p-4">
      <h4 className="mb-3">Student List</h4>

      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>
                  <Button size="sm" variant="primary">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default StudentList;
