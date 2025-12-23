// src/components/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ phone: "", address: "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [uploading, setUploading] = useState({ photo: false, signature: false });
  const [uploadError, setUploadError] = useState({ photo: "", signature: "" });

  // Get student ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id || user?.studentId;

  // Fetch profile + guardians
  const fetchData = async () => {
    if (!studentId) {
      setError("Student ID not found.");
      setLoading(false);
      return;
    }

    try {
      // Fetch student
      const studentRes = await fetch(`https://serp.lemmecode.in/api/students/${studentId}`);
      const studentJson = await studentRes.json();
      if (!studentJson.success) throw new Error("Failed to load student profile");
      setStudent(studentJson.data);
      setEditData({
        phone: studentJson.data.phone || "",
        address: studentJson.data.address || "",
      });

      // Fetch guardians
      const guardianRes = await fetch(
        `https://serp.lemmecode.in/api/students/${studentId}/guardians`
      );
      const guardianJson = await guardianRes.json();
      setGuardians(guardianJson.success ? guardianJson.data || [] : []);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload photo or signature
  const handleFileUpload = async (type, file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError((prev) => ({ ...prev, [type]: "Please upload an image file." }));
      return;
    }

    const formData = new FormData();
    formData.append(type === "photo" ? "photo" : "signature", file);

    setUploading((prev) => ({ ...prev, [type]: true }));
    setUploadError((prev) => ({ ...prev, [type]: "" }));

    try {
      const res = await fetch(
        `https://serp.lemmecode.in/api/students/${studentId}/documents/${type}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || `${type} upload failed`);
      }

      // Update student with new URL
      setStudent((prev) => ({
        ...prev,
        [`${type}_url`]: result.data[`${type}_url`],
      }));
    } catch (err) {
      setUploadError((prev) => ({ ...prev, [type]: err.message }));
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Delete photo or signature
  const handleDelete = async (type) => {
    if (!window.confirm(`Are you sure you want to delete your ${type}?`)) return;

    try {
      const res = await fetch(
        `https://serp.lemmecode.in/api/students/${studentId}/documents/${type}`,
        { method: "DELETE" }
      );
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || `${type} deletion failed`);
      }

      // Remove URL from state
      setStudent((prev) => ({ ...prev, [`${type}_url`]: null }));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Save editable fields (phone, address)
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`https://serp.lemmecode.in/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: editData.phone,
          address: editData.address,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Update failed");
      setStudent({ ...student, ...editData });
      setEditMode(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("New passwords do not match.");
      return;
    }
    try {
      const res = await fetch(`https://serp.lemmecode.in/api/students/${studentId}/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Password change failed");
      alert("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!studentId) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">Student ID not found in session.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container fluid className="p-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading profile...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-4">
      <Alert variant="danger">❌ {error}</Alert>
    </Container>
  );
}

return (
  <Container fluid className="p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4>Student Profile</h4>
      <Button variant="outline-primary" size="sm" onClick={() => setShowPasswordModal(true)}>
        Change Password
      </Button>
    </div>

    <Row>
      {/* Main Profile Card */}
      <Col xs={12} lg={8}>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            {/* Photo & Signature Section */}
            <div className="d-flex flex-wrap gap-4 mb-4">
              {/* Photo */}
              <div>
                <h6>Photo</h6>
                {student.photo_url ? (
                  <div>
                    <Image
                      src={`https://serp.lemmecode.in${student.photo_url}`}
                      rounded
                      width="120"
                      height="120"
                      style={{ objectFit: "cover" }}
                      className="border"
                    />
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete("photo")}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "120px", height: "120px" }}
                  >
                    No Photo
                  </div>
                )}
                <div className="mt-2">
                  <label className="btn btn-sm btn-outline-primary">
                    {uploading.photo ? "Uploading..." : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("photo", e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {uploadError.photo && <div className="text-danger small mt-1">{uploadError.photo}</div>}
              </div>

              {/* Signature */}
              <div>
                <h6>Signature</h6>
                {student.signature_url ? (
                  <div>
                    <Image
                      src={`https://serp.lemmecode.in${student.signature_url}`}
                      style={{ width: "150px", height: "60px", objectFit: "contain" }}
                      className="border p-1 bg-white"
                    />
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete("signature")}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "150px", height: "60px" }}
                  >
                    No Signature
                  </div>
                )}
                <div className="mt-2">
                  <label className="btn btn-sm btn-outline-primary">
                    {uploading.signature ? "Uploading..." : "Upload Signature"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("signature", e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {uploadError.signature && (
                  <div className="text-danger small mt-1">{uploadError.signature}</div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <h5 className="mb-3">{student.name}</h5>
            <p><strong>Admission No:</strong> {student.admission_no || "—"} </p>
            <p><strong>Class:</strong> {student.class || "—"} </p>
            <p><strong>Section:</strong> {student.section || "—"} </p>
            <p><strong>Email:</strong> {student.email || "—"} </p>

            {/* Editable Fields */}
            {editMode ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" size="sm" className="me-2" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <div>
                <p><strong>Phone:</strong> {student.phone || "—"} </p>
                <p><strong>Address:</strong> {student.address || "—"} </p>
                <Button variant="outline-secondary" size="sm" onClick={() => setEditMode(true)}>
                  Edit Contact Info
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Guardian Preview */}
      <Col xs={12} lg={4}>
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <strong>Guardians ({guardians.length})</strong>
          </Card.Header>
          <Card.Body>
            {guardians.length === 0 ? (
              <p className="text-muted">No guardians added.</p>
            ) : (
              <ul className="list-unstyled">
                {guardians.slice(0, 2).map((g, i) => (
                  <li key={i} className="mb-2 pb-2 border-bottom">
                    <div><strong>{g.full_name}</strong></div>
                    <div>{g.relation || g.guardian_type}</div>
                    <div>{g.mobile_number}</div>
                  </li>
                ))}
              </ul>
            )}
            <Button
              variant="link"
              size="sm"
              href="/dashboard/student/student-guardians"
              className="p-0"
            >
              View All Guardians →
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* Password Modal */}
    <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordData.current_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, current_password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordData.new_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, new_password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordData.confirm_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirm_password: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleChangePassword}>
          Update Password
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
);
};

export default StudentProfile;