// src/pages/principal/PrincipalDeptsAndPrograms.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBuilding, FaBook, FaUsers, FaGraduationCap } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const PrincipalDeptsAndPrograms = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalDepartments: 0,
    activePrograms: 0,
    totalFaculty: 45, // Placeholder — replace with real API if available
    enrolledStudents: 1234, // Placeholder — replace with real API if available
  });
  const [departments, setDepartments] = useState([]);

  const token = localStorage.getItem("token");

  const safeFetchJSON = async (url, options = {}) => {
    const res = await fetch(url.trim(), {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
      );
    }

    return await res.json();
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch departments
      const deptRes = await safeFetchJSON(`${API_BASE}/api/departments`);
      if (deptRes.success && Array.isArray(deptRes.data)) {
        setDepartments(deptRes.data);
        setStats((prev) => ({ ...prev, totalDepartments: deptRes.data.length }));
      }

      // Fetch programs
      const progRes = await safeFetchJSON(`${API_BASE}/api/programs`);
      if (progRes.success && Array.isArray(progRes.data)) {
        setStats((prev) => ({ ...prev, activePrograms: progRes.data.length }));
      }
    } catch (err) {
      console.error("Dashboard Data Error:", err);
      setError(`Failed to load dashboard: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 ">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Departments & Programs</h2>
        <Link to="/dashboard/principal/departments/new">
          <Button variant="primary">+ Add Department</Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Form.Control
        placeholder="Search departments..."
        className="mb-4"
        // TODO: Implement search filter
      />

      {/* Stats Cards */}
      <Row xs={1} md={2} lg={4} className="g-4 mb-4">
        <Col>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                <FaBuilding className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="mb-0">{stats.totalDepartments}</h4>
                <small>Total Departments</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3 p-2 bg-info bg-opacity-10 rounded-circle">
                <FaBook className="text-info" size={24} />
              </div>
              <div>
                <h4 className="mb-0">{stats.activePrograms}</h4>
                <small>Active Programs</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3 p-2 bg-success bg-opacity-10 rounded-circle">
                <FaUsers className="text-success" size={24} />
              </div>
              <div>
                <h4 className="mb-0">{stats.totalFaculty}</h4>
                <small>Total Faculty</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
                <FaGraduationCap className="text-warning" size={24} />
              </div>
              <div>
                <h4 className="mb-0">{stats.enrolledStudents}</h4>
                <small>Enrolled Students</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* All Departments */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Departments</h5>
          <Link to="/dashboard/principal/programs/new">
            <Button variant="outline-secondary" size="sm">+ Add Program</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {departments.map((dept) => (
            <div key={dept.id} className="mb-4 pb-4 border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-0">
                    <Link to={`/dashboard/principal/departments/${dept.id}`}>
                      {dept.name}
                    </Link>
                  </h6>
                  <small className="text-muted">
                    Code: {dept.code} | HOD: {dept.hod_user_id ? "Assigned" : "Not Assigned"}
                  </small>
                </div>
                <div>
                  <Link to={`/dashboard/principal/departments/${dept.id}`}>
                    <Button size="sm" variant="outline-primary" className="me-2">
                      View
                    </Button>
                  </Link>
                  <Link to={`/dashboard/principal/departments/edit/${dept.id}`}>
                    <Button size="sm" variant="outline-warning" className="me-2">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>

              {dept.programs && dept.programs.length > 0 ? (
                <Row className="g-3">
                  {dept.programs.map((prog) => (
                    <Col md={4} key={prog.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <h6 className="mb-1">{prog.name}</h6>
                          <small className="text-muted">
                            Code: {prog.code} | Duration: {prog.duration_years} Years | Semesters: {prog.total_semesters}
                          </small>
                          <div className="mt-2">
                            <span className={`badge me-2 ${prog.program_type === 'undergraduate' ? 'bg-success' : 'bg-warning'}`}>
                              {prog.program_type.charAt(0).toUpperCase() + prog.program_type.slice(1)}
                            </span>
                            <span className="badge bg-info">Active</span>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            <Link to={`/dashboard/principal/programs/${prog.id}`}>
                              <Button size="sm" variant="outline-primary">View</Button>
                            </Link>
                            <Link to={`/dashboard/principal/programs/edit/${prog.id}`}>
                              <Button size="sm" variant="outline-warning">Edit</Button>
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted">No programs assigned.</p>
              )}
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrincipalDeptsAndPrograms;