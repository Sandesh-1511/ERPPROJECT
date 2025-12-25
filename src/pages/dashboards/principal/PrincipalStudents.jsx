// // src/pages/principal/Students.jsx
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
// } from "react-bootstrap";

// // ✅ FIXED: Removed trailing spaces
// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [guardians, setGuardians] = useState([]);
//   const [documents, setDocuments] = useState({ photo: null, signature: null });
//   const [guardianLoading, setGuardianLoading] = useState(false);
//   const [docLoading, setDocLoading] = useState(false);

//   const [showAddGuardianModal, setShowAddGuardianModal] = useState(false);
//   const [guardianForm, setGuardianForm] = useState({
//     full_name: "",
//     relation: "",
//     mobile_number: "",
//     email: "",
//     address: "",
//     occupation: "",
//     annual_income: "",
//     is_primary_contact: false,
//   });

//   const [showAddStudentModal, setShowAddStudentModal] = useState(false);
//   const [addStudentForm, setAddStudentForm] = useState({
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     email: "",
//     mobile_number: "",
//     date_of_birth: "",
//     gender: "male",
//     category: "general",
//     program_id: "",
//     division_id: "",
//   });

//   const [uploading, setUploading] = useState({ photo: false, signature: false });
//   const [uploadError, setUploadError] = useState({ photo: "", signature: "" });

//   const safeFetchJSON = async (url, options = {}) => {
//     const res = await fetch(url, options);
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
//       // ✅ REAL API CALL — no mock
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

//   const fetchDocuments = async (studentId) => {
//     setDocLoading(true);
//     try {
//       const json = await safeFetchJSON(`${API_BASE}/api/students/${studentId}/documents`);
//       if (json.success) {
//         setDocuments(json.data || { photo: null, signature: null });
//       } else {
//         setDocuments({ photo: null, signature: null });
//       }
//     } catch (err) {
//       console.error("Fetch Documents Error:", err);
//       setDocuments({ photo: null, signature: null });
//     } finally {
//       setDocLoading(false);
//     }
//   };

//   const handleFileUpload = async (type, file) => {
//     if (!file || !selectedStudent) return;
//     if (!file.type.startsWith("image/")) {
//       setUploadError((prev) => ({ ...prev, [type]: "Only image files allowed" }));
//       return;
//     }

//     const formData = new FormData();
//     formData.append(type === "photo" ? "photo" : "signature", file);

//     setUploading((prev) => ({ ...prev, [type]: true }));
//     setUploadError((prev) => ({ ...prev, [type]: "" }));

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/students/${selectedStudent.id}/documents/${type}`,
//         { method: "POST", body: formData }
//       );
//       const contentType = res.headers.get("content-type");
//       let result;
//       if (contentType && contentType.includes("application/json")) {
//         result = await res.json();
//       } else {
//         const text = await res.text();
//         throw new Error(`Non-JSON response during upload: ${text.substring(0, 80)}...`);
//       }

//       if (result.success) {
//         fetchDocuments(selectedStudent.id);
//       } else {
//         setUploadError((prev) => ({ ...prev, [type]: result.message || `${type} upload failed` }));
//       }
//     } catch (err) {
//       console.error("Upload Error:", err);
//       setUploadError((prev) => ({ ...prev, [type]: err.message || "Upload failed" }));
//     } finally {
//       setUploading((prev) => ({ ...prev, [type]: false }));
//     }
//   };

//   const handleDeleteDocument = async (type) => {
//     if (!window.confirm(`Are you sure you want to delete the ${type}?`)) return;
//     try {
//       const res = await fetch(
//         `${API_BASE}/api/students/${selectedStudent.id}/documents/${type}`,
//         { method: "DELETE" }
//       );
//       const result = await res.json();
//       if (result.success) {
//         fetchDocuments(selectedStudent.id);
//       } else {
//         alert("Error: " + (result.message || "Deletion failed"));
//       }
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   const handleAddGuardian = async (e) => {
//     e.preventDefault();
//     if (!selectedStudent) return;
//     try {
//       const res = await fetch(
//         `${API_BASE}/api/students/${selectedStudent.id}/guardians`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(guardianForm),
//         }
//       );
//       const json = await res.json();
//       if (json.success) {
//         alert("Guardian added successfully!");
//         setShowAddGuardianModal(false);
//         setGuardianForm({
//           full_name: "",
//           relation: "",
//           mobile_number: "",
//           email: "",
//           address: "",
//           occupation: "",
//           annual_income: "",
//           is_primary_contact: false,
//         });
//         fetchGuardians(selectedStudent.id);
//       } else {
//         alert("Error: " + (json.message || "Failed to add guardian"));
//       }
//     } catch (err) {
//       alert("Network error: " + err.message);
//     }
//   };

//   const handleCreateStudent = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${API_BASE}/api/students`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(addStudentForm),
//       });
//       const json = await res.json();
//       if (json.success) {
//         alert("Student created successfully!");
//         setShowAddStudentModal(false);
//         setAddStudentForm({
//           first_name: "",
//           middle_name: "",
//           last_name: "",
//           email: "",
//           mobile_number: "",
//           date_of_birth: "",
//           gender: "male",
//           category: "general",
//           program_id: "",
//           division_id: "",
//         });
//         fetchStudents();
//       } else {
//         alert("Error: " + (json.message || "Failed to create student"));
//       }
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   const handleView = async (student) => {
//     setSelectedStudent(student);
//     await Promise.all([
//       fetchGuardians(student.id),
//       fetchDocuments(student.id),
//     ]);
//     setShowViewModal(true);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filtered = students.filter((s) =>
//     s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//     (s.admission_number && s.admission_number.includes(search)) ||
//     (s.roll_number && s.roll_number.includes(search))
//   );

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Student Management</h4>
//         <Button variant="primary" size="sm" onClick={() => setShowAddStudentModal(true)}>
//           + Add Student
//         </Button>
//       </div>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Search by name, admission no, or roll no..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </Form>

//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" variant="primary" />
//           <p className="mt-2 text-muted">Loading students...</p>
//         </div>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Admission No</th>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Class - Section</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center text-muted py-4">
//                   No students found
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.admission_number || "—"}</td>
//                   <td>{student.roll_number || "—"}</td>
//                   <td>{student.full_name}</td>
//                   <td>{student.class_section}</td>
//                   <td>{student.email || "—"}</td>
//                   <td>{student.mobile_number || "—"}</td>
//                   <td>
//                     <Badge bg={student.student_status === "active" ? "success" : "secondary"}>
//                       {student.student_status || "inactive"}
//                     </Badge>
//                   </td>
//                   <td>
//                     <Button
//                       variant="outline-primary"
//                       size="sm"
//                       className="me-1"
//                       onClick={() => handleView(student)}
//                     >
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* ─── VIEW STUDENT MODAL ─────────────────────────────── */}
//       <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Student Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStudent && (
//             <>
//               <h5 className="mb-3">{selectedStudent.full_name}</h5>

//               <Row className="mb-4">
//                 <Col md={4} className="text-center">
//                   <h6 className="mb-2">Photo</h6>
//                   {documents.photo ? (
//                     <div>
//                       <Image
//                         src={`${API_BASE}${documents.photo}`}
//                         rounded
//                         width={120}
//                         height={120}
//                         style={{ objectFit: "cover" }}
//                         className="border"
//                       />
//                       <div className="mt-2">
//                         <Button
//                           size="sm"
//                           variant="outline-danger"
//                           onClick={() => handleDeleteDocument("photo")}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="bg-light d-flex align-items-center justify-content-center text-muted"
//                       style={{ width: "120px", height: "120px", borderRadius: "8px" }}
//                     >
//                       No Photo
//                     </div>
//                   )}
//                   <div className="mt-2">
//                     <label className="btn btn-sm btn-outline-primary">
//                       {uploading.photo ? "Uploading..." : "Upload Photo"}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleFileUpload("photo", e.target.files?.[0])}
//                         style={{ display: "none" }}
//                       />
//                     </label>
//                   </div>
//                   {uploadError.photo && (
//                     <div className="text-danger small mt-1">{uploadError.photo}</div>
//                   )}
//                 </Col>

//                 <Col md={4} className="text-center">
//                   <h6 className="mb-2">Signature</h6>
//                   {documents.signature ? (
//                     <div>
//                       <Image
//                         src={`${API_BASE}${documents.signature}`}
//                         style={{ width: "150px", height: "60px", objectFit: "contain" }}
//                         className="border p-1 bg-white"
//                       />
//                       <div className="mt-2">
//                         <Button
//                           size="sm"
//                           variant="outline-danger"
//                           onClick={() => handleDeleteDocument("signature")}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="bg-light d-flex align-items-center justify-content-center text-muted"
//                       style={{ width: "150px", height: "60px", borderRadius: "4px" }}
//                     >
//                       No Signature
//                     </div>
//                   )}
//                   <div className="mt-2">
//                     <label className="btn btn-sm btn-outline-primary">
//                       {uploading.signature ? "Uploading..." : "Upload Signature"}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleFileUpload("signature", e.target.files?.[0])}
//                         style={{ display: "none" }}
//                       />
//                     </label>
//                   </div>
//                   {uploadError.signature && (
//                     <div className="text-danger small mt-1">{uploadError.signature}</div>
//                   )}
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={6}>
//                   <p><strong>Admission No:</strong> {selectedStudent.admission_number || "—"}</p>
//                   <p><strong>Roll No:</strong> {selectedStudent.roll_number || "—"}</p>
//                   <p><strong>Date of Birth:</strong> {selectedStudent.date_of_birth || "—"}</p>
//                   <p><strong>Gender:</strong> {selectedStudent.gender || "—"}</p>
//                   <p><strong>Category:</strong> {selectedStudent.category || "—"}</p>
//                 </Col>
//                 <Col md={6}>
//                   <p><strong>Email:</strong> {selectedStudent.email || "—"}</p>
//                   <p><strong>Mobile:</strong> {selectedStudent.mobile_number || "—"}</p>
//                   <p><strong>Program:</strong> {selectedStudent.program?.name || "—"}</p>
//                   <p><strong>Division:</strong> {selectedStudent.division?.name || "—"}</p>
//                   <p><strong>Status:</strong> {selectedStudent.student_status || "—"}</p>
//                 </Col>
//               </Row>

//               <hr />

//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6>Guardians ({guardians.length})</h6>
//                 <Button
//                   variant="outline-primary"
//                   size="sm"
//                   onClick={() => setShowAddGuardianModal(true)}
//                 >
//                   + Add Guardian
//                 </Button>
//               </div>

//               {guardianLoading ? (
//                 <div className="text-center py-2">
//                   <Spinner animation="border" size="sm" />
//                 </div>
//               ) : guardians.length === 0 ? (
//                 <p className="text-muted">No guardians added.</p>
//               ) : (
//                 guardians.map((g) => (
//                   <Card key={g.id} className="mb-2">
//                     <Card.Body>
//                       <strong>{g.full_name}</strong> ({g.relation})<br />
//                       Mobile: {g.mobile_number || "—"} | Email: {g.email || "—"}<br />
//                       Occupation: {g.occupation || "—"} | Annual Income: ₹{g.annual_income || "—"}<br />
//                       Address: {g.address || "—"}<br />
//                       {g.is_primary_contact && (
//                         <Badge bg="primary" className="mt-1">Primary Contact</Badge>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 ))
//               )}
//             </>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* ADD GUARDIAN MODAL */}
//       <Modal show={showAddGuardianModal} onHide={() => setShowAddGuardianModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Guardian</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAddGuardian}>
//             <Form.Group className="mb-2">
//               <Form.Label>Full Name *</Form.Label>
//               <Form.Control
//                 required
//                 value={guardianForm.full_name}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, full_name: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Relation *</Form.Label>
//               <Form.Control
//                 required
//                 value={guardianForm.relation}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, relation: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Mobile *</Form.Label>
//               <Form.Control
//                 required
//                 value={guardianForm.mobile_number}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, mobile_number: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={guardianForm.email}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, email: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 value={guardianForm.address}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, address: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Occupation</Form.Label>
//               <Form.Control
//                 value={guardianForm.occupation}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, occupation: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Annual Income (₹)</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={guardianForm.annual_income}
//                 onChange={(e) =>
//                   setGuardianForm({ ...guardianForm, annual_income: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Check
//               type="checkbox"
//               label="Primary Contact"
//               checked={guardianForm.is_primary_contact}
//               onChange={(e) =>
//                 setGuardianForm({ ...guardianForm, is_primary_contact: e.target.checked })
//               }
//             />
//             <div className="mt-3">
//               <Button variant="primary" type="submit">
//                 Add Guardian
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* ADD STUDENT MODAL */}
//       <Modal show={showAddStudentModal} onHide={() => setShowAddStudentModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreateStudent}>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name *</Form.Label>
//                   <Form.Control
//                     required
//                     value={addStudentForm.first_name}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, first_name: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Middle Name</Form.Label>
//                   <Form.Control
//                     value={addStudentForm.middle_name}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, middle_name: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name *</Form.Label>
//                   <Form.Control
//                     required
//                     value={addStudentForm.last_name}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, last_name: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Email *</Form.Label>
//               <Form.Control
//                 type="email"
//                 required
//                 value={addStudentForm.email}
//                 onChange={(e) =>
//                   setAddStudentForm({ ...addStudentForm, email: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number *</Form.Label>
//                   <Form.Control
//                     required
//                     value={addStudentForm.mobile_number}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, mobile_number: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     required
//                     value={addStudentForm.date_of_birth}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, date_of_birth: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={addStudentForm.gender}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, gender: e.target.value })
//                     }
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Select
//                     value={addStudentForm.category}
//                     onChange={(e) =>
//                       setAddStudentForm({ ...addStudentForm, category: e.target.value })
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

//             <Button variant="primary" type="submit" className="mt-2">
//               Create Student
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default PrincipalStudents;






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
// } from "react-bootstrap";

// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [guardians, setGuardians] = useState([]);
//   const [documents, setDocuments] = useState({ photo: null, signature: null });
//   const [guardianLoading, setGuardianLoading] = useState(false);
//   const [docLoading, setDocLoading] = useState(false);

//   const token = localStorage.getItem("token");

  
//      const safeFetchJSON = async (url, options = {}) => {
//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       Accept: "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//   });

//   const contentType = res.headers.get("content-type");
//   if (!contentType || !contentType.includes("application/json")) {
//     const text = await res.text();
//     throw new Error(
//       `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
//     );
//   }

//   return await res.json();
// };
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
//       setError("Failed to load students:" ,`${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- FETCH GUARDIANS ---------------- */
//   const fetchGuardians = async (studentId) => {
//     setGuardianLoading(true);
//     try {
//       const json = await safeFetchJSON(
//        ` ${API_BASE}/api/students/${studentId}/guardians`
//       );
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
//       const json = await safeFetchJSON(
//         `${API_BASE}/api/students/${studentId}/documents`
//       );
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
//     await Promise.all([
//       fetchGuardians(student.id),
//       fetchDocuments(student.id),
//     ]);
//     setShowViewModal(true);
//   };

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
//         <h5 className="mb-3">Students</h5>

//         <Form.Control
//           placeholder="Search student..."
//           className="mb-3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {loading && <Spinner animation="border" />}
//         {error && <Alert variant="danger">{error}</Alert>}

//         {!loading && !error && (
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Admission No</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((s, i) => (
//                 <tr key={s.id}>
//                   <td>{i + 1}</td>
//                   <td>{s.full_name}</td>
//                   <td>{s.class_section}</td>
//                   <td>{s.admission_number || "—"}</td>
//                   <td>
//                     <Button size="sm" onClick={() => handleView(s)}>
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default PrincipalStudents;





// src/pages/principal/Students.jsx
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
  Badge,
  Image,
} from "react-bootstrap";

// ✅ CORRECTED: Removed trailing spaces and /schoolerp
const API_BASE = "https://serp.lemmecode.in";

const PrincipalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [guardians, setGuardians] = useState([]);
  const [documents, setDocuments] = useState({ photo: null, signature: null });
  const [guardianLoading, setGuardianLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);

  // Add Student Modal
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [addStudentForm, setAddStudentForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "male",
    date_of_birth: "",
    mobile_number: "",
    email: "",
    category: "general",
    address: "",
  });
  const [guardianInfo, setGuardianInfo] = useState({
    full_name: "",
    relation: "father",
    mobile_number: "",
    email: "",
    address: "",
    occupation: "",
  });
  const [uploadingDoc, setUploadingDoc] = useState({ photo: false, signature: false });

  const token = localStorage.getItem("token");

  // Utility: authenticated fetch
  const apiFetch = (url, options = {}) => {
    return fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  };

  // ================== FETCH STUDENTS ==================
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/students");
      const json = await res.json();

      if (!json.success) throw new Error(json.message || "Failed to load students");
      
      const enriched = json.data.data.map((s) => ({
        ...s,
        full_name: [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" "),
        class_section: `${s.program?.name || "—"} - ${s.division?.name || "—"}`,
      }));
      setStudents(enriched);
    } catch (err) {
      console.error("Fetch Students Error:", err);
      setError(`Failed to load students: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ================== FETCH GUARDIANS ==================
  const fetchGuardians = async (studentId) => {
    setGuardianLoading(true);
    try {
      const res = await apiFetch(`/api/students/${studentId}/guardians`);
      const json = await res.json();
      setGuardians(json.success ? json.data || [] : []);
    } catch (err) {
      console.error("Fetch Guardians Error:", err);
      setGuardians([]);
    } finally {
      setGuardianLoading(false);
    }
  };

  // ================== FETCH DOCUMENTS ==================
  const fetchDocuments = async (studentId) => {
    setDocLoading(true);
    try {
      const res = await apiFetch(`/api/students/${studentId}/documents`);
      const json = await res.json();
      setDocuments(json.success ? json.data : { photo: null, signature: null });
    } catch (err) {
      console.error("Fetch Documents Error:", err);
      setDocuments({ photo: null, signature: null });
    } finally {
      setDocLoading(false);
    }
  };

  // ================== VIEW STUDENT ==================
  const handleView = async (student) => {
    setSelectedStudent(student);
    await Promise.all([
      fetchGuardians(student.id),
      fetchDocuments(student.id),
    ]);
    setShowViewModal(true);
  };

  // ================== CREATE STUDENT ==================
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create student
      const studentRes = await apiFetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: addStudentForm.first_name,
          middle_name: addStudentForm.middle_name,
          last_name: addStudentForm.last_name,
          gender: addStudentForm.gender,
          date_of_birth: addStudentForm.date_of_birth,
          mobile_number: addStudentForm.mobile_number,
          email: addStudentForm.email,
          category: addStudentForm.category,
          address: addStudentForm.address,
        }),
      });
      const studentJson = await studentRes.json();
      if (!studentJson.success) throw new Error(studentJson.message || "Student creation failed");
      const newStudent = studentJson.data;

      // Step 2: Add guardian (if provided)
      if (guardianInfo.full_name) {
        await apiFetch(`/api/students/${newStudent.id}/guardians`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: guardianInfo.full_name,
            relation: guardianInfo.relation,
            mobile_number: guardianInfo.mobile_number,
            email: guardianInfo.email,
            address: guardianInfo.address,
            occupation: guardianInfo.occupation,
            is_primary_contact: true,
          }),
        });
      }

      alert("Student created successfully!");
      setShowAddStudentModal(false);
      fetchStudents(); // Refresh list
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ================== UPLOAD DOCUMENT ==================
  const handleFileUpload = async (type, file) => {
    if (!file || !selectedStudent) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append(type === "photo" ? "photo" : "signature", file);

    setUploadingDoc((prev) => ({ ...prev, [type]: true }));
    try {
      const res = await apiFetch(
        `/api/students/${selectedStudent.id}/documents/${type}`,
        { method: "POST", body: formData }
        // ⚠️ No Content-Type header — let browser set it with boundary
      );
      const json = await res.json();
      if (json.success) {
        fetchDocuments(selectedStudent.id);
      } else {
        throw new Error(json.message || `${type} upload failed`);
      }
    } catch (err) {
      alert("Upload error: " + err.message);
    } finally {
      setUploadingDoc((prev) => ({ ...prev, [type]: false }));
    }
  };

  // ================== DELETE DOCUMENT ==================
  const handleDeleteDocument = async (type) => {
    if (!window.confirm(`Delete ${type}?`)) return;
    try {
      const res = await apiFetch(`/api/students/${selectedStudent.id}/documents/${type}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchDocuments(selectedStudent.id);
      } else {
        throw new Error(json.message || "Deletion failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ================== INIT ==================
  useEffect(() => {
    fetchStudents();
  }, []);

  // ================== FILTER ==================
  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.admission_number && s.admission_number.includes(search)) ||
      (s.roll_number && s.roll_number.includes(search))
  );

  // ================== RENDER ==================
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Students</h5>
          <Button variant="primary" size="sm" onClick={() => setShowAddStudentModal(true)}>
            + Add Student
          </Button>
        </div>

        <Form.Control
          placeholder="Search student..."
          className="mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Class</th>
                <th>Admission No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td>{s.full_name}</td>
                  <td>{s.class_section}</td>
                  <td>{s.admission_number || "—"}</td>
                  <td>
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(s)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      {/* ========== VIEW MODAL ========== */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <>
              <h5 className="mb-3">{selectedStudent.full_name}</h5>

              <Row className="mb-4">
                <Col md={4} className="text-center">
                  <h6 className="mb-2">Photo</h6>
                  {documents.photo ? (
                    <div>
                      <Image
                        src={`${API_BASE}${documents.photo}`}
                        rounded
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                        className="border"
                      />
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteDocument("photo")}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-light d-flex align-items-center justify-content-center text-muted"
                      style={{ width: "120px", height: "120px", borderRadius: "8px" }}
                    >
                      No Photo
                    </div>
                  )}
                  <div className="mt-2">
                    <label className="btn btn-sm btn-outline-primary">
                      {uploadingDoc.photo ? "Uploading..." : "Upload Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("photo", e.target.files?.[0])}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </Col>

                <Col md={4} className="text-center">
                  <h6 className="mb-2">Signature</h6>
                  {documents.signature ? (
                    <div>
                      <Image
                        src={`${API_BASE}${documents.signature}`}
                        style={{ width: "150px", height: "60px", objectFit: "contain" }}
                        className="border p-1 bg-white"
                      />
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteDocument("signature")}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-light d-flex align-items-center justify-content-center text-muted"
                      style={{ width: "150px", height: "60px", borderRadius: "4px" }}
                    >
                      No Signature
                    </div>
                  )}
                  <div className="mt-2">
                    <label className="btn btn-sm btn-outline-primary">
                      {uploadingDoc.signature ? "Uploading..." : "Upload Signature"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("signature", e.target.files?.[0])}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <p><strong>Admission No:</strong> {selectedStudent.admission_number || "—"}</p>
                  <p><strong>Roll No:</strong> {selectedStudent.roll_number || "—"}</p>
                  <p><strong>Date of Birth:</strong> {selectedStudent.date_of_birth || "—"}</p>
                  <p><strong>Gender:</strong> {selectedStudent.gender || "—"}</p>
                  <p><strong>Category:</strong> {selectedStudent.category || "—"}</p>
                  <p><strong>Mobile:</strong> {selectedStudent.mobile_number || "—"}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Email:</strong> {selectedStudent.email || "—"}</p>
                  <p><strong>Program:</strong> {selectedStudent.program?.name || "—"}</p>
                  <p><strong>Division:</strong> {selectedStudent.division?.name || "—"}</p>
                  <p><strong>Status:</strong> {selectedStudent.student_status || "—"}</p>
                  <p><strong>Address:</strong> {selectedStudent.address || "—"}</p>
                </Col>
              </Row>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6>Guardians ({guardians.length})</h6>
              </div>

              {guardianLoading ? (
                <div className="text-center py-2">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : guardians.length === 0 ? (
                <p className="text-muted">No guardians added.</p>
              ) : (
                guardians.map((g) => (
                  <Card key={g.id} className="mb-2">
                    <Card.Body>
                      <strong>{g.full_name}</strong> ({g.relation})<br />
                      Mobile: {g.mobile_number || "—"} | Email: {g.email || "—"}<br />
                      Occupation: {g.occupation || "—"}<br />
                      Address: {g.address || "—"}<br />
                      {g.is_primary_contact && (
                        <Badge bg="primary" className="mt-1">Primary Contact</Badge>
                      )}
                    </Card.Body>
                  </Card>
                ))
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* ========== ADD STUDENT MODAL ========== */}
      <Modal show={showAddStudentModal} onHide={() => setShowAddStudentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddStudent}>
            <h6 className="mb-3">Student Information</h6>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    required
                    value={addStudentForm.first_name}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, first_name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    value={addStudentForm.middle_name}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, middle_name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    required
                    value={addStudentForm.last_name}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, last_name: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={addStudentForm.gender}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, gender: e.target.value })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={addStudentForm.date_of_birth}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, date_of_birth: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    value={addStudentForm.mobile_number}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, mobile_number: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={addStudentForm.email}
                    onChange={(e) => setAddStudentForm({ ...addStudentForm, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={addStudentForm.category}
                onChange={(e) => setAddStudentForm({ ...addStudentForm, category: e.target.value })}
              >
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={addStudentForm.address}
                onChange={(e) => setAddStudentForm({ ...addStudentForm, address: e.target.value })}
              />
            </Form.Group>

            <h6 className="mb-3 mt-4">Guardian Information</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guardian Full Name</Form.Label>
                  <Form.Control
                    value={guardianInfo.full_name}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, full_name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Relation</Form.Label>
                  <Form.Select
                    value={guardianInfo.relation}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, relation: e.target.value })}
                  >
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="guardian">Guardian</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guardian Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    value={guardianInfo.mobile_number}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, mobile_number: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guardian Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={guardianInfo.email}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Guardian Occupation</Form.Label>
              <Form.Control
                value={guardianInfo.occupation}
                onChange={(e) => setGuardianInfo({ ...guardianInfo, occupation: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Guardian Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={guardianInfo.address}
                onChange={(e) => setGuardianInfo({ ...guardianInfo, address: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Add Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default PrincipalStudents;