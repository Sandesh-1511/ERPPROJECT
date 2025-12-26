// // src/pages/principal/Exams.jsx
// import React from "react";
// import { Card, Table, Badge } from "react-bootstrap";

// const PrincipalExams = () => {
//   // Mock data - replace with: GET /api/principal/exams
//   const exams = [
//     { id: 1, name: "Mid-Term Exam", class: "10", date: "2025-12-20", status: "Scheduled" },
//     { id: 2, name: "Final Term Exam", class: "9", date: "2026-02-10", status: "Planned" },
//     { id: 3, name: "Unit Test 1", class: "11", date: "2025-12-05", status: "Completed" },
//   ];

//   return (
//     <>
//       <h4 className="mb-4">Examination Management</h4>

//       <Card>
//         <Card.Body>
//           <Table responsive>
//             <thead>
//               <tr>
//                 <th>Exam Name</th>
//                 <th>Class</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {exams.map((exam) => (
//                 <tr key={exam.id}>
//                   <td>{exam.name}</td>
//                   <td>{exam.class}</td>
//                   <td>{exam.date}</td>
//                   <td>
//                     <Badge bg={
//                       exam.status === "Scheduled" ? "info" :
//                       exam.status === "Planned" ? "secondary" :
//                       "success"
//                     }>
//                       {exam.status}
//                     </Badge>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-outline-info">View Schedule</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </>
//   );
// };

// export default PrincipalExams;


import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Button,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Container,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTrophy, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const PrincipalExams = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Exams Data
  const [exams, setExams] = useState([]);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "internal",
    start_date: "",
    end_date: "",
    academic_year: "2024-25",
    status: "scheduled",
  });
  const [formErrors, setFormErrors] = useState({});
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
      throw new Error(
        `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
      );
    }

    return await res.json();
  };

  /* ---------------- FETCH EXAMS ---------------- */
  const fetchExams = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams`);
      if (res.success && Array.isArray(res.data)) {
        setExams(res.data);
      } else {
        throw new Error(res.message || "Invalid API response");
      }
    } catch (err) {
      console.error("Fetch Exams Error:", err);
      setError(`Failed to load exams: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CREATE EXAM ---------------- */
  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        setShowCreateModal(false);
        fetchExams();
      } else {
        throw new Error(res.message || "Failed to create exam");
      }
    } catch (err) {
      console.error("Create Exam Error:", err);
      setError(`Failed to create exam: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- UPDATE EXAM ---------------- */
  const handleUpdateExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams/${selectedExam.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (res.success) {
        setShowEditModal(false);
        fetchExams();
      } else {
        throw new Error(res.message || "Failed to update exam");
      }
    } catch (err) {
      console.error("Update Exam Error:", err);
      setError(`Failed to update exam: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- DELETE EXAM ---------------- */
  const handleDeleteExam = async (examId, examName) => {
    if (!window.confirm(`Are you sure you want to delete "${examName}"? This action cannot be undone.`)) return;

    try {
      const res = await safeFetchJSON(`${API_BASE}/api/exams/${examId}`, {
        method: "DELETE",
      });

      if (res.success) {
        fetchExams();
      } else {
        throw new Error(res.message || "Failed to delete exam");
      }
    } catch (err) {
      console.error("Delete Exam Error:", err);
      setError(`Failed to delete exam: ${err.message}`);
    }
  };

  /* ---------------- VALIDATE FORM ---------------- */
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Exam name is required";
    if (!formData.code.trim()) errors.code = "Exam code is required";
    if (!formData.start_date) errors.start_date = "Start date is required";
    if (!formData.end_date) errors.end_date = "End date is required";
    if (!formData.academic_year) errors.academic_year = "Academic year is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ---------------- OPEN EDIT MODAL ---------------- */
  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setFormData({
      name: exam.name || "",
      code: exam.code || "",
      type: exam.type || "internal",
      start_date: exam.start_date.split("T")[0],
      end_date: exam.end_date.split("T")[0],
      academic_year: exam.academic_year || "2024-25",
      status: exam.status || "scheduled",
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  /* ---------------- EFFECT ---------------- */
  useEffect(() => {
    fetchExams();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredExams = exams.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- DASHBOARD SUMMARY ---------------- */
  const totalExams = exams.length;
  const upcomingExams = exams.filter(e => new Date(e.start_date) > new Date()).length;
  const ongoingExams = exams.filter(e => {
    const now = new Date();
    return new Date(e.start_date) <= now && new Date(e.end_date) >= now;
  }).length;
  const completedExams = exams.filter(e => new Date(e.end_date) < new Date()).length;

  /* ---------------- UI ---------------- */
  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Examinations</h2>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <FaPlus className="me-1" /> Create New Exam
        </Button>
      </div>

      {/* Search Bar */}
      <Form.Control
        placeholder="Search by exam name, code, or type..."
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dashboard Cards */}
      {loading ? (
        <Spinner animation="border" className="d-block mx-auto my-4" />
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4 mb-4">
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                  <FaCalendarAlt className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">{totalExams}</h4>
                  <small>Total Exams</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-info bg-opacity-10 rounded-circle">
                  <FaClock className="text-info" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">{upcomingExams}</h4>
                  <small>Upcoming Exams</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-success bg-opacity-10 rounded-circle">
                  <FaCheckCircle className="text-success" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">{ongoingExams}</h4>
                  <small>Ongoing Exams</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
                  <FaTrophy className="text-warning" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">{completedExams}</h4>
                  <small>Completed Exams</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* All Examinations Table */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Examinations</h5>
          <Button variant="outline-secondary" size="sm">Export Report</Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" className="d-block mx-auto" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Exam Code</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Academic Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.code}</td>
                      <td>
                        <Badge bg={
                          e.type === "internal" ? "info" :
                          e.type === "external" ? "success" :
                          "warning"
                        }>
                          {e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                        </Badge>
                      </td>
                      <td>{new Date(e.start_date).toLocaleDateString()}</td>
                      <td>{new Date(e.end_date).toLocaleDateString()}</td>
                      <td>{e.academic_year}</td>
                      <td>
                        <Badge bg={
                          e.status === "scheduled" ? "info" :
                          e.status === "ongoing" ? "warning" :
                          "success"
                        }>
                          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => window.alert(`View Schedule for ${e.name}`)}
                        >
                          <FaEye className="me-1" /> View
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-1"
                          onClick={() => openEditModal(e)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteExam(e.id, e.name)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      {search ? "No matching exams." : "No exams found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ---------------- CREATE EXAM MODAL ---------------- */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateExam}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Name *</Form.Label>
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
                  <Form.Label>Exam Code *</Form.Label>
                  <Form.Control
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    isInvalid={!!formErrors.code}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.code}</Form.Control.Feedback>
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
                    isInvalid={!!formErrors.academic_year}
                  >
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{formErrors.academic_year}</Form.Control.Feedback>
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
                    isInvalid={!!formErrors.start_date}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.start_date}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    isInvalid={!!formErrors.end_date}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.end_date}</Form.Control.Feedback>
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

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : "Create Exam"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ---------------- EDIT EXAM MODAL ---------------- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Exam: {selectedExam?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExam && (
            <Form onSubmit={handleUpdateExam}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Exam Name *</Form.Label>
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
                    <Form.Label>Exam Code *</Form.Label>
                    <Form.Control
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      isInvalid={!!formErrors.code}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.code}</Form.Control.Feedback>
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
                      isInvalid={!!formErrors.academic_year}
                    >
                      <option value="">Select Year</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2025-26">2025-26</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formErrors.academic_year}</Form.Control.Feedback>
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
                      isInvalid={!!formErrors.start_date}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.start_date}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date *</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      isInvalid={!!formErrors.end_date}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.end_date}</Form.Control.Feedback>
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

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? <Spinner size="sm" /> : "Update Exam"}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PrincipalExams;