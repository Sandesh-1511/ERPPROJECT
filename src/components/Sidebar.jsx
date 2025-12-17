// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ show, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block bg-danger text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h5 className="mb-4">ERP Panel</h5>

        <NavLink to="/department" className="text-white d-block mb-3">
          Department
        </NavLink>

        <NavLink to="/dashboard" className="text-white d-block">
          Dashboard
        </NavLink>
      </div>

      {/* Mobile Sidebar */}
      {show && (
        <div
          className="position-fixed top-0 start-0 bg-danger text-white p-3"
          style={{
            width: "250px",
            height: "100vh",
            zIndex: 1050,
          }}
        >
          <button
            className="btn btn-light btn-sm mb-4"
            onClick={onClose}
          >
            Close
          </button>

          <NavLink
            to="/department"
            className="text-white d-block mb-3"
            onClick={onClose}
          >
            Department
          </NavLink>

          <NavLink
            to="/dashboard"
            className="text-white d-block"
            onClick={onClose}
          >
            Dashboard
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Sidebar;
