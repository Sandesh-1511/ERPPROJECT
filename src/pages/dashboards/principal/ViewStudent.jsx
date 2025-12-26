// src/pages/principal/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Row, Col, Spinner, Alert, Badge, Image, Button } from "react-bootstrap";
import { FaUser, FaPhone, FaEnvelope, FaCalendar, FaHome, FaUsers, FaIdCard } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await safeFetchJSON(`${API_BASE}/api/students/${id}`);
        if (res.success && res.data) {
          setStudent(res.data);
        } else {
          throw new Error(res.message || "Student not found");
        }
      } catch (err) {
        console.error("Fetch Student Error:", err);
        setError(`Failed to load student: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center">
          <Link to="/principal/students">
            <Button variant="primary">← Back to Students</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mt-5 text-center">
        <h4>Student not found</h4>
        <Link to="/principal/students">
          <Button variant="primary">← Back to Students</Button>
        </Link>
      </div>
    );
  }

  const fullName = [student.first_name, student.middle_name, student.last_name].filter(Boolean).join(" ");
  const dob = student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : "—";
  const admissionDate = student.admission_date ? new Date(student.admission_date).toLocaleDateString() : "—";

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Profile</h2>
        <Link to="/principal/students">
          <Button variant="outline-secondary">← Back to List</Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            {/* Profile Image */}
            <Col md={4} className="text-center mb-4 mb-md-0">
              <div className="position-relative d-inline-block">
                {student.photo_path ? (
                  <Image
                    src={`${API_BASE}${student.photo_path}`}
                    roundedCircle
                    width={150}
                    height={150}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
                    style={{ width: 150, height: 150 }}
                  >
                    <FaUser size={48} />
                  </div>
                )}
              </div>
              <h4 className="mt-3">{fullName}</h4>
              <Badge bg={student.student_status === "active" ? "success" : "secondary"} className="mt-2">
                {student.student_status}
              </Badge>
            </Col>

            {/* Details */}
            <Col md={8}>
              <Row>
                <Col sm={6} className="mb-3">
                  <strong>Admission No:</strong> {student.admission_number || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Roll No:</strong> {student.roll_number || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Class:</strong>{" "}
                  {student.program?.name && student.division?.division_name
                    ? `${student.program.name} - ${student.division.division_name}`
                    : "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Academic Year:</strong> {student.academic_year || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Gender:</strong> {student.gender || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Category:</strong> {student.category || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Date of Birth:</strong> {dob}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Admission Date:</strong> {admissionDate}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Email:</strong> {student.email || "—"}
                </Col>
                <Col sm={6} className="mb-3">
                  <strong>Mobile:</strong> {student.mobile_number || "—"}
                </Col>
                <Col sm={12} className="mb-3">
                  <strong>Current Address:</strong> {student.current_address || student.permanent_address || "—"}
                </Col>
              </Row>
            </Col>
          </Row>

          <hr className="my-4" />

          {/* Guardians */}
          <h5 className="mb-3">
            <FaUsers className="me-2" />
            Guardians
          </h5>
          {student.guardians && student.guardians.length > 0 ? (
            <Row>
              {student.guardians.map((g) => (
                <Col md={6} key={g.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <strong>{g.first_name} {g.last_name}</strong> ({g.relation})<br />
                      <FaPhone className="me-1" /> {g.mobile_number || "—"}<br />
                      <FaEnvelope className="me-1" /> {g.email || "—"}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted">No guardians assigned.</p>
          )}

          {/* Program Info */}
          <hr className="my-4" />
          <h5 className="mb-3">
            <FaIdCard className="me-2" />
            Program Details
          </h5>
          <Row>
            <Col sm={6} className="mb-3">
              <strong>Program:</strong> {student.program?.name || "—"}
            </Col>
            <Col sm={6} className="mb-3">
              <strong>Session:</strong> {student.academic_session?.session_name || "—"}
            </Col>
            <Col sm={6} className="mb-3">
              <strong>Duration:</strong> {student.program?.duration_years || "—"} years
            </Col>
            <Col sm={6} className="mb-3">
              <strong>University Code:</strong> {student.program?.university_program_code || "—"}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewStudent;