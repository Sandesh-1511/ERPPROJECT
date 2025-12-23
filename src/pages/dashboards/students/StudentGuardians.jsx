// // src/components/StudentGuardians.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Alert,
//   Table,
// } from "react-bootstrap";

// const StudentGuardians = () => {
//   const [guardians, setGuardians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingGuardian, setEditingGuardian] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     relation: "",
//     phone: "",
//     email: "",
//     address: "",
//   });
//   const [formError, setFormError] = useState("");

//   // Get student ID
//   const user = JSON.parse(localStorage.getItem("user"));
//   const studentId = user?.studentId || user?.id;

//   // Fetch guardians
//   const fetchGuardians = async () => {
//     if (!studentId) {
//       setError("Student ID not found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `https://serp.lemmecode.in/api/students/${studentId}/guardians`
//       );
//       if (!res.ok) throw new Error("Failed to fetch guardians");
//       const data = await res.json();
//       setGuardians(Array.isArray(data) ? data : data.guardians || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGuardians();
//   }, []);

//   // Open modal for Add
//   const handleAddClick = () => {
//     setEditingGuardian(null);
//     setFormData({ name: "", relation: "", phone: "", email: "", address: "" });
//     setFormError("");
//     setShowModal(true);
//   };

//   // Open modal for Edit
//   const handleEditClick = (guardian) => {
//     setEditingGuardian(guardian);
//     setFormData({
//       name: guardian.name || "",
//       relation: guardian.relation || "",
//       phone: guardian.phone || "",
//       email: guardian.email || "",
//       address: guardian.address || "",
//     });
//     setFormError("");
//     setShowModal(true);
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Validate form
//   const validateForm = () => {
//     if (!formData.name.trim() || !formData.relation.trim() || !formData.phone.trim()) {
//       setFormError("Name, relation, and phone are required.");
//       return false;
//     }
//     if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
//       setFormError("Please enter a valid phone number (10-15 digits).");
//       return false;
//     }
//     return true;
//   };

//   // Save (Create or Update)
//   const handleSave = async () => {
//     if (!validateForm()) return;

//     const url = editingGuardian
//       ? `https://serp.lemmecode.in/api/students/${studentId}/guardians/${editingGuardian.id}`
//       : `https://serp.lemmecode.in/api/students/${studentId}/guardians`;

//     const method = editingGuardian ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error(`Failed to ${editingGuardian ? "update" : "add"} guardian`);

//       setShowModal(false);
//       fetchGuardians(); // Refresh list
//     } catch (err) {
//       setFormError(err.message);
//     }
//   };

//   // Delete guardian
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this guardian?")) return;

//     try {
//       const res = await fetch(
//         `https://serp.lemmecode.in/api/students/${studentId}/guardians/${id}`,
//         { method: "DELETE" }
//       );
//       if (!res.ok) throw new Error("Failed to delete guardian");
//       fetchGuardians();
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   if (!studentId) {
//     return (
//       <Container fluid className="p-4">
//         <Alert variant="danger">Student ID not found in user session.</Alert>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container fluid className="p-4 text-center">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading guardians...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Student Guardians</h4>
//         <Button variant="success" onClick={handleAddClick}>
//           + Add Guardian
//         </Button>
//       </div>

//       {error && <Alert variant="danger">❌ {error}</Alert>}

//       {guardians.length === 0 ? (
//         <Alert variant="info">No guardians registered.</Alert>
//       ) : (
//         <Card>
//           <Card.Body className="p-0">
//             <Table responsive hover className="mb-0">
//               <thead className="bg-light">
//                 <tr>
//                   <th>Name</th>
//                   <th>Relation</th>
//                   <th>Phone</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {guardians.map((g) => (
//                   <tr key={g.id}>
//                     <td>{g.name || "—"}</td>
//                     <td>{g.relation || "—"}</td>
//                     <td>{g.phone || "—"}</td>
//                     <td>{g.email || "—"}</td>
//                     <td>
//                       <Button
//                         size="sm"
//                         variant="outline-primary"
//                         className="me-2"
//                         onClick={() => handleEditClick(g)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline-danger"
//                         onClick={() => handleDelete(g.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingGuardian ? "Edit Guardian" : "Add New Guardian"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {formError && <Alert variant="danger">{formError}</Alert>}
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name *</Form.Label>
//               <Form.Control
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="e.g. Rajesh Sharma"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Relation *</Form.Label>
//               <Form.Control
//                 name="relation"
//                 value={formData.relation}
//                 onChange={handleChange}
//                 placeholder="e.g. Father, Mother, Guardian"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone *</Form.Label>
//               <Form.Control
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="10-digit number"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="optional@example.com"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 name="address"
//                 as="textarea"
//                 rows={2}
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Optional"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             {editingGuardian ? "Update" : "Add"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default StudentGuardians;


// src/components/StudentGuardians.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";

const StudentGuardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  const [formError, setFormError] = useState("");

  // Get student ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.studentId || user?.id;

  // Fetch guardians
  const fetchGuardians = async () => {
    if (!studentId) {
      setError("Student ID not found in session.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://serp.lemmecode.in/api/students/${studentId}/guardians`
      );
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to load guardians");
      }

      setGuardians(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to fetch guardians");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  const handleAddClick = () => {
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
    setFormError("");
    setShowModal(true);
  };

  const handleEditClick = (g) => {
    setEditingGuardian(g);
    setFormData({
      guardian_type: g.guardian_type || "",
      full_name: g.full_name || "",
      occupation: g.occupation || "",
      annual_income: g.annual_income || "",
      mobile_number: g.mobile_number || "",
      email: g.email || "",
      relation: g.relation || "",
      address: g.address || "",
      is_primary_contact: g.is_primary_contact || false,
    });
    setFormError("");
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setFormError("Full name is required.");
      return false;
    }
    if (!formData.mobile_number.trim()) {
      setFormError("Mobile number is required.");
      return false;
    }
    if (formData.mobile_number && !/^\d{10,15}$/.test(formData.mobile_number)) {
      setFormError("Please enter a valid 10–15 digit mobile number.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const url = editingGuardian
      ? `https://serp.lemmecode.in/api/students/${studentId}/guardians/${editingGuardian.id}`
      : `https://serp.lemmecode.in/api/students/${studentId}/guardians`;

    const method = editingGuardian ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Operation failed");
      }

      setShowModal(false);
      fetchGuardians(); // Refresh list
    } catch (err) {
      setFormError(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guardian?")) return;

    try {
      const res = await fetch(
        `https://serp.lemmecode.in/api/students/${studentId}/guardians/${id}`,
        { method: "DELETE" }
      );
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Delete failed");
      }

      fetchGuardians();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!studentId) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">Student ID not found. Please log in again.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container fluid className="p-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading guardians...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Student Guardians</h4>
        <Button variant="success" onClick={handleAddClick}>
          + Add Guardian
        </Button>
      </div>

      {error && <Alert variant="danger">❌ {error}</Alert>}

      {guardians.length === 0 ? (
        <Alert variant="info">No guardians registered for this student.</Alert>
      ) : (
        <Card>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Primary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guardians.map((g) => (
                  <tr key={g.id}>
                    <td>{g.full_name || "—"}</td>
                    <td>{g.relation || "—"}</td>
                    <td>{g.mobile_number || "—"}</td>
                    <td>{g.email || "—"}</td>
                    <td>{g.is_primary_contact ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleEditClick(g)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(g.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingGuardian ? "Edit Guardian" : "Add New Guardian"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Michael Doe"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                placeholder="e.g. Father"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Guardian Type</Form.Label>
              <Form.Control
                name="guardian_type"
                value={formData.guardian_type}
                onChange={handleChange}
                placeholder="e.g. father, mother"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number *</Form.Label>
              <Form.Control
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="10-digit number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="optional@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g. Engineer"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Annual Income</Form.Label>
              <Form.Control
                name="annual_income"
                type="number"
                value={formData.annual_income}
                onChange={handleChange}
                placeholder="e.g. 500000"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is_primary_contact"
                label="Primary Contact?"
                name="is_primary_contact"
                checked={formData.is_primary_contact}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingGuardian ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentGuardians;