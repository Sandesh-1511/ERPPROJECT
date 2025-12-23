// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) return <Navigate to="/" />;

//   if (role && user.role !== role) return <Navigate to="/" />;

//   return children;
// };

// export default ProtectedRoute;



// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   if (!token || !user) return <Navigate to="/" />;

//   const userRole = user.roles?.[0]?.name?.toLowerCase();

//   if (role && userRole !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;




// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";

const ProtectedRoute = ({ children, role }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

