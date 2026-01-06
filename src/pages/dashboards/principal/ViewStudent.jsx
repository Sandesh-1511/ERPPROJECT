// src/pages/principal/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Image,
  Button,
  Modal,
  Form,
  Container,
} from "react-bootstrap";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaHome,
  FaUsers,
  FaIdCard,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Guardian CRUD states
  const [guardians, setGuardians] = useState([]);
  const [guardianLoading, setGuardianLoading] = useState(false);
  const [guardianError, setGuardianError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingGuardian, setEditingGuardian] = useState(null);
  const [formData, setFormData] = useState({
    guardian_type: "",
    full_name: "",
    occupation: "",
    annual_income: "",
    mobile_number: "",
    email: "",
    relation: "",
    address: "",
    is_primary_contact: false,
  });

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
        `Expected JSON but received HTML. Status: ${
          res.status
        }. Preview: ${text.substring(0, 100)}...`
      );
    }

    return await res.json();
  };

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await safeFetch(`${API_BASE}/api/students/${id}`);
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

  useEffect(() => {
    if (student) {
      fetchGuardians();
    }
  }, [student]);

  const fetchGuardians = async () => {
    setGuardianLoading(true);
    setGuardianError("");
    try {
      const res = await safeFetch(`${API_BASE}/api/students/${id}/guardians`);
      if (res.success && Array.isArray(res.data)) {
        setGuardians(res.data);
      } else {
        throw new Error(res.message || "Failed to load guardians");
      }
    } catch (err) {
      console.error("Fetch Guardians Error:", err);
      setGuardianError(`Failed to load guardians: ${err.message}`);
    } finally {
      setGuardianLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingGuardian(null);
    setFormData({
      guardian_type: "",
      full_name: "",
      occupation: "",
      annual_income: "",
      mobile_number: "",
      email: "",
      relation: "",
      address: "",
      is_primary_contact: false,
    });
    setShowModal(true);
  };

  const openEditModal = (guardian) => {
    setModalMode("edit");
    setEditingGuardian(guardian);
    setFormData({
      guardian_type: guardian.guardian_type || "",
      full_name: guardian.full_name || "",
      occupation: guardian.occupation || "",
      annual_income: guardian.annual_income || "",
      mobile_number: guardian.mobile_number || "",
      email: guardian.email || "",
      relation: guardian.relation || "",
      address: guardian.address || "",
      is_primary_contact: guardian.is_primary_contact || false,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardianError("");
    try {
      let res;
      if (modalMode === "add") {
        res = await safeFetch(`${API_BASE}/api/students/${id}/guardians`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
      } else {
        const updateData = { ...formData };
        delete updateData.guardian_type;
        res = await safeFetch(
          `${API_BASE}/api/students/${id}/guardians/${editingGuardian.id}`,
          {
            method: "PUT",
            body: JSON.stringify(updateData),
          }
        );
      }

      if (res.success) {
        fetchGuardians();
        setShowModal(false);
      } else {
        throw new Error(res.message || "Operation failed");
      }
    } catch (err) {
      console.error("Guardian CRUD Error:", err);
      setGuardianError(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (guardianId) => {
    if (!window.confirm("Are you sure you want to delete this guardian?"))
      return;
    try {
      const res = await safeFetch(
        `${API_BASE}/api/students/${id}/guardians/${guardianId}`,
        {
          method: "DELETE",
        }
      );
      if (res.success) {
        fetchGuardians();
      } else {
        throw new Error(res.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Guardian Error:", err);
      setGuardianError(`Delete failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="rounded-3">
          {error}
        </Alert>
        <div className="text-center mt-3">
          <Link to="/dashboard/principal/students">
            <Button
              variant="outline-secondary"
              className="px-4 py-2 rounded-pill"
            >
              ← Back to Students
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-muted">Student not found</h4>
        <Link to="/dashboard/principal/students">
          <Button
            variant="outline-secondary"
            className="mt-3 px-4 py-2 rounded-pill"
          >
            ← Back to Students
          </Button>
        </Link>
      </Container>
    );
  }

  const fullName = [student.first_name, student.middle_name, student.last_name]
    .filter(Boolean)
    .join(" ");
  const dob = student.date_of_birth
    ? new Date(student.date_of_birth).toLocaleDateString()
    : "—";
  const admissionDate = student.admission_date
    ? new Date(student.admission_date).toLocaleDateString()
    : "—";

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
        <h2 className="text-dark fw-bold">Student Profile</h2>
        <Link to="/dashboard/principal/students">
          <Button
            variant="outline-secondary"
            className="px-4 py-2 rounded-pill"
            style={{ borderColor: "#04626a" }}
          >
            ← Back to List
          </Button>
        </Link>
      </div>

      <Card
        className="shadow-sm border-0"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Card.Body className="p-4">
          <Row className="g-4">
            {/* Profile Section */}
            <Col md={4} className="text-center">
              <div className="position-relative d-inline-block mb-3">
                {student.photo_path ? (
                  <Image
                    src={`${API_BASE}${student.photo_path}`}
                    roundedCircle
                    width={140}
                    height={140}
                    style={{ objectFit: "cover", border: "3px solid #f1f3f5" }}
                  />
                ) : (
                  <div
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
                    style={{
                      width: 140,
                      height: 140,
                      border: "3px solid #f1f3f5",
                    }}
                  >
                    <FaUser size={40} />
                  </div>
                )}
              </div>
              <h4 className="mb-2 fw-bold">{fullName}</h4>
              <Badge
                bg={
                  student.student_status === "active" ? "success" : "secondary"
                }
                className="px-3 py-2 rounded-pill fw-medium"
              >
                {student.student_status}
              </Badge>
            </Col>

            {/* Student Details */}
            <Col md={8}>
              <div className="row g-3">
                {[
                  {
                    label: "Admission No",
                    value: student.admission_number || "—",
                  },
                  { label: "Roll No", value: student.roll_number || "—" },
                  {
                    label: "Class",
                    value:
                      student.program?.name && student.division?.division_name
                        ? `${student.program.name} - ${student.division.division_name}`
                        : "—",
                  },
                  {
                    label: "Academic Year",
                    value: student.academic_year || "—",
                  },
                  { label: "Gender", value: student.gender || "—" },
                  { label: "Category", value: student.category || "—" },
                  { label: "Date of Birth", value: dob },
                  { label: "Admission Date", value: admissionDate },
                  { label: "Email", value: student.email || "—" },
                  { label: "Mobile", value: student.mobile_number || "—" },
                ].map((item, idx) => (
                  <Col sm={6} key={idx} className="mb-0">
                    <small className="text-muted">{item.label}</small>
                    <div className="fw-medium">{item.value}</div>
                  </Col>
                ))}
              </div>
            </Col>
          </Row>

          <hr className="my-4 opacity-25" />

          {/* Guardians Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
            <h5 className="fw-bold text-dark">
              <FaUsers className="me-2 text-primary" />
              Guardians
            </h5>
            <Button
              style={{ backgroundColor: "#04626a", border: "none" }}
              size="sm"
              onClick={openAddModal}
            >
              <FaPlus className="me-1" /> Add Guardian
            </Button>
          </div>

          {guardianError && (
            <Alert variant="danger" className="rounded-2 mb-4">
              {guardianError}
            </Alert>
          )}

          {guardianLoading ? (
            <div className="text-center py-3">
              <Spinner size="sm" />
            </div>
          ) : guardians.length > 0 ? (
            <Row className="g-3">
              {guardians.map((g) => (
                <Col md={6} key={g.id}>
                  <Card className="h-100 shadow-sm border">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1 fw-bold">{g.full_name}</h6>
                          <small className="text-muted d-block">
                            {g.relation}
                          </small>
                          <Badge
                            bg="light"
                            text="dark"
                            className="mt-1 px-2 py-1 rounded"
                          >
                            {g.guardian_type}
                          </Badge>
                        </div>
                        <div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1 rounded-circle p-1"
                            onClick={() => openEditModal(g)}
                            aria-label="Edit"
                          >
                            <FaEdit size={10} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-circle p-1"
                            onClick={() => handleDelete(g.id)}
                            aria-label="Delete"
                          >
                            <FaTrash size={10} />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-auto text-muted small">
                        <div>
                          <FaPhone className="me-1" size={10} />{" "}
                          {g.mobile_number || "—"}
                        </div>
                        <div>
                          <FaEnvelope className="me-1" size={10} />{" "}
                          {g.email || "—"}
                        </div>
                        <div className="mt-2">
                          <FaHome className="me-1" size={10} />{" "}
                          <span className="small">{g.address || "—"}</span>
                        </div>
                        <div className="mt-2 d-flex gap-2 flex-wrap">
                          <span>Occupation: {g.occupation || "—"}</span>
                          <span>Income: ₹{g.annual_income || "—"}</span>
                        </div>
                        {g.is_primary_contact && (
                          <Badge
                            bg="info"
                            className="mt-2 px-2 py-1 rounded-pill fw-medium"
                          >
                            Primary Contact
                          </Badge>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center text-muted py-3">
              No guardians assigned.
            </p>
          )}

          {/* Program Details */}
          <hr className="my-4 opacity-25" />
          <h5 className="fw-bold text-dark mb-3">
            <FaIdCard className="me-2 text-primary" />
            Program Details
          </h5>
          <Row className="g-3">
            <Col sm={6}>
              <small className="text-muted">Program</small>
              <div>{student.program?.name || "—"}</div>
            </Col>
            <Col sm={6}>
              <small className="text-muted">Session</small>
              <div>{student.academic_session?.session_name || "—"}</div>
            </Col>
            <Col sm={6}>
              <small className="text-muted">Duration</small>
              <div>{student.program?.duration_years || "—"} years</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Guardian Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #04626a, #0b8793)",
            color: "#fff",
            borderBottom: "none",
            padding: "1.2rem 1.5rem",
          }}
        >
          <Modal.Title className="fw-semibold">
            {modalMode === "add"
              ? "Add Guardian Details"
              : "Edit Guardian Details"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="px-4 py-4"
          style={{ backgroundColor: "#f9fafb" }}
        >
          {guardianError && (
            <Alert variant="danger" className="rounded-3 text-center">
              {guardianError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Guardian Type */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted">
                Guardian Type
              </Form.Label>
              <Form.Select
                name="guardian_type"
                value={formData.guardian_type}
                onChange={handleInputChange}
                required
                className="rounded-3"
                style={{ backgroundColor: "#ffffff" }}
              >
                <option value="">Select guardian type</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Other Guardian</option>
              </Form.Select>
            </Form.Group>

            {/* Fields Grid */}
            <div className="row">
              {[
                { name: "full_name", label: "Full Name", type: "text" },
                { name: "relation", label: "Relation", type: "text" },
                { name: "occupation", label: "Occupation", type: "text" },
                {
                  name: "annual_income",
                  label: "Annual Income (₹)",
                  type: "number",
                },
                { name: "mobile_number", label: "Mobile Number", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-muted">
                      {field.label}
                    </Form.Label>
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      className="rounded-3"
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </Form.Group>
                </div>
              ))}
            </div>

            {/* Address */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted">
                Address
              </Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={2}
                className="rounded-3"
                style={{ backgroundColor: "#ffffff" }}
              />
            </Form.Group>

            {/* Primary Contact */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                id="is_primary_contact"
                label="Mark as Primary Contact"
                name="is_primary_contact"
                checked={formData.is_primary_contact}
                onChange={handleInputChange}
                className="fw-semibold"
              />
            </Form.Group>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button
                variant="light"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-3 border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 rounded-3 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #04626a, #0b8793)",
                  border: "none",
                }}
              >
                {modalMode === "add" ? "Add Guardian" : "Update Guardian"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ViewStudent;
