// src/pages/accountant/DueReminders.jsx
import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const DueReminders = () => {
  const dues = [
    { id: 101, student: "Rahul Verma", class: "X B", due: 4500, date: "2025-01-20", status: "Pending" },
    { id: 102, student: "Neha Singh", class: "IX A", due: 3200, date: "2025-01-22", status: "Pending" },
    { id: 103, student: "Priya Desai", class: "VIII C", due: 2800, date: "2025-01-25", status: "Reminded" },
  ];

  const sendReminder = (id) => {
    alert(`Reminder sent to student #${id}`);
  };

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Due Reminders</h3>
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Class</th>
                <th>Due Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dues.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.student}</td>
                  <td>{d.class}</td>
                  <td className="text-danger">₹{d.due}</td>
                  <td>{d.date}</td>
                  <td>
                    <Badge bg={d.status === "Reminded" ? "success" : "warning"}>
                      {d.status}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant={d.status === "Reminded" ? "outline-secondary" : "warning"} 
                      size="sm"
                      onClick={() => sendReminder(d.id)}
                      disabled={d.status === "Reminded"}
                    >
                      {d.status === "Reminded" ? "Reminded" : "Send Reminder"}
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

export default DueReminders;