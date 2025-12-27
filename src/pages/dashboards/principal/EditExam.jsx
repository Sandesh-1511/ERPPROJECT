// src/pages/principal/EditExam.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "internal",
    start_date: "",
    end_date: "",
    academic_year: "2024-25",
    status: "scheduled",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      throw new Error(`Expected JSON but received HTML. Status: ${res.status}`);
    }
    return await res.json();
  };

  const fetchExam = async () => {
    setLoading(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams/${id}`);
      if (res.success && res.data) {
        const e = res.data;
        setFormData({
          name: e.name,
          code: e.code,
          type: e.type,
          start_date: e.start_date.split("T")[0],
          end_date: e.end_date.split("T")[0],
          academic_year: e.academic_year,
          status: e.status,
        });
      } else {
        throw new Error("Exam not found");
      }
    } catch (err) {
      console.error("Fetch Exam Error:", err);
      setError(`Failed to load exam: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!formData.name || !formData.code || !formData.start_date || !formData.end_date) {
      setError("All required fields must be filled.");
      return false;
    }
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      setError("Start date must be before end date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        navigate("/dashboard/principal/exams");
      } else {
        throw new Error(res.message || "Update failed");
      }
    } catch (err) {
      console.error("Update Exam Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) fetchExam();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Link to="/dashboard/principal/exams" className="me-2">
          <Button variant="outline-secondary" size="sm">
            <FaArrowLeft /> Back
          </Button>
        </Link>
        <h2>Edit Exam</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Name *</Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Code *</Form.Label>
                  <Form.Control
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Type</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                    <option value="practical">Practical</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Academic Year *</Form.Label>
                  <Form.Select
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                  >
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => navigate("/dashboard/principal/exams")}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update Exam"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditExam;