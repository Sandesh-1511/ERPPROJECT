// src/pages/principal/ViewExam.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Alert, Badge, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaTag, FaInfoCircle, FaListAlt, FaArrowLeft } from "react-icons/fa";

// ✅ CRITICAL FIX: Remove trailing spaces — otherwise returns Laravel HTML, not JSON
const API_BASE = "https://serp.lemmecode.in/schoolerp";

const ViewExam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
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
    if (!id) {
      setError("Invalid exam ID");
      setLoading(false);
      return;
    }

    const fetchExam = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await safeFetchJSON(`${API_BASE}/api/exams/${id}`);
        if (response.success && response.data) {
          setExam(response.data);
        } else {
          throw new Error(response.message || "Exam not found");
        }
      } catch (err) {
        console.error("Fetch Exam Error:", err);
        setError(`Failed to load exam: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  // Format date helper
  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge color
  const getStatusVariant = (status) => {
    switch (status) {
      case "scheduled": return "info";
      case "ongoing": return "warning";
      case "completed": return "success";
      default: return "secondary";
    }
  };

  // Type badge color
  const getTypeVariant = (type) => {
    switch (type) {
      case "internal": return "primary";
      case "external": return "success";
      case "practical": return "info";
      default: return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <FaInfoCircle className="me-2" />
          {error}
        </Alert>
        <div className="text-center">
          <Link to="/principal/exams">
            <Button variant="outline-primary">
              <FaArrowLeft className="me-1" /> Back to Exams
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  if (!exam) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-muted">Exam not found</h4>
        <Link to="/principal/exams">
          <Button variant="primary" className="mt-3">
            <FaArrowLeft className="me-1" /> Back to Exam List
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      {/* Responsive Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
        <h2 className="text-dark mb-0 fw-bold">Exam Details</h2>
        <Link to="/dashboard/principal/exams">
          <Button variant="outline-secondary" size="sm">
            ← Back to List
          </Button>
        </Link>
      </div>

      {/* Professional Card */}
      <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
        <Card.Body className="p-4">
          {/* Exam Name & Code */}
          <div className="text-center mb-4 pb-3 border-bottom">
            <h3 className="mb-2 fw-bold text-dark">{exam.name}</h3>
            <Badge bg="secondary" className="px-4 py-2 fs-6 rounded-pill">
              {exam.code}
            </Badge>
          </div>

          <Row className="g-4">
            <Col md={6}>
              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">Exam Type</h5>
                <div>
                  <Badge bg={getTypeVariant(exam.type)} className="px-3 py-1 rounded-pill">
                    {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">Academic Year</h5>
                <p className="fs-5 fw-medium mb-0">{exam.academic_year}</p>
              </div>

              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">Status</h5>
                <div>
                  <Badge bg={getStatusVariant(exam.status)} className="px-3 py-1 rounded-pill">
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">Start Date</h5>
                <p className="fs-5 fw-medium mb-0">{formatDate(exam.start_date)}</p>
              </div>

              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">End Date</h5>
                <p className="fs-5 fw-medium mb-0">{formatDate(exam.end_date)}</p>
              </div>

              <div className="mb-3">
                <h5 className="text-muted fw-normal mb-1">Last Updated</h5>
                <p className="text-muted mb-0">{formatDateTime(exam.updated_at)}</p>
              </div>
            </Col>
          </Row>

          {/* Duration Section */}
          <div className="mt-4 pt-3 border-top">
            <h6 className="text-muted mb-2 fw-medium">Exam Duration</h6>
            <p className="mb-0 text-muted">
              From <strong>{formatDate(exam.start_date)}</strong> to{" "}
              <strong>{formatDate(exam.end_date)}</strong> — Total{" "}
              <strong className="text-primary">
                {Math.ceil(
                  (new Date(exam.end_date) - new Date(exam.start_date)) / (1000 * 60 * 60 * 24)
                )} days
              </strong>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewExam;