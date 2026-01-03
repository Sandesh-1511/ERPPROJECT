// // src/pages/principal/PrincipalStudents.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Form,
//   Modal,
//   Row,
//   Col,
//   Card,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";

// // ✅ FIXED: Removed trailing spaces
// const API_DEFAULT = "https://serp.lemmecode.in/schoolerp";
// const API_BASE = API_DEFAULT.trim(); // Extra safety

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   // >>> NEW: States for dynamic dropdowns
//   const [programs, setPrograms] = useState([]);
//   const [academicSessions, setAcademicSessions] = useState([]);
//   const [programsLoading, setProgramsLoading] = useState(false);
//   const [sessionsLoading, setSessionsLoading] = useState(false);

//   // Create/Update Modal Only
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
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
//     student_status: "active",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

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

//   const fetchStudents = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const json = await safeFetchJSON(`${API_BASE}/api/students`);
//       if (json.success && Array.isArray(json.data?.data)) {
//         const enriched = json.data.data.map((s) => ({
//           ...s,
//           full_name: [s.first_name, s.middle_name, s.last_name]
//             .filter(Boolean)
//             .join(" "),
//           class_section: `${s.program?.name || "—"} - ${
//             s.division?.name || "—"
//           }`,
//         }));
//         setStudents(enriched);
//       } else {
//         throw new Error(json.message || "Invalid API response");
//       }
//     } catch (err) {
//       console.error("Fetch Students Error:", err);
//       setError(`Failed to load students: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // >>> NEW: Fetch Programs
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

//   // >>> NEW: Fetch Academic Sessions
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

//   const handleShowCreate = () => {
//     setEditMode(false);
//     setFormData({
//       first_name: "",
//       middle_name: "",
//       last_name: "",
//       date_of_birth: "",
//       gender: "male",
//       mobile_number: "",
//       email: "",
//       program_id: "",
//       academic_year: "FY",
//       division_id: "",
//       academic_session_id: "",
//       admission_date: "",
//       category: "general",
//       student_status: "active",
//     });
//     setFormErrors({});
//     setShowEditModal(true);
//   };

//   const handleShowEdit = (student) => {
//     setEditMode(true);
//     setFormData({
//       id: student.id,
//       first_name: student.first_name || "",
//       middle_name: student.middle_name || "",
//       last_name: student.last_name || "",
//       date_of_birth: student.date_of_birth
//         ? student.date_of_birth.split("T")[0]
//         : "",
//       gender: student.gender || "male",
//       mobile_number: student.mobile_number || "",
//       email: student.email || "",
//       program_id: student.program_id || "",
//       academic_year: student.academic_year || "FY",
//       division_id: student.division_id || "",
//       academic_session_id: student.academic_session_id || "",
//       admission_date: student.admission_date
//         ? student.admission_date.split("T")[0]
//         : "",
//       category: student.category || "general",
//       student_status: student.student_status || "active",
//     });
//     setFormErrors({});
//     setShowEditModal(true);
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim())
//       errors.first_name = "First name is required";
//     if (!formData.last_name.trim()) errors.last_name = "Last name is required";
//     if (!formData.date_of_birth)
//       errors.date_of_birth = "Date of birth is required";
//     if (!formData.program_id) errors.program_id = "Program is required";
//     if (!formData.division_id) errors.division_id = "Division is required";
//     if (!formData.academic_session_id)
//       errors.academic_session_id = "Academic session is required";
//     if (!formData.admission_date)
//       errors.admission_date = "Admission date is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setSubmitting(true);
//     try {
//       // Build base payload (common fields)
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

//       // Only include status field in EDIT mode (and rename it to 'status')
//       if (editMode) {
//         payload.status = formData.student_status; // API expects 'status', not 'student_status'
//       }

//       let response;
//       if (editMode) {
//         response = await safeFetchJSON(
//           `${API_BASE}/api/students/${formData.id}`,
//           {
//             method: "PUT",
//             body: JSON.stringify(payload),
//           }
//         );
//       } else {
//         response = await safeFetchJSON(`${API_BASE}/api/students`, {
//           method: "POST",
//           body: JSON.stringify(payload),
//         });
//       }

