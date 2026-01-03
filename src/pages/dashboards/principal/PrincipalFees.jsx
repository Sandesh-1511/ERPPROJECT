
// import jsPDF from "jspdf";
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Badge,
//   Button,
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Form,
//   Container,
//   Modal,
//   InputGroup,
// } from "react-bootstrap";
// import {
//   FaMoneyBillWave,
//   FaExclamationTriangle,
//   FaGraduationCap,
//   FaChartBar,
// } from "react-icons/fa";

// // ✅ FIXED: Removed trailing spaces that break all API calls
// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalFees = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   // Dashboard Summary
//   const [summary, setSummary] = useState({
//     totalCollected: 0,
//     outstanding: 0,
//     scholarshipsGiven: 0,
//     paymentsThisMonth: 0,
//   });

//   // Tables Data
//   const [recentPayments, setRecentPayments] = useState([]);
//   const [outstandingFees, setOutstandingFees] = useState([]);

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

//   /* ---------------- FETCH DASHBOARD SUMMARY ---------------- */
//   const fetchDashboardSummary = async () => {
//     try {
//       // Get recent payments (for "Payments This Month")
//       const paymentsRes = await safeFetchJSON(
//         `${API_BASE}/api/students/3/payments`
//       );
//       const thisMonth = new Date().getMonth();
//       const paymentsThisMonth = paymentsRes.data.filter((p) => {
//         const date = new Date(p.payment_date);
//         return date.getMonth() === thisMonth;
//       }).length;

//       // Get outstanding report (for "Outstanding Fees" & "Total Fees Collected")
//       const outstandingReport = await safeFetchJSON(
//         `${API_BASE}/api/reports/outstanding`
//       );
//       const totalCollected = outstandingReport.data.fees.reduce(
//         (sum, f) => sum + parseFloat(f.paid_amount),
//         0
//       );
//       const totalOutstanding = outstandingReport.data.fees.reduce(
//         (sum, f) => sum + parseFloat(f.outstanding_amount),
//         0
//       );

//       // Mock Scholarships Given (since no endpoint to get total scholarships)
//       // In real app, you'd call /api/scholarships or similar
//       const scholarshipsGiven = 50000; // Replace with actual API if available

//       setSummary({
//         totalCollected,
//         outstanding: totalOutstanding,
//         scholarshipsGiven,
//         paymentsThisMonth,
//       });
//     } catch (err) {
//       console.error("Dashboard Summary Error:", err);
//     }
//   };

//   /* ---------------- FETCH RECENT PAYMENTS ---------------- */
//   const fetchRecentPayments = async () => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/students/3/payments`);
//       setRecentPayments(res.data || []);
//     } catch (err) {
//       console.error("Recent Payments Error:", err);
//       setError("Failed to load recent payments.");
//     }
//   };

//   /* ---------------- FETCH OUTSTANDING FEES ---------------- */
//   const fetchOutstandingFees = async () => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/students/3/outstanding`);
//       setOutstandingFees(res.data?.fees || []);
//     } catch (err) {
//       console.error("Outstanding Fees Error:", err);
//       setError("Failed to load outstanding fees.");
//     }
//   };

//   /* ---------------- COLLECT FEE ACTION ---------------- */
//   const handleCollectFee = (feeId) => {
//     alert(
//       `Collecting fee ID: ${feeId}. In production, this would open a payment modal.`
//     );
//     // In real app, open modal to collect payment via cash/online/etc.
//   };

//   /* ---------------- ASSIGN SCHOLARSHIP ---------------- */
//   const handleAssignScholarship = async (studentId) => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/scholarships/assign`, {
//         method: "POST",
//         body: JSON.stringify({
//           student_id: studentId,
//           scholarship_id: "1", // Hardcoded for demo; replace with dynamic selection
//           academic_year: "FY",
//         }),
//       });

//       if (res.success) {
//         alert("Scholarship assigned successfully!");
//         // Optionally refresh data
//         fetchOutstandingFees();
//       }
//     } catch (err) {
//       console.error("Assign Scholarship Error:", err);
//       alert("Failed to assign scholarship.");
//     }
//   };

//   /* ---------------- CALCULATE FEE WITH SCHOLARSHIP ---------------- */
//   const calculateFeeWithScholarship = async (studentId, feeStructureId) => {
//     try {
//       const res = await safeFetchJSON(
//         `${API_BASE}/api/students/${studentId}/calculate-fee`,
//         {
//           method: "POST",
//           body: JSON.stringify({
//             fee_structure_id: feeStructureId,
//             academic_year: "2024-25",
//           }),
//         }
//       );

//       if (res.success) {
//         alert(
//           `Calculated Fee:\nTotal: ₹${res.data.total_amount}\nDiscount: ₹${res.data.discount_amount}\nFinal: ₹${res.data.final_amount}`
//         );
//       }
//     } catch (err) {
//       console.error("Calculate Fee Error:", err);
//       alert("Failed to calculate fee.");
//     }
//   };

//   /* ---------------- EFFECTS ---------------- */
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await Promise.all([
//           fetchDashboardSummary(),
//           fetchRecentPayments(),
//           fetchOutstandingFees(),
//         ]);
//       } catch (err) {
//         setError("Failed to load fee data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   /* ---------------- FILTER ---------------- */
//   const filteredOutstanding = outstandingFees.filter(
//     (f) =>
//       f.student?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
//       f.student?.admission_number?.includes(search) ||
//       f.fee_structure?.fee_head?.name
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   /* ---------------- EXPORT TO CSV ---------------- */
//   const exportToCSV = () => {
//     if (recentPayments.length === 0) {
//       alert("No data to export.");
//       return;
//     }

//     const headers = [
//       "Receipt No.",
//       "Admission No.",
//       "Student Name",
//       "Fee Head",
//       "Amount",
//       "Payment Mode",
//       "Date",
//       "Status",
//     ];

//     const csvContent = [
//       headers.join(","),
//       ...recentPayments.map((p) => {
//         const row = [
//           `"${p.receipt_number || ""}"`,
//           `"${p.student_fee?.student?.admission_number || ""}"`,
//           `"${p.student_fee?.student?.full_name || ""}"`,
//           `"${p.student_fee?.fee_structure?.fee_head?.name || ""}"`,
//           `"${p.amount || "0"}"`,
//           `"${p.payment_mode || ""}"`,
//           `"${p.payment_date ? new Date(p.payment_date).toLocaleDateString("en-CA") : ""}"`,
//           `"${p.status || ""}"`,
//         ];
//         return row.join(",");
//       }),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", `fee_collections_${new Date().toISOString().split("T")[0]}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//  /* ---------------- GENERATE RECEIPT PDF (MATCHING YOUR IMAGE) ---------------- */
// const generateReceiptPDF = (payment) => {
//   const doc = new jsPDF();

//   // Set font size for header
//   doc.setFontSize(18);
//   doc.text("SCHOOL NAME", 105, 30, { align: "center" });

//   doc.setFontSize(14);
//   doc.text("Fee Receipt", 105, 40, { align: "center" });

//   // Draw horizontal line
//   doc.line(40, 45, 170, 45);

//   // Left-aligned fields
//   let y = 60;
//   const lineHeight = 10;

//   doc.setFontSize(12);
//   doc.text(`Receipt No.: ${payment.receipt_number || "—"}`, 40, y);
//   doc.text(`Date: ${payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('en-US') : "—"}`, 150, y);

//   y += lineHeight;
//   doc.text(`Student: ${payment.student_fee?.student?.full_name || "—"}`, 40, y);

//   y += lineHeight;
//   doc.text(`Admission No.: ${payment.student_fee?.student?.admission_number || "—"}`, 40, y);

//   y += lineHeight;
//   doc.text(`Program: ${payment.student_fee?.fee_structure?.program?.name || "—"}`, 40, y);

//   y += lineHeight;
//   doc.text(`Fee Head: ${payment.student_fee?.fee_structure?.fee_head?.name || "—"}`, 40, y);

//   y += lineHeight * 2; // Extra space before amount
//   doc.setFontSize(14);
//   doc.text(`Amount Paid: ${parseFloat(payment.amount).toLocaleString()}`, 40, y);

//   y += lineHeight;
//   doc.setFontSize(12);
//   doc.text(`Payment Mode: ${payment.payment_mode?.toUpperCase() || "—"}`, 40, y);

//   y += lineHeight;
//   doc.text(`Status: ${payment.status === "success" ? "PAID" : (payment.status?.toUpperCase() || "—")}`, 40, y);

//   // Footer
//   doc.setFontSize(10);
//   doc.text("Thank you for your payment.", 105, y + 20, { align: "center" });

//   // Save with dynamic filename
//   doc.save(`receipt_${payment.receipt_number || "RCP"}.pdf`);
// };

//   /* ---------------- UI ---------------- */
//   return (
//     <Container fluid className="py-4">
//       {/* ✅ Responsive Header: stack on mobile */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
//         <h2 className="mb-0">Fee Management</h2>
//         <Button variant="primary" size="sm">
//           + Collect Fee
//         </Button>
//       </div>

//       {/* ✅ Full-width search on mobile */}
//       <Form.Control
//         placeholder="Search by admission number, name, or fee head..."
//         className="mb-4 w-100"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Dashboard Cards */}
//       {loading ? (
//         <Spinner animation="border" className="d-block mx-auto my-4" />
//       ) : (
//         <Row xs={1} md={2} lg={4} className="g-4 mb-4">
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-success bg-opacity-10 rounded-circle">
//                   <FaMoneyBillWave className="text-success" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.totalCollected.toLocaleString()}
//                   </h4>
//                   <small>Total Fees Collected</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
//                   <FaExclamationTriangle className="text-warning" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.outstanding.toLocaleString()}
//                   </h4>
//                   <small>Outstanding Fees</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
//                   <FaGraduationCap className="text-primary" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.scholarshipsGiven.toLocaleString()}
//                   </h4>
//                   <small>Scholarships Given</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-info bg-opacity-10 rounded-circle">
//                   <FaChartBar className="text-info" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">{summary.paymentsThisMonth}</h4>
//                   <small>Payments This Month</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Recent Fee Collections */}
//       <Card className="shadow-sm mb-4">
//         <Card.Header className="bg-white d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
//           <h5 className="mb-0">Recent Fee Collections</h5>
//           <div className="d-flex gap-2">
//             <Button
//               variant="outline-secondary"
//               size="sm"
//               onClick={exportToCSV}
//             >
//               Export
//             </Button>
//             <Button variant="primary" size="sm">
//               + Collect Fee 
//             </Button>
//           </div>
//         </Card.Header>
//         <Card.Body>
//           {loading ? (
//             <Spinner animation="border" className="d-block mx-auto" />
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Receipt No.</th>
//                     <th>Admission No.</th>
//                     <th>Student Name</th>
//                     <th>Fee Head</th>
//                     <th>Amount</th>
//                     <th>Payment Mode</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th className="text-nowrap">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentPayments.length > 0 ? (
//                     recentPayments.map((p) => (
//                       <tr key={p.id}>
//                         <td>{p.receipt_number}</td>
//                         <td>{p.student_fee?.student_id || "—"}</td>
//                         <td>{p.student_fee?.student?.full_name || "—"}</td>
//                         <td>{p.student_fee?.fee_structure?.fee_head?.name || "—"}</td>
//                         <td>₹{parseFloat(p.amount).toLocaleString()}</td>
//                         <td>
//                           <Badge
//                             bg={
//                               p.payment_mode === "cash"
//                                 ? "secondary"
//                                 : p.payment_mode === "online"
//                                 ? "success"
//                                 : "info"
//                             }
//                           >
//                             {p.payment_mode}
//                           </Badge>
//                         </td>
//                         <td>{new Date(p.payment_date).toLocaleDateString()}</td>
//                         <td>
//                           <Badge bg={p.status === "success" ? "success" : "warning"}>
//                             {p.status}
//                           </Badge>
//                         </td>
//                         <td>
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             onClick={() => generateReceiptPDF(p)}
//                             className="w-100 w-md-auto"
//                           >
//                             Receipt
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="text-center text-muted py-3">
//                         No recent payments.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Outstanding Fees */}
//       <Card className="shadow-sm">
//         <Card.Header className="bg-white">
//           <h5 className="mb-0">Outstanding Fees</h5>
//         </Card.Header>
//         <Card.Body>
//           {loading ? (
//             <Spinner animation="border" className="d-block mx-auto" />
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Admission No.</th>
//                     <th>Student Name</th>
//                     <th>Program</th>
//                     <th>Total Amount</th>
//                     <th>Paid Amount</th>
//                     <th>Outstanding</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOutstanding.length > 0 ? (
//                     filteredOutstanding.map((f) => (
//                       <tr key={f.id}>
//                         <td>{f.student?.admission_number || "—"}</td>
//                         <td>{f.student?.full_name || "—"}</td>
//                         <td>{f.fee_structure?.program?.name || "—"}</td>
//                         <td>₹{parseFloat(f.total_amount).toLocaleString()}</td>
//                         <td>₹{parseFloat(f.paid_amount).toLocaleString()}</td>
//                         <td>
//                           <span
//                             className={
//                               parseFloat(f.outstanding_amount) > 0
//                                 ? "text-danger"
//                                 : "text-success"
//                             }
//                           >
//                             ₹{parseFloat(f.outstanding_amount).toLocaleString()}
//                           </span>
//                         </td>
//                         <td>
//                           <Button
//                             variant="primary"
//                             size="sm"
//                             onClick={() => handleCollectFee(f.id)}
//                             className="w-100 w-md-auto"
//                           >
//                             <FaMoneyBillWave className="me-1" /> Collect
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center text-muted py-3">
//                         {search
//                           ? "No matching outstanding fees."
//                           : "All fees are paid."}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default PrincipalFees;


// import jsPDF from "jspdf";
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Badge,
//   Button,
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Form,
//   Container,
//   Modal,
//   InputGroup,
// } from "react-bootstrap";
// import {
//   FaMoneyBillWave,
//   FaExclamationTriangle,
//   FaGraduationCap,
//   FaChartBar,
// } from "react-icons/fa";
// import * as XLSX from "xlsx"; // ✅ Required for Excel export

// // ✅ FIXED: Removed trailing spaces that break all API calls
// const API_BASE = "https://serp.lemmecode.in/schoolerp";

// const PrincipalFees = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   // Dashboard Summary
//   const [summary, setSummary] = useState({
//     totalCollected: 0,
//     outstanding: 0,
//     scholarshipsGiven: 0,
//     paymentsThisMonth: 0,
//   });

//   // Tables Data
//   const [recentPayments, setRecentPayments] = useState([]);
//   const [outstandingFees, setOutstandingFees] = useState([]);

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

//   /* ---------------- FETCH DASHBOARD SUMMARY ---------------- */
//   const fetchDashboardSummary = async () => {
//     try {
//       // Get recent payments (for "Payments This Month")
//       const paymentsRes = await safeFetchJSON(
//         `${API_BASE}/api/students/3/payments`
//       );
//       const thisMonth = new Date().getMonth();
//       const paymentsThisMonth = paymentsRes.data.filter((p) => {
//         const date = new Date(p.payment_date);
//         return date.getMonth() === thisMonth;
//       }).length;

//       // Get outstanding report (for "Outstanding Fees" & "Total Fees Collected")
//       const outstandingReport = await safeFetchJSON(
//         `${API_BASE}/api/reports/outstanding`
//       );
//       const totalCollected = outstandingReport.data.fees.reduce(
//         (sum, f) => sum + parseFloat(f.paid_amount),
//         0
//       );
//       const totalOutstanding = outstandingReport.data.fees.reduce(
//         (sum, f) => sum + parseFloat(f.outstanding_amount),
//         0
//       );

//       // Mock Scholarships Given (since no endpoint to get total scholarships)
//       // In real app, you'd call /api/scholarships or similar
//       const scholarshipsGiven = 50000; // Replace with actual API if available

//       setSummary({
//         totalCollected,
//         outstanding: totalOutstanding,
//         scholarshipsGiven,
//         paymentsThisMonth,
//       });
//     } catch (err) {
//       console.error("Dashboard Summary Error:", err);
//     }
//   };

//   /* ---------------- FETCH RECENT PAYMENTS ---------------- */
//   const fetchRecentPayments = async () => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/students/3/payments`);
//       setRecentPayments(res.data || []);
//     } catch (err) {
//       console.error("Recent Payments Error:", err);
//       setError("Failed to load recent payments.");
//     }
//   };

//   /* ---------------- FETCH OUTSTANDING FEES ---------------- */
//   const fetchOutstandingFees = async () => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/students/3/outstanding`);
//       setOutstandingFees(res.data?.fees || []);
//     } catch (err) {
//       console.error("Outstanding Fees Error:", err);
//       setError("Failed to load outstanding fees.");
//     }
//   };

//   /* ---------------- COLLECT FEE ACTION ---------------- */
//   const handleCollectFee = (feeId) => {
//     alert(
//       `Collecting fee ID: ${feeId}. In production, this would open a payment modal.`
//     );
//     // In real app, open modal to collect payment via cash/online/etc.
//   };

//   /* ---------------- ASSIGN SCHOLARSHIP ---------------- */
//   const handleAssignScholarship = async (studentId) => {
//     try {
//       const res = await safeFetchJSON(`${API_BASE}/api/scholarships/assign`, {
//         method: "POST",
//         body: JSON.stringify({
//           student_id: studentId,
//           scholarship_id: "1", // Hardcoded for demo; replace with dynamic selection
//           academic_year: "FY",
//         }),
//       });

//       if (res.success) {
//         alert("Scholarship assigned successfully!");
//         // Optionally refresh data
//         fetchOutstandingFees();
//       }
//     } catch (err) {
//       console.error("Assign Scholarship Error:", err);
//       alert("Failed to assign scholarship.");
//     }
//   };

//   /* ---------------- CALCULATE FEE WITH SCHOLARSHIP ---------------- */
//   const calculateFeeWithScholarship = async (studentId, feeStructureId) => {
//     try {
//       const res = await safeFetchJSON(
//         `${API_BASE}/api/students/${studentId}/calculate-fee`,
//         {
//           method: "POST",
//           body: JSON.stringify({
//             fee_structure_id: feeStructureId,
//             academic_year: "2024-25",
//           }),
//         }
//       );

//       if (res.success) {
//         alert(
//           `Calculated Fee:\nTotal: ₹${res.data.total_amount}\nDiscount: ₹${res.data.discount_amount}\nFinal: ₹${res.data.final_amount}`
//         );
//       }
//     } catch (err) {
//       console.error("Calculate Fee Error:", err);
//       alert("Failed to calculate fee.");
//     }
//   };

//   /* ---------------- EFFECTS ---------------- */
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await Promise.all([
//           fetchDashboardSummary(),
//           fetchRecentPayments(),
//           fetchOutstandingFees(),
//         ]);
//       } catch (err) {
//         setError("Failed to load fee data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   /* ---------------- FILTER ---------------- */
//   const filteredOutstanding = outstandingFees.filter(
//     (f) =>
//       f.student?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
//       f.student?.admission_number?.includes(search) ||
//       f.fee_structure?.fee_head?.name
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   /* ---------------- HELPER: Convert Data to Worksheet ---------------- */
//   const createWorksheet = (data) => {
//     const ws = XLSX.utils.json_to_sheet(data);
//     return ws;
//   };

//    /* ---------------- EXPORT ALL TO EXCEL ---------------- */
//   const exportToExcel = () => {
//     if (recentPayments.length === 0) {
//       alert("No data to export.");
//       return;
//     }

//     const data = recentPayments.map((p) => {
//       // Extract nested values safely
//       const student = p.student_fee?.student || {};
//       const feeStructure = p.student_fee?.fee_structure || {};
//       const feeHead = feeStructure.fee_head || {};

//       return {
//         "Receipt No.": p.receipt_number || "N/A",
//         "Admission No.": student.admission_number || "N/A",
//         "Student Name": student.full_name || "N/A",
//         "Fee Head": feeHead.name || "N/A",
//         "Amount": p.amount || "0",
//         "Payment Mode": p.payment_mode || "N/A",
//         "Date": p.payment_date
//           ? new Date(p.payment_date).toLocaleDateString("en-CA")
//           : "N/A",
//         "Status": p.status || "N/A",
//       };
//     });

//     const ws = createWorksheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Fee Collections");
//     XLSX.writeFile(
//       wb,
//       `fee_collections_${new Date().toISOString().split("T")[0]}.xlsx`
//     );
//   };

//   /* ---------------- EXPORT SINGLE ROW TO EXCEL ---------------- */
//   const exportRowToExcel = (payment) => {
//     // Extract nested values safely
//     const student = payment.student_fee?.student || {};
//     const feeStructure = payment.student_fee?.fee_structure || {};
//     const feeHead = feeStructure.fee_head || {};

//     const data = [
//       {
//         "Receipt No.": payment.receipt_number || "N/A",
//         "Admission No.": student.admission_number || "N/A",
//         "Student Name": student.full_name || "N/A",
//         "Fee Head": feeHead.name || "N/A",
//         "Amount": payment.amount || "0",
//         "Payment Mode": payment.payment_mode || "N/A",
//         "Date": payment.payment_date
//           ? new Date(payment.payment_date).toLocaleDateString("en-CA")
//           : "N/A",
//         "Status": payment.status || "N/A",
//       },
//     ];

//     const ws = createWorksheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Fee Receipt");
//     XLSX.writeFile(
//       wb,
//       `receipt_${payment.receipt_number || "RCP"}.xlsx`
//     );
//   };

//   /* ---------------- GENERATE RECEIPT PDF (MATCHING YOUR IMAGE) ---------------- */
//   const generateReceiptPDF = (payment) => {
//     const doc = new jsPDF();

//     // Set font size for header
//     doc.setFontSize(18);
//     doc.text("SCHOOL NAME", 105, 30, { align: "center" });

//     doc.setFontSize(14);
//     doc.text("Fee Receipt", 105, 40, { align: "center" });

//     // Draw horizontal line
//     doc.line(40, 45, 170, 45);

//     // Left-aligned fields
//     let y = 60;
//     const lineHeight = 10;

//     doc.setFontSize(12);
//     doc.text(`Receipt No.: ${payment.receipt_number || "—"}`, 40, y);
//     doc.text(`Date: ${payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('en-US') : "—"}`, 150, y);

//     y += lineHeight;
//     doc.text(`Student: ${payment.student_fee?.student?.full_name || "—"}`, 40, y);

//     y += lineHeight;
//     doc.text(`Admission No.: ${payment.student_fee?.student?.admission_number || "—"}`, 40, y);

//     y += lineHeight;
//     doc.text(`Program: ${payment.student_fee?.fee_structure?.program?.name || "—"}`, 40, y);

//     y += lineHeight;
//     doc.text(`Fee Head: ${payment.student_fee?.fee_structure?.fee_head?.name || "—"}`, 40, y);

//     y += lineHeight * 2; // Extra space before amount
//     doc.setFontSize(14);
//     doc.text(`Amount Paid: ${parseFloat(payment.amount).toLocaleString()}`, 40, y);

//     y += lineHeight;
//     doc.setFontSize(12);
//     doc.text(`Payment Mode: ${payment.payment_mode?.toUpperCase() || "—"}`, 40, y);

//     y += lineHeight;
//     doc.text(`Status: ${payment.status === "success" ? "PAID" : (payment.status?.toUpperCase() || "—")}`, 40, y);

//     // Footer
//     doc.setFontSize(10);
//     doc.text("Thank you for your payment.", 105, y + 20, { align: "center" });

//     // Save with dynamic filename
//     doc.save(`receipt_${payment.receipt_number || "RCP"}.pdf`);
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <Container fluid className="py-4">
//       {/* ✅ Responsive Header: stack on mobile */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
//         <h2 className="mb-0">Fee Management</h2>
//         <Button variant="primary" size="sm">
//           + Collect Fee
//         </Button>
//       </div>

//       {/* ✅ Full-width search on mobile */}
//       <Form.Control
//         placeholder="Search by admission number, name, or fee head..."
//         className="mb-4 w-100"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Dashboard Cards */}
//       {loading ? (
//         <Spinner animation="border" className="d-block mx-auto my-4" />
//       ) : (
//         <Row xs={1} md={2} lg={4} className="g-4 mb-4">
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-success bg-opacity-10 rounded-circle">
//                   <FaMoneyBillWave className="text-success" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.totalCollected.toLocaleString()}
//                   </h4>
//                   <small>Total Fees Collected</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
//                   <FaExclamationTriangle className="text-warning" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.outstanding.toLocaleString()}
//                   </h4>
//                   <small>Outstanding Fees</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
//                   <FaGraduationCap className="text-primary" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">
//                     ₹{summary.scholarshipsGiven.toLocaleString()}
//                   </h4>
//                   <small>Scholarships Given</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card className="shadow-sm h-100">
//               <Card.Body className="d-flex align-items-center">
//                 <div className="me-3 p-2 bg-info bg-opacity-10 rounded-circle">
//                   <FaChartBar className="text-info" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="mb-0">{summary.paymentsThisMonth}</h4>
//                   <small>Payments This Month</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Recent Fee Collections */}
//       <Card className="shadow-sm mb-4">
//         <Card.Header className="bg-white d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
//           <h5 className="mb-0">Recent Fee Collections</h5>
//           <div className="d-flex gap-2">
//             <Button
//               variant="outline-secondary"
//               size="sm"
//               onClick={exportToExcel} // ✅ Now exports Excel for all
//             >
//               Export
//             </Button>
//             <Button variant="primary" size="sm">
//               + Collect Fee
//             </Button>
//           </div>
//         </Card.Header>
//         <Card.Body>
//           {loading ? (
//             <Spinner animation="border" className="d-block mx-auto" />
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Receipt No.</th>
//                     <th>Admission No.</th>
//                     <th>Student Name</th>
//                     <th>Fee Head</th>
//                     <th>Amount</th>
//                     <th>Payment Mode</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th className="text-nowrap">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentPayments.length > 0 ? (
//                     recentPayments.map((p) => (
//                       <tr key={p.id}>
//                         <td>{p.receipt_number}</td>
//                         <td>{p.student_fee?.student_id || "—"}</td>
//                         <td>{p.student_fee?.student?.full_name || "—"}</td>
//                         <td>{p.student_fee?.fee_structure?.fee_head?.name || "—"}</td>
//                         <td>₹{parseFloat(p.amount).toLocaleString()}</td>
//                         <td>
//                           <Badge
//                             bg={
//                               p.payment_mode === "cash"
//                                 ? "secondary"
//                                 : p.payment_mode === "online"
//                                 ? "success"
//                                 : "info"
//                             }
//                           >
//                             {p.payment_mode}
//                           </Badge>
//                         </td>
//                         <td>{new Date(p.payment_date).toLocaleDateString()}</td>
//                         <td>
//                           <Badge bg={p.status === "success" ? "success" : "warning"}>
//                             {p.status}
//                           </Badge>
//                         </td>
//                         <td>
//                           <div className="d-flex flex-column flex-md-row gap-1">
//                             <Button
//                               variant="outline-primary"
//                               size="sm"
//                               onClick={() => generateReceiptPDF(p)}
//                             >
//                               Receipt
//                             </Button>
//                             <Button
//                               variant="outline-secondary"
//                               size="sm"
//                               onClick={() => exportRowToExcel(p)} // ✅ NEW: Export single row as Excel
//                             >
//                               Export Row
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="text-center text-muted py-3">
//                         No recent payments.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Outstanding Fees */}
//       <Card className="shadow-sm">
//         <Card.Header className="bg-white">
//           <h5 className="mb-0">Outstanding Fees</h5>
//         </Card.Header>
//         <Card.Body>
//           {loading ? (
//             <Spinner animation="border" className="d-block mx-auto" />
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Admission No.</th>
//                     <th>Student Name</th>
//                     <th>Program</th>
//                     <th>Total Amount</th>
//                     <th>Paid Amount</th>
//                     <th>Outstanding</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOutstanding.length > 0 ? (
//                     filteredOutstanding.map((f) => (
//                       <tr key={f.id}>
//                         <td>{f.student?.admission_number || "—"}</td>
//                         <td>{f.student?.full_name || "—"}</td>
//                         <td>{f.fee_structure?.program?.name || "—"}</td>
//                         <td>₹{parseFloat(f.total_amount).toLocaleString()}</td>
//                         <td>₹{parseFloat(f.paid_amount).toLocaleString()}</td>
//                         <td>
//                           <span
//                             className={
//                               parseFloat(f.outstanding_amount) > 0
//                                 ? "text-danger"
//                                 : "text-success"
//                             }
//                           >
//                             ₹{parseFloat(f.outstanding_amount).toLocaleString()}
//                           </span>
//                         </td>
//                         <td>
//                           <Button
//                             variant="primary"
//                             size="sm"
//                             onClick={() => handleCollectFee(f.id)}
//                             className="w-100 w-md-auto"
//                           >
//                             <FaMoneyBillWave className="me-1" /> Collect
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center text-muted py-3">
//                         {search
//                           ? "No matching outstanding fees."
//                           : "All fees are paid."}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default PrincipalFees;




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

// ✅ FIXED: Removed trailing spaces
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
  const [studentCache, setStudentCache] = useState({}); // Cache student by ID

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

  /* ---------------- FETCH STUDENT (to get name/admission) ---------------- */
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

  /* ---------------- FETCH DASHBOARD SUMMARY ---------------- */
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

      // Count payments this month from outstanding (approximation)
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

  /* ---------------- FETCH RECENT PAYMENTS (from /fees) ---------------- */
  const fetchRecentPayments = async () => {
    try {
      // Hardcoded student ID = 3 as in your original code
      const res = await safeFetchJSON(`${API_BASE}/api/students/3/fees`);
      const fees = res.data || [];

      // Convert fee records to "payment-like" objects
      const payments = await Promise.all(
        fees
          .filter(fee => fee.status === 'paid' || fee.status === 'partial')
          .map(async (fee) => {
            // Fetch student to get full name and admission number
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
              payment_mode: "offline", // Default since not in API
              payment_date: fee.updated_at, // Assume payment happened when updated
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

  /* ---------------- FETCH OUTSTANDING FEES ---------------- */
  const fetchOutstandingFees = async () => {
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/reports/outstanding`);
      setOutstandingFees(res.data?.fees || []);
    } catch (err) {
      console.error("Outstanding Fees Error:", err);
      setError("Failed to load outstanding fees.");
    }
  };

  /* ---------------- COLLECT FEE ACTION ---------------- */
  const handleCollectFee = (feeId) => {
    alert(`Collecting fee ID: ${feeId}.`);
  };

  /* ---------------- ASSIGN SCHOLARSHIP ---------------- */
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

  /* ---------------- EXPORT HELPER ---------------- */
  const createWorksheet = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    return ws;
  };

  /* ---------------- EXPORT ALL TO EXCEL ---------------- */
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

  /* ---------------- EXPORT SINGLE ROW TO EXCEL ---------------- */
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

  /* ---------------- GENERATE RECEIPT PDF ---------------- */
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
    doc.text(`Program: ${payment.student_fee?.fee_structure?.program?.name || "—"}`, 40, y);
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

  /* ---------------- EFFECTS ---------------- */
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

  /* ---------------- FILTER ---------------- */
  const filteredOutstanding = outstandingFees.filter(
    (f) =>
      f.student?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      f.student?.admission_number?.includes(search) ||
      f.fee_structure?.fee_head?.name
        ?.toLowerCase()
        ?.includes(search.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
        <h2 className="mb-0">Fee Management</h2>
        <Button variant="primary" size="sm">+ Collect Fee</Button>
      </div>

      <Form.Control
        placeholder="Search by admission number, name, or fee head..."
        className="mb-4 w-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto my-4" />
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4 mb-4">
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-success bg-opacity-10 rounded-circle">
                  <FaMoneyBillWave className="text-success" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">₹{summary.totalCollected.toLocaleString()}</h4>
                  <small>Total Fees Collected</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
                  <FaExclamationTriangle className="text-warning" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">₹{summary.outstanding.toLocaleString()}</h4>
                  <small>Outstanding Fees</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                  <FaGraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">₹{summary.scholarshipsGiven.toLocaleString()}</h4>
                  <small>Scholarships Given</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 p-2 bg-info bg-opacity-10 rounded-circle">
                  <FaChartBar className="text-info" size={24} />
                </div>
                <div>
                  <h4 className="mb-0">{summary.paymentsThisMonth}</h4>
                  <small>Payments This Month</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recent Fee Collections */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
          <h5 className="mb-0">Recent Fee Collections</h5>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={exportToExcel}>
              Export
            </Button>
            <Button variant="primary" size="sm">+ Collect Fee</Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" className="d-block mx-auto" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Admission No.</th>
                    <th>Student Name</th>
                    <th>Fee Head</th>
                    <th>Amount</th>
                    <th>Payment Mode</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                          <Badge bg={p.status === "success" ? "success" : "warning"}>
                            {p.status === "success" ? "PAID" : "PARTIAL"}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex flex-column flex-md-row gap-1">
                            <Button variant="outline-primary" size="sm" onClick={() => generateReceiptPDF(p)}>
                              Receipt
                            </Button>
                            <Button variant="outline-secondary" size="sm" onClick={() => exportRowToExcel(p)}>
                              Export Row
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
          )}
        </Card.Body>
      </Card>

      {/* Outstanding Fees */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Outstanding Fees</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" className="d-block mx-auto" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Admission No.</th>
                    <th>Student Name</th>
                    {/* <th>Program</th> */}
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Outstanding</th>
                    <th>Actions</th>
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
                        {/* <td>{f.fee_structure?.program?.name || "—"}</td> */}
                        <td>₹{parseFloat(f.total_amount).toLocaleString()}</td>
                        <td>₹{parseFloat(f.paid_amount).toLocaleString()}</td>
                        <td>
                          <span className={parseFloat(f.outstanding_amount) > 0 ? "text-danger" : "text-success"}>
                            ₹{parseFloat(f.outstanding_amount).toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => handleCollectFee(f.id)} className="w-100 w-md-auto">
                            <FaMoneyBillWave className="me-1" /> Collect
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-3">
                        {search ? "No matching outstanding fees." : "All fees are paid."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrincipalFees;