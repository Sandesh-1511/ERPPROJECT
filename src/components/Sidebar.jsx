// src/components/Sidebar.jsx
import React from "react";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="text-white p-3"
      style={{ width: 240, background: "#1e293b", minHeight: "100vh" }}
    >
      <h5>{user?.name}</h5>
      <hr />
      <p className="small text-uppercase">{user?.role}</p>
    </div>
  );
}

export default Sidebar;
