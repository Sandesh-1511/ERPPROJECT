import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner, Alert, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const CollectFeeForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [fees, setFees] = useState([]);
  const [selectedFeeId, setSelectedFeeId] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    payment_mode: "cash",
    transaction_id: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loadingFees, setLoadingFees] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      throw new Error(`Expected JSON but received HTML. Status: ${res.status}`);
    }
    return await res.json();
  };

  // Search students
  const searchStudents = async (term) => {
    if (!term.trim()) return;
    setSearching(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students?q=${encodeURIComponent(term)}`);
      if (res.success && Array.isArray(res.data?.data)) {
        setStudents(res.data.data.map(s => ({
          id: s.id,
          full_name: [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" "),
          admission_number: s.admission_number,
        })));
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("Search Students Error:", err);
      setError("Failed to search students.");
    } finally {
      setSearching(false);
    }
  };

  // Fetch fees for selected student
  const loadStudentFees = async (studentId) => {
    setLoadingFees(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students/${studentId}/fees`);
      if (Array.isArray(res.data)) {
        // Filter fees that are not fully paid
        const unpaidFees = res.data.filter(fee => 
          fee.status === 'unpaid' || fee.status === 'partial'
        );
        setFees(unpaidFees);
      } else {
        setFees([]);
      }
    } catch (err) {
      console.error("Load Fees Error:", err);
      setError("Failed to load student fees.");
    } finally {
      setLoadingFees(false);
    }
  };
  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setFees([]);
    setSelectedFeeId(null);
    setPaymentData({ amount: "", payment_mode: "cash", transaction_id: "", remarks: "" });
    loadStudentFees(student.id);
  };
  // Handle fee selection
  const handleSelectFee = (fee) => {
    setSelectedFeeId(fee.id);
    setPaymentData(prev => ({
      ...prev,
      amount: fee.outstanding_amount || "",
    }));
  };
  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedFeeId) {
      setError("Please select a student and a fee.");
      return;
    }
    const amount = parseFloat(paymentData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const payload = {
      student_fee_id: selectedFeeId,
      amount: amount,
      payment_mode: paymentData.payment_mode,
      payment_date: today,
      transaction_id: paymentData.transaction_id || `TXN${Date.now()}`,
      remarks: paymentData.remarks || "Collected via Principal Dashboard",
    };

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await safeFetchJSON(
        `${API_BASE}/api/students/${selectedStudent.id}/payment`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (response.success) {
        setSuccess(`Payment recorded successfully! Receipt: ${response.data?.receipt_number || "N/A"}`);
        // Reset form after 2 seconds
        setTimeout(() => {
          navigate("/dashboard/principal/fees");
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to record payment");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(`Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Theme from Sidebar
  const theme = {
    primary: "#04626a",
    primaryHover: "#057a84",
    textLight: "black",
    borderLight: "rgba(255, 255, 255, 0.3)",
    bgCard: "rgba(255, 255, 255, 0.05)",
  };

  return (
    <>
    <div className="p-3 p-md-4 w-100 ">
      <Card
        className="shadow-sm border-0"
        style={{
          background: theme.bgCard,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${theme.borderLight}`,
          borderRadius: "12px",
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
            <h4 className="text-dark mb-0 fw-bold">Collect Fee</h4>
            <Button 
              variant="outline-dark"
              
              size="sm"
              onClick={() => navigate("/dashboard/principal/fees")}
              style={{ borderColor: theme.borderLight, borderRadius: "8px",border:"2px solid black" }}
            >
              Back to Fees
            </Button>
          </div>

          {error && <Alert variant="danger" className="text-dark">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {/* Step 1: Search Student */}
          <Form.Group className="mb-4">
            <Form.Label className="text-dark">Search Student (by name or admission number)</Form.Label>
            <div className="d-flex gap-2 border">
              <Form.Control
                placeholder="Enter name or admission number..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.trim()) {
                    const delay = setTimeout(() => searchStudents(e.target.value), 500);
                    return () => clearTimeout(delay);
                  }
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: `1px solid ${theme.borderLight}`,
                  color: theme.textLight,
                  borderRadius: "8px",
                  text:"black",
                }}
              />
              {searching && <Spinner animation="border" size="sm" variant="light" className="align-self-center" />}
            </div>

            {/* Student Results */}
            {students.length > 0 && (
              <div className="mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {students.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectStudent(s)}
                    className="p-2 mb-1 rounded cursor-pointer"
                    style={{
                      background: selectedStudent?.id === s.id ? "rgba(4, 98, 106, 0.3)" : "rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      border: `1px solid ${theme.borderLight}`,
                    }}
                  >
                    <div className="text-light fw-medium">{s.full_name}</div>
                    <div className="text-muted small">Admission: {s.admission_number}</div>
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          {/* Step 2: Select Fee */}
          {selectedStudent && (
            <>
              <h5 className="text-light mb-3">Fees for: {selectedStudent.full_name}</h5>
              {loadingFees ? (
                <div className="text-center my-3">
                  <Spinner animation="border" variant="light" size="sm" />
                </div>
              ) : fees.length > 0 ? (
                <div className="table-responsive mb-4">
                  <Table bordered hover size="sm" className="text-light">
                    <thead style={{ backgroundColor: "rgba(4, 98, 106, 0.3)" }}>
                      <tr>
                        <th>Fee Head</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Outstanding</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map(fee => (
                        <tr key={fee.id}>
                          <td>{fee.fee_structure?.fee_head?.name || "—"}</td>
                          <td>₹{parseFloat(fee.total_amount).toLocaleString()}</td>
                          <td>₹{parseFloat(fee.paid_amount).toLocaleString()}</td>
                          <td className="text-danger">₹{parseFloat(fee.outstanding_amount).toLocaleString()}</td>
                          <td>
                            <span className={fee.status === 'paid' ? 'text-success' : fee.status === 'partial' ? 'text-warning' : 'text-danger'}>
                              {fee.status}
                            </span>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              onClick={() => handleSelectFee(fee)}
                              disabled={selectedFeeId === fee.id}
                              style={{
                                backgroundColor: selectedFeeId === fee.id ? theme.primaryHover : theme.primary,
                                border: "none",
                                fontSize: "0.85rem",
                                padding: "0.25rem 0.5rem",
                              }}
                            >
                              {selectedFeeId === fee.id ? "Selected" : "Select"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <Alert variant="info" className="text-dark">No outstanding fees found for this student.</Alert>
              )}
            </>
          )}

          {/* Step 3: Payment Details */}
          {selectedFeeId && (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Amount *</Form.Label>
                    <Form.Control
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      required
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.textLight,
                        borderRadius: "8px",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Payment Mode</Form.Label>
                    <Form.Select
                      value={paymentData.payment_mode}
                      onChange={(e) => setPaymentData({ ...paymentData, payment_mode: e.target.value })}
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.textLight,
                        borderRadius: "8px",
                      }}
                    >
                      <option value="cash">Cash</option>
                      <option value="online">Online</option>
                      <option value="cheque">Cheque</option>
                      <option value="upi">UPI</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Transaction ID (Optional)</Form.Label>
                <Form.Control
                  value={paymentData.transaction_id}
                  onChange={(e) => setPaymentData({ ...paymentData, transaction_id: e.target.value })}
                  placeholder="e.g., TXN12345, UPI ref, Cheque no."
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: `1px solid ${theme.borderLight}`,
                    color: theme.textLight,
                    borderRadius: "8px",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-light">Remarks (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={paymentData.remarks}
                  onChange={(e) => setPaymentData({ ...paymentData, remarks: e.target.value })}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: `1px solid ${theme.borderLight}`,
                    color: theme.textLight,
                    borderRadius: "8px",
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/dashboard/principal/fees")}
                  style={{ borderColor: theme.borderLight, borderRadius: "8px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: theme.primary,
                    border: "none",
                    color: theme.textLight,
                    borderRadius: "8px",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = theme.primaryHover)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = theme.primary)}
                >
                  {loading ? <Spinner size="sm" variant="light" /> : "Record Payment"}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
    </>
  );
};

export default CollectFeeForm;