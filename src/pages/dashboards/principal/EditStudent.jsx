// src/pages/principal/EditStudent.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const API_DEFAULT = "https://serp.lemmecode.in/schoolerp  ";
const API_BASE = API_DEFAULT.trim();

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
  student_status: Yup.string().oneOf(["active", "inactive", "graduated"]),
});

const EditStudent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [error, setError] = useState("");
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

  // ✅ Initialize Formik
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
      student_status: "active",
    },
    validationSchema: studentSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setError("");
      try {
        const payload = {
          first_name: values.first_name,
          middle_name: values.middle_name,
          last_name: values.last_name,
          date_of_birth: values.date_of_birth,
          gender: values.gender,
          mobile_number: values.mobile_number,
          email: values.email,
          program_id: values.program_id,
          academic_year: values.academic_year,
          division_id: values.division_id,
          academic_session_id: values.academic_session_id,
          admission_date: values.admission_date,
          category: values.category,
          status: values.student_status, // API expects 'status'
        };

        const response = await safeFetchJSON(`${API_BASE}/api/students/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        if (response.success) {
          toast.success("Student updated successfully!");
          navigate("/dashboard/principal/students");
        } else {
          throw new Error(response.message || "Operation failed");
        }
      } catch (err) {
        console.error("Submit Error:", err);
        setError(`Operation failed: ${err.message}`);
        toast.error(`Failed to update student: ${err.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students/${id}`);
      if (res.success && res.data) {
        const student = res.data;
        formik.setValues({
          first_name: student.first_name || "",
          middle_name: student.middle_name || "",
          last_name: student.last_name || "",
          date_of_birth: student.date_of_birth ? student.date_of_birth.split("T")[0] : "",
          gender: student.gender || "male",
          mobile_number: student.mobile_number || "",
          email: student.email || "",
          program_id: student.program_id || "",
          academic_year: student.academic_year || "FY",
          division_id: student.division_id || "",
          academic_session_id: student.academic_session_id || "",
          admission_date: student.admission_date ? student.admission_date.split("T")[0] : "",
          category: student.category || "general",
          student_status: student.student_status || "active",
        });
      } else {
        throw new Error(res.message || "Failed to load student");
      }
    } catch (err) {
      console.error("Fetch Student Error:", err);
      toast.error(`Failed to load student: ${err.message}`);
      navigate("/dashboard/principal/students");
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
    fetchStudent();
    fetchPrograms();
    fetchAcademicSessions();
  }, [id]);

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

        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  name="middle_name"
                  value={formik.values.middle_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.middle_name && !!formik.errors.middle_name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.middle_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth *</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={formik.values.date_of_birth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.date_of_birth && !!formik.errors.date_of_birth}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.date_of_birth}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.gender && !!formik.errors.gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.category && !!formik.errors.category}
                >
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile_number"
                  value={formik.values.mobile_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.mobile_number && !!formik.errors.mobile_number}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mobile_number}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Program *</Form.Label>
                <Form.Select
                  name="program_id"
                  value={formik.values.program_id}
                  onChange={(e) => {
                    formik.setFieldValue("program_id", Number(e.target.value));
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.program_id && !!formik.errors.program_id}
                  disabled={programsLoading}
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
              <Form.Group className="mb-3">
                <Form.Label>Division *</Form.Label>
                <Form.Select
                  name="division_id"
                  value={formik.values.division_id}
                  onChange={(e) => {
                    formik.setFieldValue("division_id", Number(e.target.value));
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.division_id && !!formik.errors.division_id}
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
              <Form.Group className="mb-3">
                <Form.Label>Academic Session *</Form.Label>
                <Form.Select
                  name="academic_session_id"
                  value={formik.values.academic_session_id}
                  onChange={(e) => {
                    formik.setFieldValue("academic_session_id", Number(e.target.value));
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.academic_session_id && !!formik.errors.academic_session_id}
                  disabled={sessionsLoading}
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

          <Row>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Admission Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="admission_date"
                  value={formik.values.admission_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.admission_date && !!formik.errors.admission_date}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.admission_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Academic Year</Form.Label>
                <Form.Select
                  name="academic_year"
                  value={formik.values.academic_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.academic_year && !!formik.errors.academic_year}
                >
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.academic_year}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="student_status"
              value={formik.values.student_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.student_status && !!formik.errors.student_status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.student_status}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 flex-wrap mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button style={{backgroundColor: "#04626a", border: "none"}} type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <Spinner size="sm" /> : "Update Student"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditStudent;