

// // src/pages/principal/StudentProfile.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Badge,
//   Image,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import {
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaCalendar,
//   FaHome,
//   FaUsers,
//   FaIdCard,
//   FaPlus,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";

// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const ViewStudent = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Guardian CRUD states
//   const [guardians, setGuardians] = useState([]);
//   const [guardianLoading, setGuardianLoading] = useState(false);
//   const [guardianError, setGuardianError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
//   const [editingGuardian, setEditingGuardian] = useState(null);
//   const [formData, setFormData] = useState({
//     guardian_type: "",
//     full_name: "",
//     occupation: "",
//     annual_income: "",
//     mobile_number: "",
//     email: "",
//     relation: "",
//     address: "",
//     is_primary_contact: false,
//   });

//   const token = localStorage.getItem("token");

//   const safeFetch = async (url, options = {}) => {
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

//   // Fetch student
//   useEffect(() => {
//     const fetchStudent = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await safeFetch(`${API_BASE}/api/students/${id}`);
//         if (res.success && res.data) {
//           setStudent(res.data);
//         } else {
//           throw new Error(res.message || "Student not found");
//         }
//       } catch (err) {
//         console.error("Fetch Student Error:", err);
//         setError(`Failed to load student: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchStudent();
//   }, [id]);

//   // Fetch guardians when student is loaded
//   useEffect(() => {
//     if (student) {
//       fetchGuardians();
//     }
//   }, [student]);

//   const fetchGuardians = async () => {
//     setGuardianLoading(true);
//     setGuardianError("");
//     try {
//       const res = await safeFetch(`${API_BASE}/api/students/${id}/guardians`);
//       if (res.success && Array.isArray(res.data)) {
//         setGuardians(res.data);
//       } else {
//         throw new Error(res.message || "Failed to load guardians");
//       }
//     } catch (err) {
//       console.error("Fetch Guardians Error:", err);
//       setGuardianError(`Failed to load guardians: ${err.message}`);
//     } finally {
//       setGuardianLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const openAddModal = () => {
//     setModalMode("add");
//     setEditingGuardian(null);
//     setFormData({
//       guardian_type: "",
//       full_name: "",
//       occupation: "",
//       annual_income: "",
//       mobile_factor: "",
//       mobile_number: "",
//       email: "",
//       relation: "",
//       address: "",
//       is_primary_contact: false,
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (guardian) => {
//     setModalMode("edit");
//     setEditingGuardian(guardian);
//     setFormData({
//       guardian_type: guardian.guardian_type || "",
//       full_name: guardian.full_name || "",
//       occupation: guardian.occupation || "",
//       annual_income: guardian.annual_income || "",
//       mobile_number: guardian.mobile_number || "",
//       email: guardian.email || "",
//       relation: guardian.relation || "",
//       address: guardian.address || "",
//       is_primary_contact: guardian.is_primary_contact || false,
//     });
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setGuardianError("");
//     try {
//       let res;
//       if (modalMode === "add") {
//         res = await safeFetch(`${API_BASE}/api/students/${id}/guardians`, {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });
//       } else {
//         // For update, guardian_type may be omitted per your note
//         const updateData = { ...formData };
//         delete updateData.guardian_type; // optional per API spec
//         res = await safeFetch(
//           `${API_BASE}/api/students/${id}/guardians/${editingGuardian.id}`,
//           {
//             method: "PUT",
//             body: JSON.stringify(updateData),
//           }
//         );
//       }

//       if (res.success) {
//         fetchGuardians(); // refresh list
//         setShowModal(false);
//       } else {
//         throw new Error(res.message || "Operation failed");
//       }
//     } catch (err) {
//       console.error("Guardian CRUD Error:", err);
//       setGuardianError(`Error: ${err.message}`);
//     }
//   };

//   const handleDelete = async (guardianId) => {
//     if (!window.confirm("Are you sure you want to delete this guardian?")) return;
//     try {
//       const res = await safeFetch(
//         `${API_BASE}/api/students/${id}/guardians/${guardianId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (res.success) {
//         fetchGuardians();
//       } else {
//         throw new Error(res.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error("Delete Guardian Error:", err);
//       setGuardianError(`Delete failed: ${err.message}`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <Alert variant="danger">{error}</Alert>
//         <div className="text-center">
//           <Link to="/dashboard/principal/students">
//             <Button variant="primary">← Back to Students</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="container mt-5 text-center">
//         <h4>Student not found</h4>
//         <Link to="/dashboard/principal/students">
//           <Button variant="primary">← Back to Students</Button>
//         </Link>
//       </div>
//     );
//   }

//   const fullName = [student.first_name, student.middle_name, student.last_name]
//     .filter(Boolean)
//     .join(" ");
//   const dob = student.date_of_birth
//     ? new Date(student.date_of_birth).toLocaleDateString()
//     : "—";
//   const admissionDate = student.admission_date
//     ? new Date(student.admission_date).toLocaleDateString()
//     : "—";

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Student Profile</h2>
//         <Link to="/dashboard/principal/students">
//           <Button variant="outline-secondary">← Back to List</Button>
//         </Link>
//       </div>

//       <Card className="shadow-sm">
//         <Card.Body>
//           <Row>
//             {/* Profile Image */}
//             <Col md={4} className="text-center mb-4 mb-md-0">
//               <div className="position-relative d-inline-block">
//                 {student.photo_path ? (
//                   <Image
//                     src={`${API_BASE}${student.photo_path}`}
//                     roundedCircle
//                     width={150}
//                     height={150}
//                     style={{ objectFit: "cover" }}
//                   />
//                 ) : (
//                   <div
//                     className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
//                     style={{ width: 150, height: 150 }}
//                   >
//                     <FaUser size={48} />
//                   </div>
//                 )}
//               </div>
//               <h4 className="mt-3">{fullName}</h4>
//               <Badge
//                 bg={
//                   student.student_status === "active" ? "success" : "secondary"
//                 }
//                 className="mt-2"
//               >
//                 {student.student_status}
//               </Badge>
//             </Col>

//             {/* Details */}
//             <Col md={8}>
//               <Row>
//                 <Col sm={6} className="mb-3">
//                   <strong>Admission No:</strong> {student.admission_number || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Roll No:</strong> {student.roll_number || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Class:</strong>{" "}
//                   {student.program?.name && student.division?.division_name
//                     ? `${student.program.name} - ${student.division.division_name}`
//                     : "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Academic Year:</strong> {student.academic_year || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Gender:</strong> {student.gender || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Category:</strong> {student.category || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Date of Birth:</strong> {dob}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Admission Date:</strong> {admissionDate}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Email:</strong> {student.email || "—"}
//                 </Col>
//                 <Col sm={6} className="mb-3">
//                   <strong>Mobile:</strong> {student.mobile_number || "—"}
//                 </Col>
//                 {/* <Col sm={12} className="mb-3">
//                   <strong>Current Address:</strong>{" "}
//                   {student.current_address || student.permanent_address || "—"}
//                 </Col> */}
//               </Row>
//             </Col>
//           </Row>

//           <hr className="my-4" />

//           {/* Guardians */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5>
//               <FaUsers className="me-2" />
//               Guardians
//             </h5>
//             <Button variant="success" size="sm" onClick={openAddModal}>
//               <FaPlus className="me-1" /> Add Guardian
//             </Button>
//           </div>

//           {guardianError && (
//             <Alert variant="danger" className="mb-3">
//               {guardianError}
//             </Alert>
//           )}

//           {guardianLoading ? (
//             <div className="text-center">
//               <Spinner size="sm" />
//             </div>
//           ) : guardians.length > 0 ? (
//             <Row>
//               {guardians.map((g) => (
//                 <Col md={6} key={g.id} className="mb-3">
//                   <Card>
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-start">
//                         <div>
//                           <strong>{g.full_name}</strong> ({g.relation})<br />
//                           <small className="text-muted">{g.guardian_type}</small>
//                           <br />
//                           <FaPhone className="me-1" /> {g.mobile_number || "—"}
//                           <br />
//                           <FaEnvelope className="me-1" /> {g.email || "—"}
//                           <br />
//                           <FaHome className="me-1" /> {g.address || "—"}
//                           <br />
//                           <small>
//                             Occupation: {g.occupation || "—"} | Income: ₹
//                             {g.annual_income || "—"}
//                           </small>
//                           {g.is_primary_contact && (
//                             <Badge bg="info" className="ms-2 mt-1">
//                               Primary Contact
//                             </Badge>
//                           )}
//                         </div>
//                         <div>
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             className="me-1"
//                             onClick={() => openEditModal(g)}
//                           >
//                             <FaEdit />
//                           </Button>
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             onClick={() => handleDelete(g.id)}
//                           >
//                             <FaTrash />
//                           </Button>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           ) : (
//             <p className="text-muted">No guardians assigned.</p>
//           )}

//           {/* Program Info */}
//           <hr className="my-4" />
//           <h5 className="mb-3">
//             <FaIdCard className="me-2" />
//             Program Details
//           </h5>
//           <Row>
//             <Col sm={6} className="mb-3">
//               <strong>Program:</strong> {student.program?.name || "—"}
//             </Col>
//             <Col sm={6} className="mb-3">
//               <strong>Session:</strong>{" "}
//               {student.academic_session?.session_name || "—"}
//             </Col>
//             <Col sm={6} className="mb-3">
//               <strong>Duration:</strong>{" "}
//               {student.program?.duration_years || "—"} years
//             </Col>
//             {/* <Col sm={6} className="mb-3">
//               <strong>University Code:</strong>{" "}
//               {student.program?.university_program_code || "—"}
//             </Col> */}
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Guardian Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalMode === "add" ? "Add Guardian" : "Edit Guardian"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {guardianError && (
//             <Alert variant="danger">{guardianError}</Alert>
//           )}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Guardian Type</Form.Label>
//               <Form.Select
//                 name="guardian_type"
//                 value={formData.guardian_type}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select...</option>
//                 <option value="father">Father</option>
//                 <option value="mother">Mother</option>
//                 <option value="guardian">Other Guardian</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Relation</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="relation"
//                 value={formData.relation}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Occupation</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Annual Income (₹)</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="annual_income"
//                 value={formData.annual_income}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Mobile Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="mobile_number"
//                 value={formData.mobile_number}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 rows={2}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 id="is_primary_contact"
//                 label="Primary Contact"
//                 name="is_primary_contact"
//                 checked={formData.is_primary_contact}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit">
//                 {modalMode === "add" ? "Add Guardian" : "Update Guardian"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ViewStudent;





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
        `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
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
    if (!window.confirm("Are you sure you want to delete this guardian?")) return;
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
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="rounded-3">{error}</Alert>
        <div className="text-center mt-3">
          <Link to="/dashboard/principal/students">
            <Button variant="outline-secondary" className="px-4 py-2 rounded-pill">
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
          <Button variant="outline-secondary" className="mt-3 px-4 py-2 rounded-pill">
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
            style={{ borderColor: "#04626a", color: "#04626a" }}
          >
            ← Back to List
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
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
                    style={{ width: 140, height: 140, border: "3px solid #f1f3f5" }}
                  >
                    <FaUser size={40} />
                  </div>
                )}
              </div>
              <h4 className="mb-2 fw-bold">{fullName}</h4>
              <Badge
                bg={student.student_status === "active" ? "success" : "secondary"}
                className="px-3 py-2 rounded-pill fw-medium"
              >
                {student.student_status}
              </Badge>
            </Col>

            {/* Student Details */}
            <Col md={8}>
              <div className="row g-3">
                {[
                  { label: "Admission No", value: student.admission_number || "—" },
                  { label: "Roll No", value: student.roll_number || "—" },
                  {
                    label: "Class",
                    value:
                      student.program?.name && student.division?.division_name
                        ? `${student.program.name} - ${student.division.division_name}`
                        : "—",
                  },
                  { label: "Academic Year", value: student.academic_year || "—" },
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
            <Button style={{ backgroundColor: "#04626a", border: "none"}} size="sm" onClick={openAddModal}>
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
                          <small className="text-muted d-block">{g.relation}</small>
                          <Badge bg="light" text="dark" className="mt-1 px-2 py-1 rounded">
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
                          <FaPhone className="me-1" size={10} /> {g.mobile_number || "—"}
                        </div>
                        <div>
                          <FaEnvelope className="me-1" size={10} /> {g.email || "—"}
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
                          <Badge bg="info" className="mt-2 px-2 py-1 rounded-pill fw-medium">
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
            <p className="text-center text-muted py-3">No guardians assigned.</p>
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
      >
        <Modal.Header
          closeButton
          className="bg-light"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <Modal.Title className="text-dark fw-bold">
            {modalMode === "add" ? "Add Guardian" : "Edit Guardian"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {guardianError && (
            <Alert variant="danger" className="rounded-2 mb-3">
              {guardianError}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Guardian Type</Form.Label>
              <Form.Select
                name="guardian_type"
                value={formData.guardian_type}
                onChange={handleInputChange}
                required
                className="rounded-pill"
              >
                <option value="">Select...</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Other Guardian</option>
              </Form.Select>
            </Form.Group>

            {[
              { name: "full_name", label: "Full Name", type: "text" },
              { name: "relation", label: "Relation", type: "text" },
              { name: "occupation", label: "Occupation", type: "text" },
              { name: "annual_income", label: "Annual Income (₹)", type: "number" },
              { name: "mobile_number", label: "Mobile Number", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="rounded-pill"
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={2}
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                id="is_primary_contact"
                label="Primary Contact"
                name="is_primary_contact"
                checked={formData.is_primary_contact}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-pill"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="px-4 py-2 rounded-pill"
                style={{ backgroundColor: "#04626a", borderColor: "#04626a" }}
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