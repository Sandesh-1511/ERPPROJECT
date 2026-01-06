// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const user = await login(email, password);

      // ✅ ROLE NOW EXISTS
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card border-0 shadow-lg"
        style={{
          width: 400,
          borderRadius: 18,
        }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "#2563eb",
                color: "#fff",
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              🎓
            </div>
            <h4 className="fw-bold mb-1">Education Portal</h4>
            <small className="text-muted">Login to your account</small>
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-lg pe-5"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 👁 Eye Button */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 15,
                top: "50%",
                transform: "translateY(5px)",
                cursor: "pointer",
                color: "#6b7280",
                fontSize: 14,
                userSelect: "none",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              border: "none",
              fontWeight: 600,
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
            )}
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4">
            <small className="text-muted">
              © {new Date().getFullYear()} Education Portal
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
