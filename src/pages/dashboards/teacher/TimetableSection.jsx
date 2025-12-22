import React from "react";
import { Card, Table, Badge, Button } from "react-bootstrap";

const TimetableSection = () => {
  const timetable = [
    {
      time: "9–10",
      subject: "Accounting",
      class: "B.Com I",
      status: "Pending",
    },
    {
      time: "11–12",
      subject: "Statistics",
      class: "B.Com II",
      status: "Completed",
    },
  ];

  return (
    <>
      <h3 className="mb-4">Today's Timetable</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h5>Timetable Chart</h5>
            <Button size="sm" variant="outline-secondary">
              View Full
            </Button>
          </div>

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((t, i) => (
                <tr key={i}>
                  <td>{t.time}</td>
                  <td>{t.subject}</td>
                  <td>{t.class}</td>
                  <td>
                    <Badge
                      bg={t.status === "Completed" ? "success" : "warning"}
                    >
                      {t.status}
                    </Badge>
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

export default TimetableSection;
