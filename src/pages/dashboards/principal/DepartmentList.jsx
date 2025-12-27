// src/pages/principal/DepartmentList.jsx
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
import { FaBuilding, FaEdit, FaTrash } from "react-icons/fa";

const API_BASE = "https://serp.lemmecode.in/schoolerp";

const DepartmentList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
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

  const fetchDepartment = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await safeFetchJSON(`${API_BASE}/api/departments/${id}`);
      if (res.success && res.data) {
        setDepartment(res.data);
      } else {
        throw new Error(res.message || "Department not found");
      }
    } catch (err) {
      console.error("Fetch Department Error:", err);
      setError(`Failed to load department: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${department.name}"? This cannot be undone.`)) return;

    try {
      const res = await safeFetchJSON(`${API_BASE}/api/departments/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        navigate("/dashboard/principal/departments");
      } else {
        throw new Error(res.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Department Error:", err);
      setError(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (id) fetchDepartment();
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

  if (!department) {
    return (
      <div className="container mt-5 text-center">
        <h4>Department not found</h4>
        <Link to="/dashboard/principal/departments">
          <Button variant="primary">← Back to Departments</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBuilding className="me-2" />
          {department.name}
        </h2>
        <div>
          <Link to="/dashboard/principal/departments">
            <Button variant="outline-secondary">← Back to List</Button>
          </Link>
          <Link to={`/dashboard/principal/departments/edit/${department.id}`} className="ms-2">
            <Button variant="warning">
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
              <p><strong>Name:</strong> {department.name}</p>
              <p><strong>Code:</strong> {department.code}</p>
              <p><strong>Description:</strong> {department.description || "—"}</p>
              <p><strong>Status:</strong> <Badge bg={department.is_active ? "success" : "secondary"}>{department.is_active ? "Active" : "Inactive"}</Badge></p>
            </Col>
            <Col md={6}>
              <h5>Programs</h5>
              {department.programs && department.programs.length > 0 ? (
                <ul className="list-unstyled">
                  {department.programs.map((p) => (
                    <li key={p.id}>
                      <Link to={`/dashboard/principal/programs/${p.id}`}>
                        {p.name} ({p.short_name})
                      </Link>
                      <br />
                      <small>
                        {p.program_type} • {p.duration_years} years • {p.total_semesters} semesters
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No programs assigned.</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DepartmentList;