import React from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";

const TeacherDashboard = () => {
  // 🔹 Mock summary data
  const stats = [
    { title: "My Classes", value: 5, color: "primary" },
    { title: "Total Students", value: 180, color: "success" },
    { title: "Subjects", value: 4, color: "warning" },
    { title: "Today's Lectures", value: 3, color: "info" },
  ];

  // 🔹 Mock timetable
  const todaySchedule = [
    {
      time: "09:00 - 10:00",
      subject: "Mathematics",
      className: "B.Com - I",
      room: "Room 101",
    },
    {
      time: "11:00 - 12:00",
      subject: "Statistics",
      className: "B.Com - II",
      room: "Room 204",
    },
    {
      time: "02:00 - 03:00",
      subject: "Business Economics",
      className: "BBA - I",
      room: "Room 305",
    },
  ];

  // 🔹 Mock tasks
  const tasks = [
    { task: "Submit attendance", status: "Pending" },
    { task: "Upload internal marks", status: "Completed" },
    { task: "Prepare unit test paper", status: "Pending" },
  ];

  return (
    <div className="container-fluid px-0 px-md-2">
      {/* ===== TITLE ===== */}
      <h3 className="mb-4 fw-bold text-center text-md-start">
        Teacher Dashboard
      </h3>

      {/* ===== STATS CARDS ===== */}
      <Row className="mb-4 g-3">
        {stats.map((stat, index) => (
          <Col
            key={index}
            xl={3}
            lg={4}
            md={6}
            sm={6}
            xs={12}
          >
            <Card
              className={`border-${stat.color} shadow-sm h-100`}
            >
              <Card.Body className="text-center text-md-start">
                <h6 className="text-muted">{stat.title}</h6>
                <h2 className={`text-${stat.color} fw-bold`}>
                  {stat.value}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== TODAY'S TIMETABLE ===== */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">Today's Schedule</h5>

          <Table
            responsive="sm"
            bordered
            hover
            className="mb-0 small"
          >
            <thead className="table-light">
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {todaySchedule.map((item, index) => (
                <tr key={index}>
                  <td>{item.time}</td>
                  <td>{item.subject}</td>
                  <td>{item.className}</td>
                  <td>{item.room}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* ===== TASKS & ANNOUNCEMENTS ===== */}
      <Row className="g-3">
        {/* Tasks */}
        <Col lg={6} md={12}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3 fw-semibold">My Tasks</h5>

              <Table
                bordered
                responsive="sm"
                className="mb-0 small"
              >
                <thead className="table-light">
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t, index) => (
                    <tr key={index}>
                      <td>{t.task}</td>
                      <td>
                        <Badge
                          bg={
                            t.status === "Completed"
                              ? "success"
                              : "warning"
                          }
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
        </Col>

        {/* Announcements */}
        <Col lg={6} md={12}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3 fw-semibold">Announcements</h5>

              <ul className="list-group list-group-flush small">
                <li className="list-group-item">
                  📢 Internal assessment submission deadline is Friday
                </li>
                <li className="list-group-item">
                  📢 Faculty meeting scheduled at 4 PM
                </li>
                <li className="list-group-item">
                  📢 Practical exams start next week
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
