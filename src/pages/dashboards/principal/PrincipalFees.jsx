
// src/pages/principal/PrincipalFees.jsx
import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Button,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Container,
} from "react-bootstrap";
import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaGraduationCap,
  FaChartBar,
} from "react-icons/fa";
import * as XLSX from "xlsx";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const PrincipalFees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState({
    totalCollected: 0,
    outstanding: 0,
    scholarshipsGiven: 0,
    paymentsThisMonth: 0,
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [outstandingFees, setOutstandingFees] = useState([]);
  const [studentCache, setStudentCache] = useState({});

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

    // ---------------- FETCH STUDENT (to get name/admission) ----------------
const fetchStudent = async (studentId) => {
  if (studentCache[studentId]) return studentCache[studentId];
  try {
    const res = await safeFetchJSON(`${API_BASE}/api/students/${studentId}`);
    const student = res.data;
    setStudentCache((prev) => ({ ...prev, [studentId]: student }));
    return student;
  } catch (err) {
    console.error("Failed to fetch student", studentId, err);
    return null;
  }
};

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Expected JSON but received HTML. Status: ${res.status}. Preview: ${text.substring(0, 100)}...`
      );
    }
    return await res.json();
  };

  const fetchStudent = async (studentId) => {
    if (studentCache[studentId]) return studentCache[studentId];
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students/${studentId}`);
      const student = res.data;
      setStudentCache((prev) => ({ ...prev, [studentId]: student }));
      return student;
    } catch (err) {
      console.error("Failed to fetch student", studentId, err);
      return null;
    }
  };

  const fetchDashboardSummary = async () => {
    try {
      const outstandingReport = await safeFetchJSON(`${API_BASE}/api/reports/outstanding`);
      const fees = outstandingReport.data.fees || [];

      const totalCollected = fees.reduce(
        (sum, f) => sum + parseFloat(f.paid_amount || 0),
        0
      );
      const totalOutstanding = fees.reduce(
        (sum, f) => sum + parseFloat(f.outstanding_amount || 0),
        0
      );

      const thisMonth = new Date().getMonth();
      const paymentsThisMonth = fees.filter((f) => {
        if (f.status === 'paid' || f.status === 'partial') {
          const date = new Date(f.updated_at);
          return date.getMonth() === thisMonth;
        }
        return false;
      }).length;

      setSummary({
        totalCollected,
        outstanding: totalOutstanding,
        scholarshipsGiven: 50000,
        paymentsThisMonth,
      });
    } catch (err) {
      console.error("Dashboard Summary Error:", err);
    }
  };

  const fetchRecentPayments = async () => {
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/students/3/fees`);
      const fees = res.data || [];

      const payments = await Promise.all(
        fees
          .filter(fee => fee.status === 'paid' || fee.status === 'partial')
          .map(async (fee) => {
            const student = await fetchStudent(fee.student_id);

            return {
              id: fee.id,
              receipt_number: `RCP${fee.id}`,
              student_fee: {
                student: student || {
                  id: fee.student_id,
                  admission_number: "N/A",
                  full_name: "Unknown Student",
                },
                fee_structure: fee.fee_structure,
              },
              amount: fee.paid_amount || fee.total_amount,
              payment_mode: "offline",
              payment_date: fee.updated_at,
              status: fee.status === 'paid' ? 'success' : 'partial',
            };
          })
      );

      setRecentPayments(payments);
    } catch (err) {
      console.error("Recent Payments Error:", err);
      setError("Failed to load recent payments.");
    }
  };

  const fetchOutstandingFees = async () => {
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/reports/outstanding`);
      setOutstandingFees(res.data?.fees || []);
    } catch (err) {
      console.error("Outstanding Fees Error:", err);
      setError("Failed to load outstanding fees.");
    }
  };

  const handleCollectFee = (feeId) => {
    alert(`Collecting fee ID: ${feeId}.`);
  };

  const handleAssignScholarship = async (studentId) => {
    try {
      await safeFetchJSON(`${API_BASE}/api/scholarships/assign`, {
        method: "POST",
        body: JSON.stringify({
          student_id: studentId,
          scholarship_id: "1",
          academic_year: "FY",
        }),
      });
      alert("Scholarship assigned successfully!");
      fetchOutstandingFees();
    } catch (err) {
      console.error("Assign Scholarship Error:", err);
      alert("Failed to assign scholarship.");
    }
  };

  const createWorksheet = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    return ws;
  };

  const exportToExcel = () => {
    if (recentPayments.length === 0) {
      alert("No data to export.");
      return;
    }

    const data = recentPayments.map((p) => {
      const student = p.student_fee?.student || {};
      const feeHead = p.student_fee?.fee_structure?.fee_head || {};

      return {
        "Receipt No.": p.receipt_number || "N/A",
        "Admission No.": student.admission_number || "N/A",
        "Student Name": student.full_name || "N/A",
        "Fee Head": feeHead.name || "N/A",
        "Amount": p.amount || "0",
        "Payment Mode": p.payment_mode || "N/A",
        "Date": p.payment_date
          ? new Date(p.payment_date).toLocaleDateString("en-CA")
          : "N/A",
        "Status": p.status || "N/A",
      };
    });

    const ws = createWorksheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fee Collections");
    XLSX.writeFile(wb, `fee_collections_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const exportRowToExcel = (payment) => {
    const student = payment.student_fee?.student || {};
    const feeHead = payment.student_fee?.fee_structure?.fee_head || {};

    const data = [{
      "Receipt No.": payment.receipt_number || "N/A",
      "Admission No.": student.admission_number || "N/A",
      "Student Name": student.full_name || "N/A",
      "Fee Head": feeHead.name || "N/A",
      "Amount": payment.amount || "0",
      "Payment Mode": payment.payment_mode || "N/A",
      "Date": payment.payment_date
        ? new Date(payment.payment_date).toLocaleDateString("en-CA")
        : "N/A",
      "Status": payment.status || "N/A",
    }];

    const ws = createWorksheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fee Receipt");
    XLSX.writeFile(wb, `receipt_${payment.receipt_number || "RCP"}.xlsx`);
  };

  const generateReceiptPDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SCHOOL NAME", 105, 30, { align: "center" });
    doc.setFontSize(14);
    doc.text("Fee Receipt", 105, 40, { align: "center" });
    doc.line(40, 45, 170, 45);

    let y = 60;
    const lineHeight = 10;

    doc.setFontSize(12);
    doc.text(`Receipt No.: ${payment.receipt_number || "—"}`, 40, y);
    doc.text(`Date: ${payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('en-US') : "—"}`, 150, y);

    y += lineHeight;
    doc.text(`Student: ${payment.student_fee?.student?.full_name || "—"}`, 40, y);
    y += lineHeight;
    doc.text(`Admission No.: ${payment.student_fee?.student?.admission_number || "—"}`, 40, y);
    y += lineHeight;
    doc.text(`Fee Head: ${payment.student_fee?.fee_structure?.fee_head?.name || "—"}`, 40, y);
    y += lineHeight * 2;
    doc.setFontSize(14);
    doc.text(`Amount Paid: ₹${parseFloat(payment.amount).toLocaleString()}`, 40, y);
    y += lineHeight;
    doc.text(`Payment Mode: ${payment.payment_mode?.toUpperCase() || "—"}`, 40, y);
    y += lineHeight;
    doc.text(`Status: ${payment.status === "success" ? "PAID" : (payment.status?.toUpperCase() || "—")}`, 40, y);
    doc.setFontSize(10);
    doc.text("Thank you for your payment.", 105, y + 20, { align: "center" });
    doc.save(`receipt_${payment.receipt_number || "RCP"}.pdf`);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchDashboardSummary(),
          fetchRecentPayments(),
          fetchOutstandingFees(),
        ]);
      } catch (err) {
        setError("Failed to load fee data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredOutstanding = outstandingFees.filter(
    (f) =>
      f.student?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      f.student?.admission_number?.includes(search) ||
      f.fee_structure?.fee_head?.name
        ?.toLowerCase()
        ?.includes(search.toLowerCase())
  );

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
        <h2 className="mb-0 fw-bold text-dark">Fee Management</h2>
        <Button
          variant="primary"
          size="sm"
          className="px-3 py-2 rounded-pill d-flex align-items-center"
          style={{ backgroundColor: "#04626a", borderColor: "#04626a" }}
        >
          + Collect Fee
        </Button>
      </div>

      <Form.Control
        placeholder="Search by admission number, name, or fee head..."
        className="mb-4 rounded-pill"
        style={{ padding: "10px 16px", fontSize: "0.95rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4 mb-4">
          {[
            {
              title: "Total Fees Collected",
              value: `₹${summary.totalCollected.toLocaleString()}`,
              icon: <FaMoneyBillWave className="text-success" size={24} />,
              bg: "bg-success bg-opacity-10",
            },
            {
              title: "Outstanding Fees",
              value: `₹${summary.outstanding.toLocaleString()}`,
              icon: <FaExclamationTriangle className="text-warning" size={24} />,
              bg: "bg-warning bg-opacity-10",
            },
            {
              title: "Scholarships Given",
              value: `₹${summary.scholarshipsGiven.toLocaleString()}`,
              icon: <FaGraduationCap className="text-primary" size={24} />,
              bg: "bg-primary bg-opacity-10",
            },
            {
              title: "Payments This Month",
              value: `${summary.paymentsThisMonth}`,
              icon: <FaChartBar className="text-info" size={24} />,
              bg: "bg-info bg-opacity-10",
            },
          ].map((card, idx) => (
            <Col key={idx}>
              <Card className="shadow-sm h-100 border-0" style={{ borderRadius: "12px" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className={`me-3 p-2 rounded-circle ${card.bg}`}>
                    {card.icon}
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold" style={{ fontSize: "1.25rem" }}>{card.value}</h5>
                    <small className="text-muted">{card.title}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Recent Fee Collections */}
      <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
        <Card.Header className="bg-white py-3 border-bottom" style={{ borderRadius: "12px 12px 0 0" }}>
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
            <h5 className="mb-0 fw-bold">Recent Fee Collections</h5>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={exportToExcel}
                className="rounded-pill px-3"
              >
                Export
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="rounded-pill px-3"
                style={{ backgroundColor: "#04626a", borderColor: "#04626a" }}
              >
                + Collect Fee
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="m-3 rounded-2">{error}</Alert>
          ) : (
            <>
              {/* Mobile View: Stacked Cards */}
              <div className="d-block d-md-none">
                {recentPayments.length > 0 ? (
                  recentPayments.map((p) => (
                    <Card key={p.id} className="mb-3 shadow-sm border">
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Receipt:</strong>
                          <span>{p.receipt_number}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Admission:</strong>
                          <span>{p.student_fee?.student?.admission_number || "—"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Name:</strong>
                          <span>{p.student_fee?.student?.full_name || "—"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Fee Head:</strong>
                          <span>{p.student_fee?.fee_structure?.fee_head?.name || "—"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Amount:</strong>
                          <span>₹{parseFloat(p.amount).toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Mode:</strong>
                          <Badge bg={p.payment_mode === "cash" ? "secondary" : p.payment_mode === "online" ? "success" : "info"}>
                            {p.payment_mode}
                          </Badge>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Date:</strong>
                          <span>{new Date(p.payment_date).toLocaleDateString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <strong>Status:</strong>
                          <Badge bg={p.status === "success" ? "success" : "warning"}>
                            {p.status === "success" ? "PAID" : "PARTIAL"}
                          </Badge>
                        </div>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => generateReceiptPDF(p)}
                            className="w-100 w-md-auto"
                          >
                            PDF
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => exportRowToExcel(p)}
                            className="w-100 w-md-auto"
                          >
                            XLS
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-muted py-3">
                    No recent payments.
                  </div>
                )}
              </div>

              {/* Desktop View: Table */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <Table striped bordered hover responsive className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Receipt No.</th>
                        <th>Admission No.</th>
                        <th>Student Name</th>
                        <th>Fee Head</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.length > 0 ? (
                        recentPayments.map((p) => (
                          <tr key={p.id}>
                            <td>{p.receipt_number}</td>
                            <td>{p.student_fee?.student?.admission_number || "—"}</td>
                            <td>{p.student_fee?.student?.full_name || "—"}</td>
                            <td>{p.student_fee?.fee_structure?.fee_head?.name || "—"}</td>
                            <td>₹{parseFloat(p.amount).toLocaleString()}</td>
                            <td>
                              <Badge bg={p.payment_mode === "cash" ? "secondary" : p.payment_mode === "online" ? "success" : "info"}>
                                {p.payment_mode}
                              </Badge>
                            </td>
                            <td>{new Date(p.payment_date).toLocaleDateString()}</td>
                            <td>
                              <Badge bg={p.status === "success" ? "success" : "warning"} text={p.status === "success" ? "light" : "dark"}>
                                {p.status === "success" ? "PAID" : "PARTIAL"}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => generateReceiptPDF(p)}
                                  className="px-2 py-1 rounded-1"
                                >
                                  PDF
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => exportRowToExcel(p)}
                                  className="px-2 py-1 rounded-1"
                                >
                                  XLS
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center text-muted py-3">
                            No recent payments.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Outstanding Fees */}
      <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
        <Card.Header className="bg-white py-3 border-bottom" style={{ borderRadius: "12px 12px 0 0" }}>
          <h5 className="mb-0 fw-bold">Outstanding Fees</h5>
        </Card.Header>
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="m-3 rounded-2">{error}</Alert>
          ) : (
            <>
              {/* Mobile View: Stacked Cards */}
              <div className="d-block d-md-none">
                {filteredOutstanding.length > 0 ? (
                  filteredOutstanding.map((f) => (
                    <Card key={f.id} className="mb-3 shadow-sm border">
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Admission:</strong>
                          <span>{f.student?.admission_number || "—"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Name:</strong>
                          <span>
                            {f.student?.first_name} {f.student?.middle_name || ""} {f.student?.last_name}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Total:</strong>
                          <span>₹{parseFloat(f.total_amount).toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Paid:</strong>
                          <span>₹{parseFloat(f.paid_amount).toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Outstanding:</strong>
                          <span className={parseFloat(f.outstanding_amount) > 0 ? "text-danger" : "text-success"}>
                            ₹{parseFloat(f.outstanding_amount).toLocaleString()}
                          </span>
                        </div>
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCollectFee(f.id)}
                            className="px-3 py-1 rounded-1"
                            style={{ backgroundColor: "#04626a", borderColor: "#04626a" }}
                          >
                            Collect
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-muted py-3">
                    {search ? "No matching outstanding fees." : "All fees are paid."}
                  </div>
                )}
              </div>

              {/* Desktop View: Table */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <Table striped bordered hover responsive className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Admission No.</th>
                        <th>Student Name</th>
                        <th>Total Amount</th>
                        <th>Paid</th>
                        <th>Outstanding</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOutstanding.length > 0 ? (
                        filteredOutstanding.map((f) => (
                          <tr key={f.id}>
                            <td>{f.student?.admission_number || "—"}</td>
                            <td>
                              {f.student?.first_name} {f.student?.middle_name || ""} {f.student?.last_name}
                            </td>
                            <td>₹{parseFloat(f.total_amount).toLocaleString()}</td>
                            <td>₹{parseFloat(f.paid_amount).toLocaleString()}</td>
                            <td>
                              <span className={parseFloat(f.outstanding_amount) > 0 ? "text-danger fw-bold" : "text-success"}>
                                ₹{parseFloat(f.outstanding_amount).toLocaleString()}
                              </span>
                            </td>
                            <td className="text-center">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleCollectFee(f.id)}
                                className="px-3 py-1 rounded-1"
                                style={{ backgroundColor: "#04626a", borderColor: "#04626a" }}
                              >
                                Collect
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted py-3">
                            {search ? "No matching outstanding fees." : "All fees are paid."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrincipalFees;