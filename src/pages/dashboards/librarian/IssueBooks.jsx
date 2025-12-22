// src/pages/librarian/IssueBooks.jsx
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";

const IssueBooks = () => {
  const issuedBooks = [
    {
      book: "Business Economics",
      issuedTo: "Amit Sharma",
      role: "Student",
      issueDate: "2025-01-10",
      returnDate: "2025-01-20",
      status: "Issued",
    },
    {
      book: "Financial Accounting",
      issuedTo: "Riya Patel",
      role: "Student",
      issueDate: "2025-01-05",
      returnDate: "2025-01-15",
      status: "Returned",
    },
  ];

  return (
    <div>
      <h4 className="mb-4">📖 Issued Books</h4>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>Book</th>
                <th>Issued To</th>
                <th>Role</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((item, i) => (
                <tr key={i}>
                  <td>{item.book}</td>
                  <td>{item.issuedTo}</td>
                  <td>{item.role}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.returnDate}</td>
                  <td>
                    <Badge bg={item.status === "Returned" ? "success" : "danger"}>
                      {item.status}
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

export default IssueBooks;
