// src/pages/office/CommunicationsLog.jsx
import React from "react";
import { Badge, Card, Table } from "react-bootstrap";

const CommunicationsLog = () => {
  const logs = [
    { id: 401, type: "SMS", recipients: "New Admissions (32)", message: "Welcome to ABC College...", sent: "2025-01-12 10:30 AM", status: "Delivered" },
    { id: 402, type: "Email", recipients: "All Students", message: "Exam Schedule Released", sent: "2025-01-11 09:00 AM", status: "Sent" },
    { id: 403, type: "SMS", recipients: "Parents (Class X)", message: "PTM on Jan 15", sent: "2025-01-10 11:15 AM", status: "Failed (2)" },
  ];

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">SMS / Email Log</h3>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Recipients</th>
                <th>Message Preview</th>
                <th>Sent At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>
                    <Badge bg={log.type === "SMS" ? "success" : "primary"}>
                      {log.type}
                    </Badge>
                  </td>
                  <td>{log.recipients}</td>
                  <td>{log.message.substring(0, 30)}...</td>
                  <td>{log.sent}</td>
                  <td>
                    <span className={log.status.includes("Failed") ? "text-danger" : "text-success"}>
                      {log.status}
                    </span>
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

export default CommunicationsLog;