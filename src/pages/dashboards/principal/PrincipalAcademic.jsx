// src/pages/principal/Academic.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Badge,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const PrincipalAcademic = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const safeFetch = async (url, options = {}) => {
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

  // Fetch all academic sessions
  const fetchSessions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await safeFetch(`${API_BASE}/api/academic-sessions`);
      if (res.success && Array.isArray(res.data)) {
        // Sort by session_name descending (e.g., 2026-27 first)
        const sorted = res.data.sort((a, b) =>
          b.session_name.localeCompare(a.session_name)
        );
        setSessions(sorted);
      } else {
        throw new Error(res.message || "Failed to load academic sessions");
      }
    } catch (err) {
      console.error("Fetch sessions error:", err);
      setError(`Failed to load sessions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleShowAdd = () => {
    setEditMode(false);
    setFormData({
      name: "",
      start_date: "",
      end_date: "",
      is_active: true,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleShowEdit = (session) => {
    setEditMode(true);
    setCurrentSession(session);
    setFormData({
      name: session.session_name,
      start_date: session.start_date.split("T")[0],
      end_date: session.end_date.split("T")[0],
      is_active: session.is_active,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Session name is required";
    if (!formData.start_date) errors.start_date = "Start date is required";
    if (!formData.end_date) errors.end_date = "End date is required";
    if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
      errors.end_date = "End date must be after start date";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active,
      };

      let res;
      if (editMode) {
        res = await safeFetch(`${API_BASE}/api/academic-sessions/${currentSession.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        res = await safeFetch(`${API_BASE}/api/academic-sessions`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (res.success) {
        setShowModal(false);
        fetchSessions(); // Refresh list
      } else {
        throw new Error(res.message || "Operation failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(`Operation failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete academic session "${name}"?`)) return;

    try {
      const res = await safeFetch(`${API_BASE}/api/academic-sessions/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        fetchSessions();
      } else {
        throw new Error(res.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(`Failed to delete session: ${err.message}`);
    }
  };

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Academic Sessions</h4>
        <Button style={{backgroundColor: "#04626a", border: "none"}} onClick={handleShowAdd}>
          + Add Session
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Card>
          <Card.Body>
            {sessions.length === 0 ? (
              <p className="text-center text-muted">No academic sessions found.</p>
            ) : (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Session Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Current</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td>{s.session_name}</td>
                      <td>{new Date(s.start_date).toLocaleDateString()}</td>
                      <td>{new Date(s.end_date).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={s.is_active ? "success" : "secondary"}>
                          {s.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        {s.is_current ? (
                          <Badge bg="info">Current</Badge>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="text-center">
                        <Button
                          style={{backgroundColor: "#04626a", border: "none"}}
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowEdit(s)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(s.id, s.session_name)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Academic Session" : "Add New Academic Session"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Session Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 2025-26"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    isInvalid={!!formErrors.start_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    isInvalid={!!formErrors.end_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is_active"
                label="Active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button style={{backgroundColor: "#04626a", border: "none"}} type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : editMode ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PrincipalAcademic;