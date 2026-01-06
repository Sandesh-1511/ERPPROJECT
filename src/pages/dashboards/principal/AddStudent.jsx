// src/pages/principal/AddStudent.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const API_DEFAULT = "https://serp.lemmecode.in/schoolerp";
const API_BASE = API_DEFAULT.trim();

// Validation Schema
const studentSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name must contain only letters and spaces")
    .required("First name is required"),
  middle_name: Yup.string().matches(/^[A-Za-z\s]*$/, "Middle name must contain only letters and spaces"),
  last_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  date_of_birth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  gender: Yup.string().oneOf(["male", "female", "other"]),
  mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits and start with 6, 7, 8, or 9")
    .nullable(),
  email: Yup.string().email("Invalid email").nullable(),
  program_id: Yup.number().required("Program is required").positive(),
  division_id: Yup.number().required("Division is required").positive(),
  academic_session_id: Yup.number().required("Academic session is required").positive(),
  admission_date: Yup.date()
    .max(new Date(), "Admission date cannot be in the future")
    .required("Admission date is required"),
  category: Yup.string().oneOf(["general", "obc", "sc", "st"]),
  academic_year: Yup.string().oneOf(["FY", "SY", "TY"]),
});

const AddStudent = () => {
  const [programs, setPrograms] = useState([]);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
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
      toast.error(`Failed to load programs: ${err.message}`);
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
      toast.error(`Failed to load academic sessions: ${err.message}`);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchAcademicSessions();
  }, []);

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: studentSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await safeFetchJSON(`${API_BASE}/api/students`, {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (response.success) {
          toast.success("Student added successfully!");
          navigate("/dashboard/principal/students");
        } else {
          throw new Error(response.message || "Operation failed");
        }
      } catch (err) {
        console.error("Submit Error:", err);
        toast.error(`Failed to add student: ${err.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  

  return (
    <Container fluid className="py-3">
      <Card
        className="shadow-sm border-0"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Card.Body className="p-4">
          <h5 className="mb-4 fw-bold text-dark">Add New Student</h5>

          <Form onSubmit={formik.handleSubmit}>
            <Row className="g-3">
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.first_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middle_name"
                    value={formik.values.middle_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.middle_name && !!formik.errors.middle_name}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.middle_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.last_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Date of Birth <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_birth"
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.date_of_birth && !!formik.errors.date_of_birth}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date_of_birth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col md={6} xs={12}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile_number"
                    value={formik.values.mobile_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.mobile_number && !!formik.errors.mobile_number}
                    className="rounded-pill"
                    style={{
                      padding: "8.5px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.mobile_number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    className="rounded-pill"
                    style={{
                      padding: "8.5px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Program <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="program_id"
                    value={formik.values.program_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.program_id && !!formik.errors.program_id}
                    disabled={programsLoading}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="">Select Program</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.short_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.program_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Division <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="division_id"
                    value={formik.values.division_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.division_id && !!formik.errors.division_id}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="">Select Division</option>
                    <option value={1}>A</option>
                    <option value={2}>B</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.division_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Academic Session <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="academic_session_id"
                    value={formik.values.academic_session_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.academic_session_id && !!formik.errors.academic_session_id}
                    disabled={sessionsLoading}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="">Select Session</option>
                    {academicSessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.session_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.academic_session_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col md={6} xs={12}>
                <Form.Group>
                  <Form.Label>
                    Admission Date <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="admission_date"
                    value={formik.values.admission_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.admission_date && !!formik.errors.admission_date}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.admission_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group>
                  <Form.Label>Academic Year</Form.Label>
                  <Form.Select
                    name="academic_year"
                    value={formik.values.academic_year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-pill"
                    style={{
                      padding: "8px 16px",
                      fontSize: "0.95rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <option value="FY">FY</option>
                    <option value="SY">SY</option>
                    <option value="TY">TY</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-3 flex-wrap mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                style={{
                  backgroundColor: "#6c757d",
                  border: "none",
                  fontSize: "0.95rem",
                  padding: "8px 20px",
                  fontWeight: "500",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
                style={{
                  backgroundColor: "#04626a",
                  border: "none",
                  fontSize: "0.95rem",
                  padding: "8px 20px",
                  fontWeight: "500",
                }}
              >
                {formik.isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : (
                  "Add Student"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddStudent;