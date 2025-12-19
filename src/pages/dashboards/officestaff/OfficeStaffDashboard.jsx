import React from "react";
import { Card, Row, Col, Table, Button, Badge } from "react-bootstrap";

const OfficeStaffDashboard = () => {
  // 🔹 Summary cards
  const stats = [
    { title: "Total Students", value: 1240, color: "primary" },
    { title: "New Admissions", value: 32, color: "success" },
    { title: "Pending Certificates", value: 18, color: "warning" },
    { title: "Today's Enquiries", value: 7, color: "info" },
  ];

  // 🔹 Recent admissions
  const admissions = [
    { name: "Amit Sharma", class: "B.Com - I", date: "2025-01-12" },
    { name: "Sneha Patil", class: "BBA - II", date: "2025-01-11" },
    { name: "Rahul Verma", class: "BA - I", date: "2025-01-10" },
  ];

  // 🔹 Pending certificate requests
  const certificates = [
    { student: "Neha Singh", type: "Bonafide", status: "Pending" },
    { student: "Rohit Mehta", type: "Transfer Certificate", status: "Pending" },
    { student: "Pooja Kulkarni", type: "Character Certificate", status: "Approved" },
  ];

  return (
    <div className="container-fluid px-0">
      <h3 className="mb-4">Office Staff Dashboard</h3>

      {/* ===== STATS CARDS ===== */}
      <Row className="mb-4">
        {stats.map((stat, i) => (
          <Col xl={3} md={6} sm={12} key={i} className="mb-3">
            <Card className={`border-${stat.color} shadow-sm h-100`}>
              <Card.Body>
                <h6 className="text-muted">{stat.title}</h6>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== QUICK ACTIONS ===== */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Quick Actions</h5>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="primary">Add Student</Button>
            <Button variant="success">New Admission</Button>
            <Button variant="warning">Generate Certificate</Button>
            <Button variant="info">View Enquiries</Button>
          </div>
        </Card.Body>
      </Card>

      {/* ===== TABLES ===== */}
      <Row>
        {/* Recent Admissions */}
        <Col lg={6} md={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Recent Admissions</h5>
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.class}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Certificate Requests */}
        <Col lg={6} md={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Certificate Requests</h5>
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>Student</th>
                    <th>Certificate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((item, i) => (
                    <tr key={i}>
                      <td>{item.student}</td>
                      <td>{item.type}</td>
                      <td>
                        <Badge bg={item.status === "Approved" ? "success" : "warning"}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OfficeStaffDashboard;
