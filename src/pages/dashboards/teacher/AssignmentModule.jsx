import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const AssignmentModule = () => {
  const assignments = [
    { title: "Unit Test 1", due: "12 Sep", status: "Pending" },
    { title: "Case Study", due: "18 Sep", status: "Submitted" },
  ];

  return (
    <>
    <h3 className="mb-4">Assignments Module</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h5>Assignments</h5>
            <Button size="sm">Create Assignment</Button>
          </div>

          <Table responsive>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i}>
                  <td>{a.title}</td>
                  <td>{a.due}</td>
                  <td>
                    <Badge
                      bg={a.status === "Submitted" ? "success" : "warning"}
                    >
                      {a.status}
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

export default AssignmentModule;
