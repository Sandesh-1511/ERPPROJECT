// // src/pages/principal/PrincipalStudents.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Card,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";

// // ✅ Fixed API URL (no trailing spaces)
// const API_DEFAULT = "https://serp.lemmecode.in/schoolerp  ";
// const API_BASE = API_DEFAULT.trim();

// const PrincipalStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

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

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filtered = students.filter(
//     (s) =>
//       s.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       (s.admission_number && s.admission_number.includes(search)) ||
//       (s.roll_number && s.roll_number.includes(search))
//   );

//   // ✅ Theme constants from Sidebar
//   const theme = {
//     primary: "#04626a",
//     primaryHover: "#057a84", // slightly lighter for hover
//     textLight: "#ffffff",
//     borderLight: "rgba(255, 255, 255, 0.3)",
//   };

//   return (
//     <div className="p-3 p-md-4 w-100">
//       <Card
//         className="shadow-sm border-0"
//         style={{
//           background: "rgba(255, 255, 255, 0.05)",
//           backdropFilter: "blur(10px)",
//           WebkitBackdropFilter: "blur(10px)",
//           border: `1px solid ${theme.borderLight}`,
//           borderRadius: "12px",
//         }}
//       >
//         <Card.Body>
//           {/* Header */}
//           <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
//             <h4 className="text-dark m-0 fw-bold">Students</h4>
//             <Link to="/dashboard/principal/students/add">
//               <Button
//                 style={{
//                   backgroundColor: theme.primary,
//                   border: "none",
//                   color: theme.textLight,
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = theme.primaryHover)}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = theme.primary)}
//               >
//                 + Add Student
//               </Button>
//             </Link>
//           </div>

//           {/* Search */}
//           <Form.Control
//             placeholder="Search student by name, admission no, or roll no..."
//             className="mb-4 w-100 shadow-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{
//               background: "rgba(13, 13, 13, 0)",
//               color: theme.textLight,
//               borderRadius: "10px",
//               padding: "0.6rem 1rem",
//             }}
//           />

//           {/* Loading & Error */}
//           {loading && (
//             <div className="d-flex justify-content-center my-4">
//               <Spinner animation="border" variant="light" />
//             </div>
//           )}

//           {error && (
//             <Alert variant="danger" className="text-dark">
//               {error}
//             </Alert>
//           )}

//           {/* Table */}
//           {!loading && !error && (
//             <div className="table-responsive">
//               <Table
//                 bordered
//                 hover
//                 className="align-middle text-light table-striped"
//                 style={{
//                   borderRadius: "8px",
//                   overflow: "hidden",
//                   border: `1px solid ${theme.borderLight}`,
//                 }}
//               >
//                 <thead style={{ backgroundColor: "rgba(4, 98, 106, 0.3)", textAlign: "center" }}>
//                   <tr>
//                     <th style={{ width: "5%" }}>Sr. No</th>
//                     <th>Name</th>
//                     <th>Class</th>
//                     <th>Admission No</th>
//                     <th>Roll No</th>
//                     <th className="text-center" style={{ width: "20%" }}>
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.length > 0 ? (
//                     filtered.map((s, i) => (
//                       <tr
//                         key={s.id}
//                         style={{
//                           borderBottom: `1px solid ${theme.borderLight}`,
//                         }}
//                       >
//                         <td className="text-center">{i + 1}</td>
//                         <td className="text-truncate" style={{ maxWidth: "150px" }}>
//                           {s.full_name}
//                         </td>
//                         <td className="text-truncate" style={{ maxWidth: "120px" }}>
//                           {s.class_section}
//                         </td>
//                         <td>{s.admission_number || "—"}</td>
//                         <td>{s.roll_number || "—"}</td>
//                         <td className="text-center">
//                           <div className="d-flex justify-content-center gap-2 flex-wrap flex-column flex-md-row">
//                             <Link to={`/dashboard/principal/student-view/${s.id}`}>
//                               <Button
//                                 size="sm"
//                                 variant="outline-light"
//                                 style={{
//                                   fontSize: "0.85rem",
//                                   padding: "0.375rem 0.75rem",
//                                   borderRadius: "6px",
//                                   backgroundColor: "rgba(4, 138, 150, 1)",
//                                 }}
//                               >
//                                 View
//                               </Button>
//                             </Link>
//                             <Link to={`/dashboard/principal/students/edit/${s.id}`}>
//                               <Button
//                                 size="sm"
//                                 variant="outline-warning"
//                                 style={{
//                                   fontSize: "0.85rem",
//                                   padding: "0.375rem 0.75rem",
//                                   borderRadius: "6px",
//                                   color: "white",
//                                   backgroundColor: "rgba(79, 88, 88, 1)",
//                                   border: "none",
//                                 }}
//                               >
//                                 Edit
//                               </Button>
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-center py-4 text-muted">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
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
  Container,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// ✅ FIXED: Removed trailing spaces
const API_DEFAULT = "https://serp.lemmecode.in/schoolerp";
const API_BASE = API_DEFAULT.trim(); // Extra safety

const PrincipalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
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
    <Container fluid className="py-3">
      <Card
        className="shadow-sm border-0"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Card.Body className="p-4">
          {/* Header: Responsive */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
            <h5 className="m-0 fw-bold text-dark">Students</h5>
            <div>
              <Button
                variant="primary"
                className="d-flex align-items-center"
                style={{
                  backgroundColor: "#04626a",
                  border: "none",
                  fontSize: "0.95rem",
                  padding: "8px 16px",
                  fontWeight: "500",
                }}
                onClick={() => navigate("/dashboard/principal/students/add")}
              >
                + Add Student
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <Form.Control
            placeholder="Search student by name, admission no, or roll no..."
            className="mb-4 rounded-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontSize: "0.95rem",
              padding: "10px 16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          />

          {/* Loading State */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading students...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert
              variant="danger"
              className="rounded-pill mt-3"
              style={{ fontSize: "0.95rem", textAlign: "center" }}
            >
              {error}
            </Alert>
          )}

          {/* Mobile-Friendly List View */}
          {!loading && !error && (
            <>
              {/* Desktop Table */}
              <div className="d-none d-md-block">
                <Table
                  bordered
                  hover
                  className="align-middle table-striped"
                  style={{
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <thead
                    className="bg-light"
                    style={{
                      fontWeight: "600",
                      fontSize: "0.95rem",
                    }}
                  >
                    <tr>
                      <th>Sr. No</th>
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
                          <td className="text-center">{i + 1}</td>
                          <td>{s.full_name}</td>
                          <td>{s.class_section}</td>
                          <td>{s.admission_number || "—"}</td>
                          <td>{s.roll_number || "—"}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <Link to={`/dashboard/principal/student-view/${s.id}`}>
                                <Button
                                  size="sm"
                                  variant="info"
                                  className="rounded-2"
                                  style={{
                                    border: "none",
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    padding: "4px 12px",
                                    backgroundColor: "rgba(4, 138, 150, 1)",
                                    color: "white"
                                  }}
                                >
                                  View
                                </Button>
                              </Link>
                              <Link to={`/dashboard/principal/students/edit/${s.id}`}>
                                <Button
                                  size="sm"
                                  variant="warning"
                                  className="rounded-2"
                                  style={{
                                    backgroundColor: "rgba(79, 88, 88, 1)",
                                    border: "none",
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    padding: "4px 12px",
                                    color: "white"
                                  }}
                                >
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Mobile Card List */}
              <div className="d-md-none">
                {filtered.length > 0 ? (
                  filtered.map((s, i) => (
                    <Card
                      key={s.id}
                      className="mb-3 shadow-sm border"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1 fw-bold">{s.full_name}</h6>
                            <div className="d-flex align-items-center">
                              <Badge bg="secondary" className="me-2 p-2">
                              {i + 1}
                            </Badge>
                            <p className="m-0 p-1 text-light rounded-2" style={{backgroundColor: "#04626a"}}>
                              {s.class_section}
                            </p>
                            </div>
                          </div>
                        </div>
                        <Row className="gx-2 mb-2">
                          <Col xs={6}>
                            <small className="text-muted">Admission No</small>
                            <div>{s.admission_number || "—"}</div>
                          </Col>
                          <Col xs={6}>
                            <small className="text-muted">Roll No</small>
                            <div>{s.roll_number || "—"}</div>
                          </Col>
                        </Row>
                        <div className="d-flex gap-2">
                          <Link to={`/dashboard/principal/student-view/${s.id}`}>
                            <Button
                              size="sm"
                              variant="info"
                              className="rounded-2"
                              style={{
                                fontSize: "0.85rem",
                                padding: "4px 12px",
                                fontWeight: "bold", 
                                backgroundColor: "rgba(4, 138, 150, 1)",
                                color: "white",
                                border: "none"
                              }}
                            >
                              View
                            </Button>
                          </Link>
                          <Link to={`/dashboard/principal/students/edit/${s.id}`}>
                            <Button
                              size="sm"
                              variant="warning"
                              className="rounded-2"
                              style={{
                                fontSize: "0.85rem",
                                padding: "4px 12px",
                                fontWeight: "bold",
                                backgroundColor: "rgba(79, 88, 88, 1)",
                                color: "white",
                                border: "none"
                              }}
                            >
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card className="text-center p-4">
                    <p className="text-muted mb-0">No students found.</p>
                  </Card>
                )}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrincipalStudents;