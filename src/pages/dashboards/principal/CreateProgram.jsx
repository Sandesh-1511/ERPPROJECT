// src/pages/principal/CreateProgram.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaArrowLeft } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const CreateProgram = () => {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    code: "",
    department_id: "",
    duration_years: 3,
    total_semesters: 6,
    program_type: "undergraduate",
    is_active: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

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
      throw new Error(
        `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
      );
    }

    return await res.json();
  };

  const fetchDepartments = async () => {
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/departments`);
      if (res.success && Array.isArray(res.data)) {
        setDepartments(res.data);
      }
    } catch (err) {
      console.error("Fetch Departments Error:", err);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.short_name.trim()) errors.short_name = "Short name is required";
    if (!formData.code.trim()) errors.code = "Code is required";
    if (!formData.department_id) errors.department_id = "Department is required";
    if (!formData.duration_years) errors.duration_years = "Duration is required";
    if (!formData.total_semesters) errors.total_semesters = "Total semesters is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/programs`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        navigate(`/dashboard/principal/programs/${res.data.id}`);
      } else {
        throw new Error(res.message || "Failed to create program");
      }
    } catch (err) {
      console.error("Create Program Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBook className="me-2" />
          Create New Program
        </h2>
        <Link to="/dashboard/principal/departments">
          <Button variant="outline-secondary">
            <FaArrowLeft className="me-1" /> Back to List
          </Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Short Name *</Form.Label>
                  <Form.Control
                    value={formData.short_name}
                    onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                    isInvalid={!!formErrors.short_name}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.short_name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Code *</Form.Label>
                  <Form.Control
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    isInvalid={!!formErrors.code}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.code}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department *</Form.Label>
                  <Form.Select
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                    isInvalid={!!formErrors.department_id}
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{formErrors.department_id}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (Years) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.duration_years}
                    onChange={(e) => setFormData({ ...formData, duration_years: Number(e.target.value) })}
                    isInvalid={!!formErrors.duration_years}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.duration_years}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Semesters *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.total_semesters}
                    onChange={(e) => setFormData({ ...formData, total_semesters: Number(e.target.value) })}
                    isInvalid={!!formErrors.total_semesters}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.total_semesters}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Program Type</Form.Label>
              <Form.Select
                value={formData.program_type}
                onChange={(e) => setFormData({ ...formData, program_type: e.target.value })}
              >
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="is_active"
                label="Active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="danger" onClick={() => navigate("/dashboard/principal/programs")}>
                Cancel
              </Button>
              <Button style={{backgroundColor: "#04626a", border: "none"}} type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : "Create Program"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateProgram;