import React from "react";
import { Card, Table } from "react-bootstrap";

const LibrarianDashboard = () => {
  // ✅ MOCK DATA (later comes from API)
  const stats = [
    { title: "Total Books", value: 1240 },
    { title: "Issued Books", value: 320 },
    { title: "Available Books", value: 880 },
    { title: "Overdue Books", value: 40 },
  ];

  const recentIssues = [
    {
      id: 1,
      student: "Amit Kumar",
      book: "Database Systems",
      issueDate: "2025-01-10",
      status: "Issued",
    },
    {
      id: 2,
      student: "Neha Sharma",
      book: "Operating Systems",
      issueDate: "2025-01-08",
      status: "Overdue",
    },
  ];

  return (
    <>
      <h3 className="mb-4">📚 Librarian Dashboard</h3>

      {/* STAT CARDS */}
      <div className="row g-3 mb-4">
        {stats.map((item, i) => (
          <div key={i} className="col-md-3 col-sm-6">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h6 className="text-muted">{item.title}</h6>
                <h3 className="fw-bold">{item.value}</h3>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3">Recent Book Issues</h5>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.student}</td>
                  <td>{row.book}</td>
                  <td>{row.issueDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        row.status === "Overdue"
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    >
                      {row.status}
                    </span>
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

export default LibrarianDashboard;
