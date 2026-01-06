// src/pages/principal/ProgramList.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaBook, FaEdit, FaTrash } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const ProgramList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const fetchProgram = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/programs/${id}`);
      if (res.success && res.data) {
        setProgram(res.data);
      } else {
        throw new Error(res.message || "Program not found");
      }
    } catch (err) {
      console.error("Fetch Program Error:", err);
      setError(`Failed to load program: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${program.name}"? This cannot be undone.`)) return;

    try {
      const res = await safeFetchJSON(`${API_BASE}/api/programs/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        navigate("/dashboard/principal/programs");
      } else {
        throw new Error(res.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Program Error:", err);
      setError(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (id) fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center">
          <Link to="/dashboard/principal/departments">
            <Button variant="primary">← Back to Departments</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mt-5 text-center">
        <h4>Program not found</h4>
        <Link to="/dashboard/principal/programs">
          <Button variant="primary">← Back to Programs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBook className="me-2" />
          {program.name}
        </h2>
        <div>
          <Link to="/dashboard/principal/departments">
            <Button variant="outline-secondary">← Back to List</Button>
          </Link>
          <Link to={`/dashboard/principal/programs/edit/${program.id}`} className="ms-2">
            <Button style={{backgroundColor: "#04626a", border: "none"}}>
              <FaEdit className="me-1" /> Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            className="ms-2"
            onClick={handleDelete}
          >
            <FaTrash className="me-1" /> Delete
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Details</h5>
              <p><strong>Name:</strong> {program.name}</p>
              <p><strong>Short Name:</strong> {program.short_name}</p>
              <p><strong>Code:</strong> {program.code}</p>
              <p><strong>Duration:</strong> {program.duration_years} years</p>
              <p><strong>Semesters:</strong> {program.total_semesters}</p>
              <p><strong>Type:</strong> <Badge bg={program.program_type === 'undergraduate' ? 'success' : 'warning'}>{program.program_type}</Badge></p>
              <p><strong>Status:</strong> <Badge bg={program.is_active ? "success" : "secondary"}>{program.is_active ? "Active" : "Inactive"}</Badge></p>
            </Col>
            <Col md={6}>
              <h5>Department</h5>
              {program.department ? (
                <div>
                  <p><strong>Name:</strong> {program.department.name}</p>
                  <p><strong>Code:</strong> {program.department.code}</p>
                  <p><strong>Description:</strong> {program.department.description || "—"}</p>
                  <p><strong>Status:</strong> <Badge bg={program.department.is_active ? "success" : "secondary"}>{program.department.is_active ? "Active" : "Inactive"}</Badge></p>
                </div>
              ) : (
                <p className="text-muted">No department assigned.</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProgramList;