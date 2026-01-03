// src/pages/principal/EditDepartment.jsx
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
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaBuilding, FaArrowLeft } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    hod_user_id: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

  const fetchDepartment = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/departments/${id}`);
      if (res.success && res.data) {
        setFormData({
          name: res.data.name,
          code: res.data.code,
          description: res.data.description,
          hod_user_id: res.data.hod_user_id || "",
          is_active: res.data.is_active,
        });
      } else {
        throw new Error(res.message || "Department not found");
      }
    } catch (err) {
      console.error("Fetch Department Error:", err);
      setError(`Failed to load department: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.code.trim()) errors.code = "Code is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/departments/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        navigate(`/dashboard/principal/departments/${id}`);
      } else {
        throw new Error(res.message || "Failed to update department");
      }
    } catch (err) {
      console.error("Update Department Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) fetchDepartment();
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
          <Link to="/dashboard/principal/departments">
            <Button variant="primary">← Back to Departments</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBuilding className="me-2" />
          Edit Department: {formData.name}
        </h2>
        <Link to={`/dashboard/principal/departments/${id}`}>
          <Button variant="outline-secondary">
            <FaArrowLeft className="me-1" /> Back to Detail
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
                  <Form.Label>Code *</Form.Label>
                  <Form.Control
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    isInvalid={!!formErrors.code}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.code}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>HOD User ID</Form.Label>
              <Form.Control
                type="number"
                value={formData.hod_user_id}
                onChange={(e) => setFormData({ ...formData, hod_user_id: e.target.value })}
              />
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
              <Button variant="danger" onClick={() => navigate(`/dashboard/principal/departments/${id}`)}>
                Cancel
              </Button>
              <Button style={{backgroundColor: "#04626a", border: "none"}} type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : "Update Department"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditDepartment;