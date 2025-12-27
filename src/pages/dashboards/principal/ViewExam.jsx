// src/pages/principal/ViewExam.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Alert, Badge, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaTag, FaInfoCircle, FaListAlt, FaArrowLeft } from "react-icons/fa";

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
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FaListAlt className="me-2" />
          Exam Details
        </h2>
        <Link to="/dashboard/principal/exams">
          <Button variant="outline-secondary">
            <FaArrowLeft className="me-1" /> Back to List
          </Button>
        </Link>
      </div>

      {/* Exam Card */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Exam Name & Code */}
          <div className="text-center mb-4">
            <h3 className="mb-2">{exam.name}</h3>
            <Badge bg="dark" className="px-3 py-2 fs-6">
              {exam.code}
            </Badge>
          </div>

          <Row>
            <Col md={6}>
              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-primary">
                  <FaTag size={20} />
                </div>
                <div>
                  <small className="text-muted">Exam Type</small>
                  <div>
                    <Badge bg={getTypeVariant(exam.type)} className="px-3 py-1">
                      {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-success">
                  <FaCalendarAlt size={20} />
                </div>
                <div>
                  <small className="text-muted">Academic Year</small>
                  <div className="fw-bold">{exam.academic_year}</div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-info">
                  <FaInfoCircle size={20} />
                </div>
                <div>
                  <small className="text-muted">Status</small>
                  <div>
                    <Badge bg={getStatusVariant(exam.status)} className="px-3 py-1">
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-warning">
                  <FaClock size={20} />
                </div>
                <div>
                  <small className="text-muted">Start Date</small>
                  <div className="fw-bold">{formatDate(exam.start_date)}</div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-danger">
                  <FaClock size={20} />
                </div>
                <div>
                  <small className="text-muted">End Date</small>
                  <div className="fw-bold">{formatDate(exam.end_date)}</div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div className="me-3 mt-1 text-muted">
                  <FaInfoCircle size={20} />
                </div>
                <div>
                  <small className="text-muted">Last Updated</small>
                  <div>{formatDateTime(exam.updated_at)}</div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Duration */}
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="mb-2">📅 Exam Duration</h6>
            <p className="mb-0">
              From <strong>{formatDate(exam.start_date)}</strong> to{" "}
              <strong>{formatDate(exam.end_date)}</strong> — Total{" "}
              <strong>
                {Math.ceil(
                  (new Date(exam.end_date) - new Date(exam.start_date)) / (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </strong>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewExam;