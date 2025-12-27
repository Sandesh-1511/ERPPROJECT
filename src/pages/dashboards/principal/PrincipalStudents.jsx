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
//   Badge,
//   Image,
//   InputGroup,
// } from "react-bootstrap";

// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   // View Modal
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [guardians, setGuardians] = useState([]);
//   const [documents, setDocuments] = useState({ photo: null, signature: null });
//   const [guardianLoading, setGuardianLoading] = useState(false);
//   const [docLoading, setDocLoading] = useState(false);

//   // Create/Update Modal
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editMode, setEditMode] = useState(false); // true = update, false = create
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
//         `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
//       );
//     }

//     return await res.json();
//   };

//   /* ---------------- FETCH STUDENTS ---------------- */
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
//           class_section: `${s.program?.name || "—"} - ${s.division?.name || "—"}`,
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

//   /* ---------------- FETCH GUARDIANS ---------------- */
//   const fetchGuardians = async (studentId) => {
//     setGuardianLoading(true);
//     try {
//       const json = await safeFetchJSON(`${API_BASE}/api/students/${studentId}/guardians`);
//       setGuardians(json.success && Array.isArray(json.data) ? json.data : []);
//     } catch (err) {
//       console.error("Fetch Guardians Error:", err);
//       setGuardians([]);
//     } finally {
//       setGuardianLoading(false);
//     }
//   };

//   /* ---------------- FETCH DOCUMENTS ---------------- */
//   const fetchDocuments = async (studentId) => {
//     setDocLoading(true);
//     try {
//       const json = await safeFetchJSON(`${API_BASE}/api/students/${studentId}/documents`);
//       setDocuments(json.success ? json.data : { photo: null, signature: null });
//     } catch (err) {
//       console.error("Fetch Documents Error:", err);
//       setDocuments({ photo: null, signature: null });
//     } finally {
//       setDocLoading(false);
//     }
//   };

//   /* ---------------- VIEW STUDENT ---------------- */
//   const handleView = async (student) => {
//     setSelectedStudent(student);
//     await Promise.all([fetchGuardians(student.id), fetchDocuments(student.id)]);
//     setShowViewModal(true);
//   };

//   /* ---------------- CREATE/UPDATE MODAL ---------------- */
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
//       date_of_birth: student.date_of_birth ? student.date_of_birth.split("T")[0] : "",
//       gender: student.gender || "male",
//       mobile_number: student.mobile_number || "",
//       email: student.email || "",
//       program_id: student.program_id || "",
//       academic_year: student.academic_year || "FY",
//       division_id: student.division_id || "",
//       academic_session_id: student.academic_session_id || "",
//       admission_date: student.admission_date ? student.admission_date.split("T")[0] : "",
//       category: student.category || "general",
//       student_status: student.student_status || "active",
//     });
//     setFormErrors({});
//     setShowEditModal(true);
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim()) errors.first_name = "First name is required";
//     if (!formData.last_name.trim()) errors.last_name = "Last name is required";
//     if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
//     if (!formData.program_id) errors.program_id = "Program is required";
//     if (!formData.division_id) errors.division_id = "Division is required";
//     if (!formData.academic_session_id) errors.academic_session_id = "Academic session is required";
//     if (!formData.admission_date) errors.admission_date = "Admission date is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setSubmitting(true);
//     try {
//       let response;
//       if (editMode) {
//         response = await safeFetchJSON(`${API_BASE}/api/students/${formData.id}`, {
//           method: "PUT",
//           body: JSON.stringify(formData),
//         });
//       } else {
//         response = await safeFetchJSON(`${API_BASE}/api/students`, {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });
//       }

//       if (response.success) {
//         setShowEditModal(false);
//         fetchStudents(); // Refresh list
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

//   // /* ---------------- DELETE STUDENT ---------------- */
//   // const handleDelete = async (studentId, studentName) => {
//   //   if (!window.confirm(`Are you sure you want to delete student "${studentName}"?`)) return;

//   //   try {
//   //     const response = await safeFetchJSON(`${API_BASE}/api/students/${studentId}`, {
//   //       method: "DELETE",
//   //     });

//   //     if (response.success) {
//   //       fetchStudents(); // Refresh list
//   //     } else {
//   //       throw new Error(response.message || "Delete failed");
//   //     }
//   //   } catch (err) {
//   //     console.error("Delete Error:", err);
//   //     setError(`Failed to delete student: ${err.message}`);
//   //   }
//   // };

//   /* ---------------- EFFECT ---------------- */
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   /* ---------------- FILTER ---------------- */
//   const filtered = students.filter(
//     (s) =>
//       s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.admission_number && s.admission_number.includes(search)) ||
//       (s.roll_number && s.roll_number.includes(search))
//   );

//   /* ---------------- UI ---------------- */
//   return (
//     <Card>
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5>Students</h5>
//           <Button variant="primary" onClick={handleShowCreate}>
//             + Add Student
//           </Button>
//         </div>

//         <Form.Control
//           placeholder="Search student by name, admission no, or roll no..."
//           className="mb-3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {loading && <Spinner animation="border" className="d-block mx-auto my-3" />}
//         {error && <Alert variant="danger">{error}</Alert>}

//         {!loading && !error && (
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Admission No</th>
//                 <th>Roll No</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length > 0 ? (
//                 filtered.map((s, i) => (
//                   <tr key={s.id}>
//                     <td>{i + 1}</td>
//                     <td>{s.full_name}</td>
//                     <td>{s.class_section}</td>
//                     <td>{s.admission_number || "—"}</td>
//                     <td>{s.roll_number || "—"}</td>
//                     <td className="text-center">
//                       <Button size="sm" variant="info" className="me-2" onClick={() => handleView(s)}>
//                         View
//                       </Button>
//                       <Button size="sm" variant="warning" className="me-2" onClick={() => handleShowEdit(s)}>
//                         Edit
//                       </Button>
//                       {/* <Button size="sm" variant="danger" onClick={() => handleDelete(s.id, s.full_name)}>
//                         Delete
//                       </Button> */}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>

//       {/* ---------------- VIEW MODAL ---------------- */}
//       <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Student Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStudent && (
//             <>
//               <Row>
//                 <Col md={4} className="text-center">
//                   {docLoading ? (
//                     <Spinner size="sm" />
//                   ) : documents.photo ? (
//                     <Image src={`${API_BASE}${documents.photo}`} roundedCircle width={120} />
//                   ) : (
//                     <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
//                       No Photo
//                     </div>
//                   )}
//                 </Col>
//                 <Col md={8}>
//                   <h5>{selectedStudent.full_name}</h5>
//                   <p>
//                     <strong>Admission No:</strong> {selectedStudent.admission_number || "—"}<br />
//                     <strong>Roll No:</strong> {selectedStudent.roll_number || "—"}<br />
//                     <strong>Class:</strong> {selectedStudent.class_section}<br />
//                     <strong>Status:</strong> <Badge bg={selectedStudent.student_status === "active" ? "success" : "secondary"}>{selectedStudent.student_status}</Badge>
//                   </p>
//                 </Col>
//               </Row>

//               <hr />

//               <h6>Guardians</h6>
//               {guardianLoading ? (
//                 <Spinner size="sm" />
//               ) : guardians.length > 0 ? (
//                 <ul className="list-unstyled">
//                   {guardians.map((g) => (
//                     <li key={g.id}>
//                       {g.first_name} {g.last_name} ({g.relation}) – {g.mobile_number}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted">No guardians added.</p>
//               )}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ---------------- CREATE/EDIT MODAL ---------------- */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Student" : "Add New Student"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name *</Form.Label>
//                   <Form.Control
//                     value={formData.first_name}
//                     onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                     isInvalid={!!formErrors.first_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.first_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     value={formData.middle_name}
//                     onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name *</Form.Label>
//                   <Form.Control
//                     value={formData.last_name}
//                     onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                     isInvalid={!!formErrors.last_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.last_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.date_of_birth}
//                     onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
//                     isInvalid={!!formErrors.date_of_birth}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.date_of_birth}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={formData.gender}
//                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     value={formData.mobile_number}
//                     onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Program *</Form.Label>
//                   <Form.Select
//                     value={formData.program_id}
//                     onChange={(e) => setFormData({ ...formData, program_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.program_id}
//                   >
//                     <option value="">Select Program</option>
//                     {/* You may want to fetch programs dynamically */}
//                     <option value={1}>B.Com</option>
//                     <option value={2}>B.Sc</option>
//                     {/* Add more as needed */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.program_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Division *</Form.Label>
//                   <Form.Select
//                     value={formData.division_id}
//                     onChange={(e) => setFormData({ ...formData, division_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.division_id}
//                   >
//                     <option value="">Select Division</option>
//                     <option value={1}>A</option>
//                     <option value={2}>B</option>
//                     {/* Add more as needed */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.division_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Session *</Form.Label>
//                   <Form.Select
//                     value={formData.academic_session_id}
//                     onChange={(e) => setFormData({ ...formData, academic_session_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.academic_session_id}
//                   >
//                     <option value="">Select Session</option>
//                     <option value={1}>2024-25</option>
//                     <option value={2}>2025-26</option>
//                     {/* Add more as needed */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.academic_session_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Admission Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.admission_date}
//                     onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
//                     isInvalid={!!formErrors.admission_date}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.admission_date}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Year</Form.Label>
//                   <Form.Select
//                     value={formData.academic_year}
//                     onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
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
//                   onChange={(e) => setFormData({ ...formData, student_status: e.target.value })}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="graduated">Graduated</option>
//                 </Form.Select>
//               </Form.Group>
//             )}

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? <Spinner size="sm" /> : editMode ? "Update Student" : "Add Student"}
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
// src/pages/principal/PrincipalStudents.jsx
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
//   Badge,
//   Image,
//   OverlayTrigger,
//   Tooltip,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { FaUser, FaUpload, FaTimes } from "react-icons/fa";

// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   // Create/Update Modal
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

//   // === NEW: Document states for modal ===
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [signaturePreview, setSignaturePreview] = useState(null);
//   const [documents, setDocuments] = useState({ photo: null, signature: null });
//   const [uploadingPhoto, setUploadingPhoto] = useState(false);
//   const [uploadingSignature, setUploadingSignature] = useState(false);
//   const [deletingPhoto, setDeletingPhoto] = useState(false);
//   const [deletingSignature, setDeletingSignature] = useState(false);
//   const [docModalError, setDocModalError] = useState("");

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
//         `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
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
//           full_name: [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" "),
//           class_section: `${s.program?.name || "—"} - ${s.division?.name || "—"}`,
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
//     setPhotoPreview(null);
//     setSignaturePreview(null);
//     setDocuments({ photo: null, signature: null });
//     setDocModalError("");
//     setShowEditModal(true);
//   };

//   const handleShowEdit = (student) => {
//     setEditMode(true);
//     setFormData({
//       id: student.id,
//       first_name: student.first_name || "",
//       middle_name: student.middle_name || "",
//       last_name: student.last_name || "",
//       date_of_birth: student.date_of_birth ? student.date_of_birth.split("T")[0] : "",
//       gender: student.gender || "male",
//       mobile_number: student.mobile_number || "",
//       email: student.email || "",
//       program_id: student.program_id || "",
//       academic_year: student.academic_year || "FY",
//       division_id: student.division_id || "",
//       academic_session_id: student.academic_session_id || "",
//       admission_date: student.admission_date ? student.admission_date.split("T")[0] : "",
//       category: student.category || "general",
//       student_status: student.student_status || "active",
//     });
//     setFormErrors({});
//     // Fetch documents
//     fetchDocumentsForModal(student.id);
//     setPhotoPreview(null);
//     setSignaturePreview(null);
//     setShowEditModal(true);
//   };

//   const fetchDocumentsForModal = async (studentId) => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/students/${studentId}/documents`);
//       if (res.success) {
//         setDocuments(res.data || { photo: null, signature: null });
//       }
//     } catch (err) {
//       console.error("Fetch docs in modal failed", err);
//     }
//   };

//   // === Document Handlers Inside Modal ===
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (editMode) {
//       uploadDocument(file, "photo");
//     } else {
//       const url = URL.createObjectURL(file);
//       setPhotoPreview(url);
//     }
//   };

//   const handleSignatureChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (editMode) {
//       uploadDocument(file, "signature");
//     } else {
//       const url = URL.createObjectURL(file);
//       setSignaturePreview(url);
//     }
//   };

//   const uploadDocument = async (file, type) => {
//     const isPhoto = type === "photo";
//     if (isPhoto) setUploadingPhoto(true);
//     else setUploadingSignature(true);
//     setDocModalError("");

//     try {
//       const formDataUpload = new FormData();
//       formDataUpload.append(type, file);

//       const url =
//         type === "photo"
//           ? `${API_BASE}/api/students/${formData.id}/documents/photo`
//           : `${API_BASE}/api/students/${formData.id}/documents/signature`;

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formDataUpload,
//       });

//       const result = await res.json();
//       if (result.success) {
//         fetchDocumentsForModal(formData.id);
//       } else {
//         throw new Error(result.message || `${type} upload failed`);
//       }
//     } catch (err) {
//       setDocModalError(err.message);
//     } finally {
//       if (isPhoto) setUploadingPhoto(false);
//       else setUploadingSignature(false);
//     }
//   };

//   const deleteDocument = async (type) => {
//     if (!window.confirm(`Delete this ${type}?`)) return;
//     const isPhoto = type === "photo";
//     if (isPhoto) setDeletingPhoto(true);
//     else setDeletingSignature(true);

//     try {
//       const url =
//         type === "photo"
//           ? `${API_BASE}/api/students/${formData.id}/documents/photo`
//           : `${API_BASE}/api/students/${formData.id}/documents/signature`;

//       const res = await fetch(url, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.success) {
//         fetchDocumentsForModal(formData.id);
//         if (type === "photo") setPhotoPreview(null);
//         else setSignaturePreview(null);
//       } else {
//         throw new Error(result.message || `Delete ${type} failed`);
//       }
//     } catch (err) {
//       setDocModalError(err.message);
//     } finally {
//       if (isPhoto) setDeletingPhoto(false);
//       else setDeletingSignature(false);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim()) errors.first_name = "First name is required";
//     if (!formData.last_name.trim()) errors.last_name = "Last name is required";
//     if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
//     if (!formData.program_id) errors.program_id = "Program is required";
//     if (!formData.division_id) errors.division_id = "Division is required";
//     if (!formData.academic_session_id) errors.academic_session_id = "Academic session is required";
//     if (!formData.admission_date) errors.admission_date = "Admission date is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setSubmitting(true);
//     try {
//       let response;
//       if (editMode) {
//         response = await safeFetchJSON(`${API_BASE}/api/students/${formData.id}`, {
//           method: "PUT",
//           body: JSON.stringify(formData),
//         });
//       } else {
//         response = await safeFetchJSON(`${API_BASE}/api/students`, {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });
//         // Optional: After creating student, you can upload photo/signature here
//         // using response.data.id and the preview files (not implemented here per your request)
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
//   }, []);

//   const filtered = students.filter(
//     (s) =>
//       s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.admission_number && s.admission_number.includes(search)) ||
//       (s.roll_number && s.roll_number.includes(search))
//   );

//   // === Render Profile Section Inside Modal Form ===
//   const renderProfileSection = () => {
//     const photoUrl = documents.photo ? `${API_BASE}${documents.photo}` : photoPreview;
//     const signatureUrl = documents.signature ? `${API_BASE}${documents.signature}` : signaturePreview;

//     return (
//       <Row className="mb-4 pb-3 border-bottom">
//         <Col md={12}>
//           <h6 className="mb-3">Student Profile</h6>
//           {docModalError && <Alert variant="danger" size="sm">{docModalError}</Alert>}
//         </Col>

//         {/* Photo */}
//         <Col md={6} className="mb-3">
//           <Form.Group>
//             <Form.Label>Photo</Form.Label>
//             <div className="d-flex align-items-start">
//               <div className="me-3 position-relative" style={{ width: "100px" }}>
//                 {photoUrl ? (
//                   <>
//                     <Image
//                       src={photoUrl}
//                       roundedCircle
//                       width={100}
//                       height={100}
//                       style={{ objectFit: "cover" }}
//                     />
//                     {editMode && (
//                       <OverlayTrigger
//                         placement="top"
//                         overlay={<Tooltip>Delete Photo</Tooltip>}
//                       >
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           className="position-absolute top-0 end-0 rounded-circle p-0"
//                           onClick={() => deleteDocument("photo")}
//                           disabled={deletingPhoto}
//                           style={{ width: "24px", height: "24px" }}
//                         >
//                           {deletingPhoto ? <Spinner size="sm" /> : <FaTimes size={8} />}
//                         </Button>
//                       </OverlayTrigger>
//                     )}
//                   </>
//                 ) : (
//                   <div
//                     className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
//                     style={{ width: 100, height: 100 }}
//                   >
//                     <FaUser size={32} />
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <label className="btn btn-outline-primary btn-sm">
//                   <FaUpload className="me-1" />
//                   {editMode
//                     ? photoUrl
//                       ? "Change Photo"
//                       : "Upload Photo"
//                     : photoPreview
//                     ? "Change Photo"
//                     : "Upload Photo"}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     style={{ display: "none" }}
//                     disabled={uploadingPhoto}
//                   />
//                 </label>
//                 {uploadingPhoto && <Spinner size="sm" className="ms-2" />}
//                 <div className="text-muted small mt-1">JPG/PNG, max 1MB</div>
//               </div>
//             </div>
//           </Form.Group>
//         </Col>

//         {/* Signature */}
//         <Col md={6} className="mb-3">
//           <Form.Group>
//             <Form.Label>Signature</Form.Label>
//             <div className="d-flex align-items-start">
//               <div className="me-3 position-relative" style={{ width: "120px" }}>
//                 {signatureUrl ? (
//                   <>
//                     <Image
//                       src={signatureUrl}
//                       rounded
//                       width={120}
//                       height={50}
//                       style={{ objectFit: "contain", border: "1px solid #ddd" }}
//                     />
//                     {editMode && (
//                       <OverlayTrigger
//                         placement="top"
//                         overlay={<Tooltip>Delete Signature</Tooltip>}
//                       >
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           className="position-absolute top-0 end-0 rounded-circle p-0"
//                           onClick={() => deleteDocument("signature")}
//                           disabled={deletingSignature}
//                           style={{ width: "24px", height: "24px" }}
//                         >
//                           {deletingSignature ? <Spinner size="sm" /> : <FaTimes size={8} />}
//                         </Button>
//                       </OverlayTrigger>
//                     )}
//                   </>
//                 ) : (
//                   <div
//                     className="bg-light d-flex align-items-center justify-content-center text-muted"
//                     style={{ width: 120, height: 50, border: "1px dashed #ccc" }}
//                   >
//                     No signature
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <label className="btn btn-outline-secondary btn-sm">
//                   <FaUpload className="me-1" />
//                   {editMode
//                     ? signatureUrl
//                       ? "Change Signature"
//                       : "Upload Signature"
//                     : signaturePreview
//                     ? "Change Signature"
//                     : "Upload Signature"}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleSignatureChange}
//                     style={{ display: "none" }}
//                     disabled={uploadingSignature}
//                   />
//                 </label>
//                 {uploadingSignature && <Spinner size="sm" className="ms-2" />}
//                 <div className="text-muted small mt-1">JPG/PNG, max 1MB</div>
//               </div>
//             </div>
//           </Form.Group>
//         </Col>
//       </Row>
//     );
//   };

//   return (
//     <Card>
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5>Students</h5>
//           <Button variant="primary" onClick={handleShowCreate}>
//             + Add Student
//           </Button>
//         </div>
//         <Form.Control
//           placeholder="Search student by name, admission no, or roll no..."
//           className="mb-3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         {loading && <Spinner animation="border" className="d-block mx-auto my-3" />}
//         {error && <Alert variant="danger">{error}</Alert>}
//         {!loading && !error && (
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Admission No</th>
//                 <th>Roll No</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length > 0 ? (
//                 filtered.map((s, i) => (
//                   <tr key={s.id}>
//                     <td>{i + 1}</td>
//                     <td>{s.full_name}</td>
//                     <td>{s.class_section}</td>
//                     <td>{s.admission_number || "—"}</td>
//                     <td>{s.roll_number || "—"}</td>
//                     <td className="text-center">
//                       <Link to={`/dashboard/principal/student-view/${s.id}`}>
//                         <Button size="sm" variant="info" className="me-2">
//                           View
//                         </Button>
//                       </Link>
//                       <Button size="sm" variant="warning" className="me-2" onClick={() => handleShowEdit(s)}>
//                         Edit
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>

//       {/* CREATE/EDIT MODAL */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Student" : "Add New Student"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             {/* === INSERTED PROFILE SECTION === */}
//             {renderProfileSection()}

//             {/* === YOUR ORIGINAL FORM FIELDS BELOW (UNCHANGED) === */}
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name *</Form.Label>
//                   <Form.Control
//                     value={formData.first_name}
//                     onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                     isInvalid={!!formErrors.first_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.first_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     value={formData.middle_name}
//                     onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name *</Form.Label>
//                   <Form.Control
//                     value={formData.last_name}
//                     onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                     isInvalid={!!formErrors.last_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.last_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.date_of_birth}
//                     onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
//                     isInvalid={!!formErrors.date_of_birth}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.date_of_birth}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={formData.gender}
//                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     value={formData.mobile_number}
//                     onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Program *</Form.Label>
//                   <Form.Select
//                     value={formData.program_id}
//                     onChange={(e) => setFormData({ ...formData, program_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.program_id}
//                   >
//                     <option value="">Select Program</option>
//                     <option value={1}>B.Com</option>
//                     <option value={2}>B.Sc</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.program_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Division *</Form.Label>
//                   <Form.Select
//                     value={formData.division_id}
//                     onChange={(e) => setFormData({ ...formData, division_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.division_id}
//                   >
//                     <option value="">Select Division</option>
//                     <option value={1}>A</option>
//                     <option value={2}>B</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.division_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Session *</Form.Label>
//                   <Form.Select
//                     value={formData.academic_session_id}
//                     onChange={(e) => setFormData({ ...formData, academic_session_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.academic_session_id}
//                   >
//                     <option value="">Select Session</option>
//                     <option value={1}>2024-25</option>
//                     <option value={2}>2025-26</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.academic_session_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Admission Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.admission_date}
//                     onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
//                     isInvalid={!!formErrors.admission_date}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.admission_date}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Year</Form.Label>
//                   <Form.Select
//                     value={formData.academic_year}
//                     onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
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
//                   onChange={(e) => setFormData({ ...formData, student_status: e.target.value })}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="graduated">Graduated</option>
//                 </Form.Select>
//               </Form.Group>
//             )}

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? <Spinner size="sm" /> : editMode ? "Update Student" : "Add Student"}
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

// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

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
//         `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
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
//           full_name: [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" "),
//           class_section: `${s.program?.name || "—"} - ${s.division?.name || "—"}`,
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
//       date_of_birth: student.date_of_birth ? student.date_of_birth.split("T")[0] : "",
//       gender: student.gender || "male",
//       mobile_number: student.mobile_number || "",
//       email: student.email || "",
//       program_id: student.program_id || "",
//       academic_year: student.academic_year || "FY",
//       division_id: student.division_id || "",
//       academic_session_id: student.academic_session_id || "",
//       admission_date: student.admission_date ? student.admission_date.split("T")[0] : "",
//       category: student.category || "general",
//       student_status: student.student_status || "active",
//     });
//     setFormErrors({});
//     setShowEditModal(true);
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim()) errors.first_name = "First name is required";
//     if (!formData.last_name.trim()) errors.last_name = "Last name is required";
//     if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
//     if (!formData.program_id) errors.program_id = "Program is required";
//     if (!formData.division_id) errors.division_id = "Division is required";
//     if (!formData.academic_session_id) errors.academic_session_id = "Academic session is required";
//     if (!formData.admission_date) errors.admission_date = "Admission date is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setSubmitting(true);
//     try {
//       let response;
//       if (editMode) {
//         response = await safeFetchJSON(`${API_BASE}/api/students/${formData.id}`, {
//           method: "PUT",
//           body: JSON.stringify(formData),
//         });
//       } else {
//         response = await safeFetchJSON(`${API_BASE}/api/students`, {
//           method: "POST",
//           body: JSON.stringify(formData),
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
//   }, []);

//   const filtered = students.filter(
//     (s) =>
//       s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.admission_number && s.admission_number.includes(search)) ||
//       (s.roll_number && s.roll_number.includes(search))
//   );

//   return (
//     <Card>
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5>Students</h5>
//           <Button variant="primary" onClick={handleShowCreate}>
//             + Add Student
//           </Button>
//         </div>
//         <Form.Control
//           placeholder="Search student by name, admission no, or roll no..."
//           className="mb-3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         {loading && <Spinner animation="border" className="d-block mx-auto my-3" />}
//         {error && <Alert variant="danger">{error}</Alert>}
//         {!loading && !error && (
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Admission No</th>
//                 <th>Roll No</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length > 0 ? (
//                 filtered.map((s, i) => (
//                   <tr key={s.id}>
//                     <td>{i + 1}</td>
//                     <td>{s.full_name}</td>
//                     <td>{s.class_section}</td>
//                     <td>{s.admission_number || "—"}</td>
//                     <td>{s.roll_number || "—"}</td>
//                     <td className="text-center">
//                       {/* ✅ Link to dedicated ViewStudent page */}
//                       <Link to={`/dashboard/principal/student-view/${s.id}`}>
//                         <Button size="sm" variant="info" className="me-2">
//                           View
//                         </Button>
//                       </Link>
//                       <Button
//                         size="sm"
//                         variant="warning"
//                         className="me-2"
//                         onClick={() => handleShowEdit(s)}
//                       >
//                         Edit
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>

//       {/* ✅ ONLY Create/Edit Modal — No View Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Student" : "Add New Student"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name *</Form.Label>
//                   <Form.Control
//                     value={formData.first_name}
//                     onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                     isInvalid={!!formErrors.first_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.first_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     value={formData.middle_name}
//                     onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name *</Form.Label>
//                   <Form.Control
//                     value={formData.last_name}
//                     onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                     isInvalid={!!formErrors.last_name}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.last_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.date_of_birth}
//                     onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
//                     isInvalid={!!formErrors.date_of_birth}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.date_of_birth}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={formData.gender}
//                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     value={formData.mobile_number}
//                     onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Program *</Form.Label>
//                   <Form.Select
//                     value={formData.program_id}
//                     onChange={(e) => setFormData({ ...formData, program_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.program_id}
//                   >
//                     <option value="">Select Program</option>
//                     <option value={1}>B.Com</option>
//                     <option value={2}>B.Sc</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.program_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Division *</Form.Label>
//                   <Form.Select
//                     value={formData.division_id}
//                     onChange={(e) => setFormData({ ...formData, division_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.division_id}
//                   >
//                     <option value="">Select Division</option>
//                     <option value={1}>A</option>
//                     <option value={2}>B</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.division_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Session *</Form.Label>
//                   <Form.Select
//                     value={formData.academic_session_id}
//                     onChange={(e) => setFormData({ ...formData, academic_session_id: Number(e.target.value) })}
//                     isInvalid={!!formErrors.academic_session_id}
//                   >
//                     <option value="">Select Session</option>
//                     <option value={1}>2024-25</option>
//                     <option value={2}>2025-26</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{formErrors.academic_session_id}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Admission Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={formData.admission_date}
//                     onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
//                     isInvalid={!!formErrors.admission_date}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.admission_date}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Year</Form.Label>
//                   <Form.Select
//                     value={formData.academic_year}
//                     onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
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
//                   onChange={(e) => setFormData({ ...formData, student_status: e.target.value })}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="graduated">Graduated</option>
//                 </Form.Select>
//               </Form.Group>
//             )}

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? <Spinner size="sm" /> : editMode ? "Update Student" : "Add Student"}
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
  Modal,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const PrincipalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // >>> NEW: States for dynamic dropdowns
  const [programs, setPrograms] = useState([]);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // Create/Update Modal Only
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  // >>> NEW: Fetch Programs
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

  // >>> NEW: Fetch Academic Sessions
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

  const handleShowCreate = () => {
    setEditMode(false);
    setFormData({
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
    setFormErrors({});
    setShowEditModal(true);
  };

  const handleShowEdit = (student) => {
    setEditMode(true);
    setFormData({
      id: student.id,
      first_name: student.first_name || "",
      middle_name: student.middle_name || "",
      last_name: student.last_name || "",
      date_of_birth: student.date_of_birth
        ? student.date_of_birth.split("T")[0]
        : "",
      gender: student.gender || "male",
      mobile_number: student.mobile_number || "",
      email: student.email || "",
      program_id: student.program_id || "",
      academic_year: student.academic_year || "FY",
      division_id: student.division_id || "",
      academic_session_id: student.academic_session_id || "",
      admission_date: student.admission_date
        ? student.admission_date.split("T")[0]
        : "",
      category: student.category || "general",
      student_status: student.student_status || "active",
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim())
      errors.first_name = "First name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required";
    if (!formData.date_of_birth)
      errors.date_of_birth = "Date of birth is required";
    if (!formData.program_id) errors.program_id = "Program is required";
    if (!formData.division_id) errors.division_id = "Division is required";
    if (!formData.academic_session_id)
      errors.academic_session_id = "Academic session is required";
    if (!formData.admission_date)
      errors.admission_date = "Admission date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      // Build base payload (common fields)
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
      };

      // Only include status field in EDIT mode (and rename it to 'status')
      if (editMode) {
        payload.status = formData.student_status; // API expects 'status', not 'student_status'
      }

      let response;
      if (editMode) {
        response = await safeFetchJSON(
          `${API_BASE}/api/students/${formData.id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await safeFetchJSON(`${API_BASE}/api/students`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (response.success) {
        setShowEditModal(false);
        fetchStudents();
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

  useEffect(() => {
    fetchStudents();
    // >>> NEW: Fetch programs and sessions on mount
    fetchPrograms();
    fetchAcademicSessions();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.admission_number && s.admission_number.includes(search)) ||
      (s.roll_number && s.roll_number.includes(search))
  );

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Students</h5>
          <Button variant="primary" onClick={handleShowCreate}>
            + Add Student
          </Button>
        </div>
        <Form.Control
          placeholder="Search student by name, admission no, or roll no..."
          className="mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading && (
          <Spinner animation="border" className="d-block mx-auto my-3" />
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
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
                      {/* ✅ Link to dedicated ViewStudent page */}
                      <Link to={`/dashboard/principal/student-view/${s.id}`}>
                        <Button size="sm" variant="info" className="me-2">
                          View
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => handleShowEdit(s)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>

      {/* ✅ ONLY Create/Edit Modal — No View Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    isInvalid={!!formErrors.first_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.first_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    isInvalid={!!formErrors.last_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.last_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
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
                    isInvalid={!!formErrors.date_of_birth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.date_of_birth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={6}>
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
              <Col md={6}>
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
              <Col md={4}>
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
                    isInvalid={!!formErrors.program_id}
                    disabled={programsLoading}
                  >
                    <option value="">Select Program</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.short_name} {/* <<< Display short_name */}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.program_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
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
                    isInvalid={!!formErrors.division_id}
                  >
                    <option value="">Select Division</option>
                    <option value={1}>A</option>
                    <option value={2}>B</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.division_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
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
                    isInvalid={!!formErrors.academic_session_id}
                    disabled={sessionsLoading}
                  >
                    <option value="">Select Session</option>
                    {academicSessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.session_name} {/* <<< Display session_name */}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.academic_session_id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
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
                    isInvalid={!!formErrors.admission_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.admission_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
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

            {editMode && (
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
            )}

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <Spinner size="sm" />
                ) : editMode ? (
                  "Update Student"
                ) : (
                  "Add Student"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default PrincipalStudents;
