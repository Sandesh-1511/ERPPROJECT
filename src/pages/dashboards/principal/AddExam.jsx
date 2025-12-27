// src/pages/principal/AddExam.jsx
import React, { useState } from "react";
import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const AddExam = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "internal",
    start_date: "",
    end_date: "",
    academic_year: "2024-25",
    status: "scheduled",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
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

  const validate = () => {
    if (!formData.name || !formData.code || !formData.start_date || !formData.end_date) {
      setError("All fields marked * are required.");
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
      const res = await safeFetchJSON(`${API_BASE}/api/exams`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        navigate("/principal/exams");
      } else {
        throw new Error(res.message || "Failed to create exam");
      }
    } catch (err) {
      console.error("Create Exam Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Link to="/dashboard/principal/exams" className="me-2">
          <Button variant="outline-secondary" size="sm">
            <FaArrowLeft /> Back
          </Button>
        </Link>
        <h2>Add New Exam</h2>
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
                    placeholder="e.g. Mid Term Exam"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Code *</Form.Label>
                  <Form.Control
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. MID2025"
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
                {submitting ? "Saving..." : "Create Exam"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddExam;