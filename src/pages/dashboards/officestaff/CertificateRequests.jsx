// src/pages/office/CertificateRequests.jsx
import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const CertificateRequests = () => {
  const requests = [
    { id: 501, student: "Neha Singh", type: "Bonafide", requested: "2025-01-12", status: "Pending" },
    { id: 502, student: "Rohit Mehta", type: "Transfer Certificate", requested: "2025-01-11", status: "Pending" },
    { id: 503, student: "Pooja Kulkarni", type: "Character Certificate", requested: "2025-01-10", status: "Approved" },
    { id: 504, student: "Amit Sharma", type: "Migration Certificate", requested: "2025-01-09", status: "Rejected" },
  ];

  const handleApprove = (id) => {
    alert(`Approved request #${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected request #${id}`);
  };

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Certificate Requests</h3>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Req. ID</th>
                <th>Student</th>
                <th>Certificate Type</th>
                <th>Requested On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.student}</td>
                  <td>{req.type}</td>
                  <td>{req.requested}</td>
                  <td>
                    <Badge bg={
                      req.status === "Approved" ? "success" :
                      req.status === "Rejected" ? "danger" : "warning"
                    }>
                      {req.status}
                    </Badge>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(req.id)}>
                          Approve
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(req.id)}>
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline-secondary" size="sm" disabled>
                        {req.status}
                      </Button>
                    )}
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

export default CertificateRequests;