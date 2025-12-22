// src/pages/librarian/Books.jsx
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";

const Books = () => {
  const books = [
    { id: 1, title: "Data Structures", author: "Mark Allen", category: "CS", status: "Available" },
    { id: 2, title: "Business Economics", author: "P. Samuelson", category: "Commerce", status: "Issued" },
    { id: 3, title: "Operating Systems", author: "Silberschatz", category: "CS", status: "Available" },
    { id: 4, title: "Financial Accounting", author: "Tulsian", category: "Accounts", status: "Issued" },
  ];

  return (
    <div>
      <h4 className="mb-4">📚 Books Inventory</h4>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover bordered>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>
                    <Badge bg={b.status === "Available" ? "success" : "warning"}>
                      {b.status}
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

export default Books;
