// src/pages/principal/EditStudent.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const API_DEFAULT = "https://serp.lemmecode.in/schoolerp  ";
const API_BASE = API_DEFAULT.trim();

const EditStudent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "male",
    mobile_number: "",
    email: "",
    program_id: "",
    academic_year: "FY",
    division_id: "",
    academic_session_id: "",
    admission_date: "",
    category: "general",
    student_status: "active",
  });
  const [programs, setPrograms] = useState([]);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
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
      throw new Error(
        `Expected JSON but received HTML. Status: ${
          res.status
        }. Preview: ${text.substring(0, 100)}...`
      );
    }
    return await res.json();
  };

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students/${id}`);
      if (res.success && res.data) {
        const student = res.data;
        setFormData({
          ...student,
          date_of_birth: student.date_of_birth ? student.date_of_birth.split("T")[0] : "",
          admission_date: student.admission_date ? student.admission_date.split("T")[0] : "",
          student_status: student.student_status || "active",
        });
      } else {
        throw new Error(res.message || "Failed to load student");
      }
    } catch (err) {
      console.error("Fetch Student Error:", err);
      setError(`Failed to load student: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    setProgramsLoading(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/programs`);
      if (res.success && Array.isArray(res.data)) {
        setPrograms(res.data);
      } else {
        throw new Error(res.message || "Failed to load programs");
      }
    } catch (err) {
      console.error("Fetch Programs Error:", err);
      setError(`Failed to load programs: ${err.message}`);
    } finally {
      setProgramsLoading(false);
    }
  };

  const fetchAcademicSessions = async () => {
    setSessionsLoading(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/academic-sessions`);
      if (res.success && Array.isArray(res.data)) {
        setAcademicSessions(res.data);
      } else {
        throw new Error(res.message || "Failed to load academic sessions");
      }
    } catch (err) {
      console.error("Fetch Academic Sessions Error:", err);
      setError(`Failed to load academic sessions: ${err.message}`);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchPrograms();
    fetchAcademicSessions();
  }, [id]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim()) errors.first_name = "First name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required";
    if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
    if (!formData.program_id) errors.program_id = "Program is required";
    if (!formData.division_id) errors.division_id = "Division is required";
    if (!formData.academic_session_id) errors.academic_session_id = "Academic session is required";
    if (!formData.admission_date) errors.admission_date = "Admission date is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        mobile_number: formData.mobile_number,
        email: formData.email,
        program_id: formData.program_id,
        academic_year: formData.academic_year,
        division_id: formData.division_id,
        academic_session_id: formData.academic_session_id,
        admission_date: formData.admission_date,
        category: formData.category,
        status: formData.student_status, // API expects 'status'
      };

      const response = await safeFetchJSON(`${API_BASE}/api/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        navigate("/dashboard/principal/students");
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setError(`Operation failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-100">
        <Card.Body>
          <Spinner animation="border" className="d-block mx-auto my-3" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="w-100">
      <Card.Body>
        <h5 className="mb-4">Edit Student</h5>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  value={formData.middle_name}
                  onChange={(e) =>
                    setFormData({ ...formData, middle_name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date_of_birth: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.mobile_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile_number: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Program *</Form.Label>
                <Form.Select
                  value={formData.program_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      program_id: Number(e.target.value),
                    })
                  }
                  required
                  disabled={programsLoading}
                >
                  <option value="">Select Program</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.short_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Division *</Form.Label>
                <Form.Select
                  value={formData.division_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      division_id: Number(e.target.value),
                    })
                  }
                  required
                >
                  <option value="">Select Division</option>
                  <option value={1}>A</option>
                  <option value={2}>B</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Academic Session *</Form.Label>
                <Form.Select
                  value={formData.academic_session_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      academic_session_id: Number(e.target.value),
                    })
                  }
                  required
                  disabled={sessionsLoading}
                >
                  <option value="">Select Session</option>
                  {academicSessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.session_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Admission Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.admission_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      admission_date: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Academic Year</Form.Label>
                <Form.Select
                  value={formData.academic_year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      academic_year: e.target.value,
                    })
                  }
                >
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.student_status}
              onChange={(e) =>
                setFormData({ ...formData, student_status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 flex-wrap mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? <Spinner size="sm" /> : "Update Student"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditStudent;