
// src/components/Sidebar.jsx
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

// Safely load Font Awesome if missing
const loadFontAwesome = () => {
  if (document.querySelector('link[href*="font-awesome"]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  // 🔸 Fixed URL: removed trailing spaces
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
  link.integrity = "sha512-YbR6d2yf3q7X7JvQ5Jj6f3q7X7JvQ5Jj6f3q7X7JvQ5Jj6f3q7X7JvQ5Jj6f3q7X7JvQ5Jj6f3q7X7JvQ5Jj6f3q7X7J==";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
};

const getTheme = () => ({
  bgGradient: "linear-gradient(180deg, #04626a 0%, #134952 100%)",
  dividerColor: "rgba(255, 255, 255, 0.3)",
});

const getMenuByRole = (role) => {
  const items = {
    principal: [
      { name: "Dashboard", path: "/dashboard/principal", icon: "fa-chart-line" },
      { name: "Students", path: "/dashboard/principal/students", icon: "fa-users" },
      { name: "Fee Management", path: "/dashboard/principal/fees", icon: "fa-money-bill-wave" },
      { name: "Examinations", path: "/dashboard/principal/exams", icon: "fa-file-alt" },
      { name: "Academic", path: "/dashboard/principal/academic", icon: "fa-book-open" },
      { name: "Staff", path: "/dashboard/principal/staff", icon: "fa-chalkboard-teacher" },
      { name: "Departments", path: "/dashboard/principal/departments", icon: "fa-building" },
      { name: "Reports", path: "/dashboard/principal/reports", icon: "fa-chart-bar" },
      { name: "Profile", path: "/dashboard/principal/principal-profile", icon: "fa-user-cog" },
    ],
    teacher: [
      { name: "Dashboard", path: "/dashboard/teacher", icon: "fa-chart-line" },
      { name: "My Classes", path: "/dashboard/teacher/classes", icon: "fa-chalkboard" },
      { name: "Students", path: "/dashboard/teacher/students", icon: "fa-user-graduate" },
      { name: "Assignments", path: "/dashboard/teacher/assignments", icon: "fa-tasks" },
      { name: "Timetable", path: "/dashboard/teacher/timetable", icon: "fa-calendar-alt" },
      { name: "Profile", path: "/dashboard/teacher/profile", icon: "fa-user-circle" },
      { name: "My Profile", path: "/dashboard/profile", icon: "fa-user" },
    ],
    librarian: [
      { name: "Dashboard", path: "/dashboard/librarian", icon: "fa-chart-line" },
      { name: "Books", path: "/dashboard/librarian/books", icon: "fa-book" },
      { name: "Issue Books", path: "/dashboard/librarian/issue", icon: "fa-share-square" },
      { name: "Members", path: "/dashboard/librarian/members", icon: "fa-users" },
      { name: "Reports", path: "/dashboard/librarian/reports", icon: "fa-chart-bar" },
    ],
    accounts_staff: [
      { name: "Dashboard", path: "/dashboard/accounts_staff", icon: "fa-chart-line" },
      { name: "Fees", path: "/dashboard/accountant/fees", icon: "fa-receipt" },
      { name: "Expenses", path: "/dashboard/accountant/expenses", icon: "fa-file-invoice-dollar" },
      { name: "Salary", path: "/dashboard/accountant/salary", icon: "fa-wallet" },
      { name: "Reports", path: "/dashboard/accountant/reports", icon: "fa-chart-pie" },
      { name: "My Profile", path: "/dashboard/profile", icon: "fa-user" },
    ],
  };
  return items[role] || [];
};

const renderMenuItems = (menuItems, isMobile = false, onClose) => {
  return menuItems.map((item, i) => (
    <NavLink
      key={i}
      to={item.path}
      className={({ isActive }) =>
        `d-flex align-items-center text-decoration-none p-3 rounded-3 mb-2 transition-all
        ${isActive ? "text-light fw-bold" : "text-light"}`
      }
      style={({ isActive }) => ({
        fontSize: "0.95rem",
        background: isActive
          ? "rgba(255, 255, 255, 0.2)"
          : "transparent",
        backdropFilter: isActive ? "blur(8px)" : "none",
        WebkitBackdropFilter: isActive ? "blur(8px)" : "none",
        transition: "all 0.25s ease",
      })}
      onClick={isMobile ? onClose : undefined}
    >
      <i className={`${item.icon} fa-fw me-3 fs-5`}></i>
      <span>{item.name}</span>
    </NavLink>
  ));
};

const Sidebar = ({ show, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;
  const theme = getTheme();
  const menuItems = getMenuByRole(role);

  useEffect(() => {
    loadFontAwesome();
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-flex flex-column p-4"
        style={{
          width: 260,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1000,
          background: theme.bgGradient,
          boxShadow: "4px 0 12px rgba(0,0,0,0.2)",
        }}
      >
        <div className="mb-4 text-center">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <i className="fas fa-graduation-cap fa-2x text-light"></i>
          </div>
          <h5 className="text-light fs-3 fw-bold mb-1">School ERP</h5>
          <p className="text-light small mb-0 text-capitalize">
            {role || "User"} Portal
          </p>
        </div>

        <hr className="my-3 opacity-50" style={{ borderColor: theme.dividerColor }} />

        <div className="flex-grow-1">
          {renderMenuItems(menuItems)}
        </div>

        <div className="pt-3">
          <hr className="my-3 opacity-50" style={{ borderColor: theme.dividerColor }} />
          <LogoutButton />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {show && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={onClose}
          ></div>
          <div
            className="position-fixed top-0 start-0 p-4"
            style={{
              width: 260, // 🔸 Match desktop width
              height: "100vh",
              zIndex: 1050,
              background: theme.bgGradient,
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            }}
          >
            <button
              className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center mb-4 px-3 py-2"
              onClick={onClose}
            >
              <i className="fas fa-times me-2"></i> Close
            </button>

            {renderMenuItems(menuItems, true, onClose)}

            <div className="position-absolute bottom-0 w-100 p-3">
              <LogoutButton />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;