//       if (response.success) {
//         setShowEditModal(false);
//         fetchStudents();
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

//   useEffect(() => {
//     fetchStudents();
//     // >>> NEW: Fetch programs and sessions on mount
//     fetchPrograms();
//     fetchAcademicSessions();
//   }, []);

//   const filtered = students.filter(
//     (s) =>
//       s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.admission_number && s.admission_number.includes(search)) ||
//       (s.roll_number && s.roll_number.includes(search))
//   );

//   return (
//     <Card className="w-100">
//       <Card.Body>
//         {/* ✅ Responsive header: stacked on mobile, inline on desktop */}
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row gap-2">
//           <h5 className="m-0">Students</h5>
//           <Button variant="primary" onClick={handleShowCreate}>
//             + Add Student
//           </Button>
//         </div>

//         {/* ✅ Full-width search on all screens */}
//         <Form.Control
//           placeholder="Search student by name, admission no, or roll no..."
//           className="mb-3 w-100"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {loading && (
//           <Spinner animation="border" className="d-block mx-auto my-3" />
//         )}
//         {error && <Alert variant="danger">{error}</Alert>}

//         {!loading && !error && (
//           <div className="table-responsive">
//             <Table bordered hover className="align-middle">
//               <thead>
//                 <tr>
//                   <th>Sr.no</th>
//                   <th>Name</th>
//                   <th>Class</th>
//                   <th>Admission No</th>
//                   <th>Roll No</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.length > 0 ? (
//                   filtered.map((s, i) => (
//                     <tr key={s.id}>
//                       <td>{i + 1}</td>
//                       <td>{s.full_name}</td>
//                       <td>{s.class_section}</td>
//                       <td>{s.admission_number || "—"}</td>
//                       <td>{s.roll_number || "—"}</td>
//                       <td className="text-center">
//                         {/* ✅ Responsive action buttons */}
//                         <div className="d-flex justify-content-center gap-1 flex-wrap">
//                           <Link to={`/dashboard/principal/student-view/${s.id}`}>
//                             <Button size="sm" variant="info">
//                               View
//                             </Button>
//                           </Link>
//                           <Button
//                             size="sm"
//                             variant="warning"
//                             onClick={() => handleShowEdit(s)}
//                           >
//                             Edit
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center text-muted py-3">
//                       No students found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </Card.Body>

//       {/* ✅ ONLY Create/Edit Modal — No View Modal */}
//       <Modal
//         show={showEditModal}
//         onHide={() => setShowEditModal(false)}
//         size="lg"
//         fullscreen="md-down" // ✅ Fullscreen on mobile for better UX
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editMode ? "Edit Student" : "Add New Student"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name *</Form.Label>
//                   <Form.Control
//                     value={formData.first_name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, first_name: e.target.value })
//                     }
//                     isInvalid={!!formErrors.first_name}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.first_name}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     value={formData.middle_name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, middle_name: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name *</Form.Label>
//                   <Form.Control
//                     value={formData.last_name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, last_name: e.target.value })
//                     }
//                     isInvalid={!!formErrors.last_name}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.last_name}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.date_of_birth}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         date_of_birth: e.target.value,
//                       })
//                     }
//                     isInvalid={!!formErrors.date_of_birth}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.date_of_birth}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={formData.gender}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                   >
//                     <option value="general">General</option>
//                     <option value="obc">OBC</option>
//                     <option value="sc">SC</option>
//                     <option value="st">ST</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     value={formData.mobile_number}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         mobile_number: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Program *</Form.Label>
//                   <Form.Select
//                     value={formData.program_id}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         program_id: Number(e.target.value),
//                       })
//                     }
//                     isInvalid={!!formErrors.program_id}
//                     disabled={programsLoading}
//                   >
//                     <option value="">Select Program</option>
//                     {programs.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.short_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.program_id}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Division *</Form.Label>
//                   <Form.Select
//                     value={formData.division_id}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         division_id: Number(e.target.value),
//                       })
//                     }
//                     isInvalid={!!formErrors.division_id}
//                   >
//                     <option value="">Select Division</option>
//                     <option value={1}>A</option>
//                     <option value={2}>B</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.division_id}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Session *</Form.Label>
//                   <Form.Select
//                     value={formData.academic_session_id}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         academic_session_id: Number(e.target.value),
//                       })
//                     }
//                     isInvalid={!!formErrors.academic_session_id}
//                     disabled={sessionsLoading}
//                   >
//                     <option value="">Select Session</option>
//                     {academicSessions.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.session_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.academic_session_id}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Admission Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.admission_date}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         admission_date: e.target.value,
//                       })
//                     }
//                     isInvalid={!!formErrors.admission_date}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formErrors.admission_date}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6} xs={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Year</Form.Label>
//                   <Form.Select
//                     value={formData.academic_year}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         academic_year: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="FY">FY</option>
//                     <option value="SY">SY</option>
//                     <option value="TY">TY</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {editMode && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   value={formData.student_status}
//                   onChange={(e) =>
//                     setFormData({ ...formData, student_status: e.target.value })
//                   }
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="graduated">Graduated</option>
//                 </Form.Select>
//               </Form.Group>
//             )}

//             <div className="d-flex justify-content-end gap-2 flex-wrap">
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? (
//                   <Spinner size="sm" />
//                 ) : editMode ? (
//                   "Update Student"
//                 ) : (
//                   "Add Student"
//                 )}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Card>
//   );
// };

// export default PrincipalStudents;




// src/pages/principal/PrincipalStudents.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// ✅ FIXED: Removed trailing spaces
const API_DEFAULT = "https://serp.lemmecode.in/schoolerp  ";
const API_BASE = API_DEFAULT.trim(); // Extra safety

const PrincipalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const json = await safeFetchJSON(`${API_BASE}/api/students`);
      if (json.success && Array.isArray(json.data?.data)) {
        const enriched = json.data.data.map((s) => ({
          ...s,
          full_name: [s.first_name, s.middle_name, s.last_name]
            .filter(Boolean)
            .join(" "),
          class_section: `${s.program?.name || "—"} - ${
            s.division?.name || "—"
          }`,
        }));
        setStudents(enriched);
      } else {
        throw new Error(json.message || "Invalid API response");
      }
    } catch (err) {
      console.error("Fetch Students Error:", err);
      setError(`Failed to load students: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.admission_number && s.admission_number.includes(search)) ||
      (s.roll_number && s.roll_number.includes(search))
  );

  return (
    <Card className="w-100">
      <Card.Body>
        {/* ✅ Responsive header: stacked on mobile, inline on desktop */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row gap-2">
          <h5 className="m-0">Students</h5>
          <Link to="/dashboard/principal/students/add">
            <Button variant="primary">
              + Add Student
            </Button>
          </Link>
        </div>

        {/* ✅ Full-width search on all screens */}
        <Form.Control
          placeholder="Search student by name, admission no, or roll no..."
          className="mb-3 w-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && (
          <Spinner animation="border" className="d-block mx-auto my-3" />
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Admission No</th>
                  <th>Roll No</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td>{s.full_name}</td>
                      <td>{s.class_section}</td>
                      <td>{s.admission_number || "—"}</td>
                      <td>{s.roll_number || "—"}</td>
                      <td className="text-center">
                        {/* ✅ Responsive action buttons */}
                        <div className="d-flex justify-content-center gap-1 flex-wrap">
                          <Link to={`/dashboard/principal/student-view/${s.id}`}>
                            <Button size="sm" variant="info">
                              View
                            </Button>
                          </Link>
                          <Link to={`/dashboard/principal/students/edit/${s.id}`}>
                            <Button size="sm" variant="warning">
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PrincipalStudents;