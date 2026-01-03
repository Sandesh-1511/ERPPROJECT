// // src/pages/principal/AddStudent.jsx
// import React, { useState, useEffect } from "react";
// import { Button, Form, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const API_DEFAULT = "https://serp.lemmecode.in/schoolerp  ";
// const API_BASE = API_DEFAULT.trim();

// const AddStudent = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     date_of_birth: "",
//     gender: "male",
//     mobile_number: "",
//     email: "",
//     program_id: "",
//     academic_year: "FY",
//     division_id: "",
//     academic_session_id: "",
//     admission_date: "",
//     category: "general",
//   });
//   const [programs, setPrograms] = useState([]);
//   const [academicSessions, setAcademicSessions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [programsLoading, setProgramsLoading] = useState(false);
//   const [sessionsLoading, setSessionsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const safeFetchJSON = async (url, options = {}) => {
//     const res = await fetch(url.trim(), {
//       ...options,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         ...(options.headers || {}),
//       },
//     });
//     const contentType = res.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const text = await res.text();
//       throw new Error(
//         `Expected JSON but received HTML. Status: ${
//           res.status
//         }. Preview: ${text.substring(0, 100)}...`
//       );
//     }
//     return await res.json();
//   };

//   const fetchPrograms = async () => {
//     setProgramsLoading(true);
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/programs`);
//       if (res.success && Array.isArray(res.data)) {
//         setPrograms(res.data);
//       } else {
//         throw new Error(res.message || "Failed to load programs");
//       }
//     } catch (err) {
//       console.error("Fetch Programs Error:", err);
//       setError(`Failed to load programs: ${err.message}`);
//     } finally {
//       setProgramsLoading(false);
//     }
//   };

//   const fetchAcademicSessions = async () => {
//     setSessionsLoading(true);
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/academic-sessions`);
//       if (res.success && Array.isArray(res.data)) {
//         setAcademicSessions(res.data);
//       } else {
//         throw new Error(res.message || "Failed to load academic sessions");
//       }
//     } catch (err) {
//       console.error("Fetch Academic Sessions Error:", err);
//       setError(`Failed to load academic sessions: ${err.message}`);
//     } finally {
//       setSessionsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrograms();
//     fetchAcademicSessions();
//   }, []);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim()) errors.first_name = "First name is required";
//     if (!formData.last_name.trim()) errors.last_name = "Last name is required";
//     if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
//     if (!formData.program_id) errors.program_id = "Program is required";
//     if (!formData.division_id) errors.division_id = "Division is required";
//     if (!formData.academic_session_id) errors.academic_session_id = "Academic session is required";
//     if (!formData.admission_date) errors.admission_date = "Admission date is required";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       // In a full app, you'd show these errors
//       console.error("Validation errors:", errors);
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         first_name: formData.first_name,
//         middle_name: formData.middle_name,
//         last_name: formData.last_name,
//         date_of_birth: formData.date_of_birth,
//         gender: formData.gender,
//         mobile_number: formData.mobile_number,
//         email: formData.email,
//         program_id: formData.program_id,
//         academic_year: formData.academic_year,
//         division_id: formData.division_id,
//         academic_session_id: formData.academic_session_id,
//         admission_date: formData.admission_date,
//         category: formData.category,
//       };

//       const response = await safeFetchJSON(`${API_BASE}/api/students`, {
//         method: "POST",
//         body: JSON.stringify(payload),
//       });

//       if (response.success) {
//         navigate("/dashboard/principal/students"); // Redirect to student list
//       } else {
//         throw new Error(response.message || "Operation failed");
//       }
//     } catch (err) {
//       console.error("Submit Error:", err);
//       setError(`Operation failed: ${err.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Card className="w-100">
//       <Card.Body>
//         <h5 className="mb-4">Add New Student</h5>
        
//         {error && <Alert variant="danger">{error}</Alert>}
        
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>First Name *</Form.Label>
//                 <Form.Control
//                   value={formData.first_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, first_name: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Middle Name</Form.Label>
//                 <Form.Control
//                   value={formData.middle_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, middle_name: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Last Name *</Form.Label>
//                 <Form.Control
//                   value={formData.last_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, last_name: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Date of Birth *</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={formData.date_of_birth}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       date_of_birth: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Select
//                   value={formData.gender}
//                   onChange={(e) =>
//                     setFormData({ ...formData, gender: e.target.value })
//                   }
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                 >
//                   <option value="general">General</option>
//                   <option value="obc">OBC</option>
//                   <option value="sc">SC</option>
//                   <option value="st">ST</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Mobile Number</Form.Label>
//                 <Form.Control
//                   type="tel"
//                   value={formData.mobile_number}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       mobile_number: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Program *</Form.Label>
//                 <Form.Select
//                   value={formData.program_id}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       program_id: Number(e.target.value),
//                     })
//                   }
//                   required
//                   disabled={programsLoading}
//                 >
//                   <option value="">Select Program</option>
//                   {programs.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.short_name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Division *</Form.Label>
//                 <Form.Select
//                   value={formData.division_id}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       division_id: Number(e.target.value),
//                     })
//                   }
//                   required
//                 >
//                   <option value="">Select Division</option>
//                   <option value={1}>A</option>
//                   <option value={2}>B</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Academic Session *</Form.Label>
//                 <Form.Select
//                   value={formData.academic_session_id}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       academic_session_id: Number(e.target.value),
//                     })
//                   }
//                   required
//                   disabled={sessionsLoading}
//                 >
//                   <option value="">Select Session</option>
//                   {academicSessions.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.session_name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Admission Date *</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={formData.admission_date}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       admission_date: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} xs={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Academic Year</Form.Label>
//                 <Form.Select
//                   value={formData.academic_year}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       academic_year: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="FY">FY</option>
//                   <option value="SY">SY</option>
//                   <option value="TY">TY</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <div className="d-flex justify-content-end gap-2 flex-wrap mt-4">
//             <Button variant="secondary" onClick={() => navigate(-1)}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit" disabled={submitting}>
//               {submitting ? <Spinner size="sm" /> : "Add Student"}
//             </Button>
//           </div>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AddStudent;





// src/pages/principal/AddStudent.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

const API_DEFAULT = "https://serp.lemmecode.in/schoolerp    ";
const API_BASE = API_DEFAULT.trim();

const AddStudent = () => {
  const [programs, setPrograms] = useState([]);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [loading, setLoading] = useState(false);
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
    fetchPrograms();
    fetchAcademicSessions();
  }, []);

  // ✅ Validation Schema with custom rules
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "First name must contain only letters and spaces")
      .required("First name is required"),
    middle_name: Yup.string()
      .matches(/^[A-Za-z\s]*$/, "Middle name must contain only letters and spaces")
      .nullable(),
    last_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters and spaces")
      .required("Last name is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().oneOf(["male", "female", "other"]),
    mobile_number: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits and start with 6-9")
      .nullable(),
    email: Yup.string().email("Invalid email").nullable(),
    program_id: Yup.number().required("Program is required").positive(),
    division_id: Yup.number().required("Division is required").positive(),
    academic_session_id: Yup.number()
      .required("Academic session is required")
      .positive(),
    admission_date: Yup.date().required("Admission date is required"),
    academic_year: Yup.string().oneOf(["FY", "SY", "TY"]),
    category: Yup.string().oneOf(["general", "obc", "sc", "st"]),
  });

  const handleSubmitFormik = async (values) => {
    setSubmitting(true);
    try {
      const payload = { ...values };

      const response = await safeFetchJSON(`${API_BASE}/api/students`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        toast.success("Student added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/dashboard/principal/students"), 1000);
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(`Failed: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

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
    validationSchema,
    onSubmit: handleSubmitFormik,
  });

  return (
    <>
      <ToastContainer />
      <Card className="w-100">
        <Card.Body>
          <h5 className="mb-4">Add New Student</h5>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={4} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.first_name && formik.errors.first_name)}
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
                    isInvalid={!!(formik.touched.middle_name && formik.errors.middle_name)}
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
                    isInvalid={!!(formik.touched.last_name && formik.errors.last_name)}
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
                    isInvalid={!!(formik.touched.date_of_birth && formik.errors.date_of_birth)}
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
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    name="mobile_number"
                    value={formik.values.mobile_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.mobile_number && formik.errors.mobile_number)}
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
                    isInvalid={!!(formik.touched.email && formik.errors.email)}
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
                    isInvalid={!!(formik.touched.program_id && formik.errors.program_id)}
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
                    isInvalid={!!(formik.touched.division_id && formik.errors.division_id)}
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
                    isInvalid={!!(formik.touched.academic_session_id && formik.errors.academic_session_id)}
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
                    isInvalid={!!(formik.touched.admission_date && formik.errors.admission_date)}
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
                  >
                    <option value="FY">FY</option>
                    <option value="SY">SY</option>
                    <option value="TY">TY</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 flex-wrap mt-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button style={{backgroundColor: "#04626a", border: "none"}} type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : "Add Student"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddStudent;