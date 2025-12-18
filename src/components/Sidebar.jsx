// // src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ show, onClose }) => {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div
//         className="d-none d-md-block bg-danger text-white p-3"
//         style={{ width: "250px", minHeight: "100vh" }}
//       >
//         <h5 className="mb-4">ERP Panel</h5>

//         <NavLink to="/department" className="text-white d-block mb-3">
//           Department
//         </NavLink>

//         <NavLink to="/dashboard" className="text-white d-block">
//           Dashboard
//         </NavLink>
//       </div>

//       {/* Mobile Sidebar */}
//       {show && (
//         <div
//           className="position-fixed top-0 start-0 bg-danger text-white p-3"
//           style={{
//             width: "250px",
//             height: "100vh",
//             zIndex: 1050,
//           }}
//         >
//           <button
//             className="btn btn-light btn-sm mb-4"
//             onClick={onClose}
//           >
//             Close
//           </button>

//           <NavLink
//             to="/department"
//             className="text-white d-block mb-3"
//             onClick={onClose}
//           >
//             Department
//           </NavLink>

//           <NavLink
//             to="/dashboard"
//             className="text-white d-block"
//             onClick={onClose}
//           >
//             Dashboard
//           </NavLink>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ show, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const menuByRole = {
//     librarian: [
//       { name: "Dashboard", path: "/dashboard/librarian" },
//       { name: "Books", path: "/library/books" },
//       { name: "Issue Books", path: "/library/issue" },
//       { name: "Members", path: "/library/members" },
//       { name: "Reports", path: "/library/reports" },
//     ],
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher" },
//       { name: "My Classes", path: "/teacher/classes" },
//       { name: "Students", path: "/teacher/students" },
//       { name: "Assignments", path: "/teacher/assignments" },
//       { name: "Study Materials", path: "/teacher/study-materials" },
//       { name: "Exams & Marks", path: "/teacher/exams-marks" },
//       { name: "Timetable", path: "/teacher/timetable" },
//       { name: "Notices", path: "/teacher/notices" },
//       { name: "My Profile", path: "/teacher/profile" },
//     ],
//     accountant: [
//       { name: "Dashboard", path: "/dashboard/accountant" },
//       { name: "Fee Collection", path: "#" },
//       { name: "Pending Payments", path: "#" },
//       { name: "Expenses", path: "#" },
//       { name: "Salary Management", path: "#" },
//       { name: "Reports", path: "#" },
//     ],
//     office: [
//       { name: "Dashboard", path: "/dashboard/office" },
//       { name: "Students", path: "/office/students" },
//       { name: "Admissions", path: "/office/admissions" },
//     ],
//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal" },
//       { name: "Reports", path: "/principal/reports" },
//       { name: "Staff", path: "/principal/staff" },
//     ],
//   };

//   const menuItems = menuByRole[role] || [];

//   const SidebarContent = (
//     <>
//       <h5 className="mb-4">ERP Panel</h5>

//       {menuItems.map((item, i) => (
//         <NavLink
//           key={i}
//           to={item.path}
//           className="d-block text-white mb-3 text-decoration-none"
//           onClick={onClose}
//         >
//           {item.name}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <>
//       {/* Desktop */}
//       <div
//         className="d-none d-md-block bg-danger text-white p-3"
//         style={{ width: 250, minHeight: "100vh" }}
//       >
//         {SidebarContent}
//       </div>

//       {/* Mobile */}
//       {show && (
//         <div
//           className="position-fixed top-0 start-0 bg-danger text-white p-3"
//           style={{ width: 250, height: "100vh", zIndex: 1050 }}
//         >
//           <button className="btn btn-light btn-sm mb-3" onClick={onClose}>
//             Close
//           </button>
//           {SidebarContent}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;








// // src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ show, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const menuByRole = {
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher" },
//       { name: "My Classes", path: "/teacher/classes" },
//       { name: "Students", path: "/teacher/students" },
//       { name: "Assignments", path: "/teacher/assignments" },
//       { name: "Study Materials", path: "/teacher/study-materials" },
//       { name: "Exams & Marks", path: "/teacher/exams-marks" },
//       { name: "Timetable", path: "/teacher/timetable" },
//       { name: "Notices", path: "/teacher/notices" },
//       { name: "My Profile", path: "/teacher/profile" },
//     ],
//     librarian: [
//       { name: "Dashboard", path: "/dashboard/librarian" },
//       { name: "Books", path: "/library/books" },
//       { name: "Issue Books", path: "/library/issue" },
//       { name: "Members", path: "/library/members" },
//       { name: "Reports", path: "/library/reports" },
//     ],
//     accountant: [
//       { name: "Dashboard", path: "/dashboard/accountant" },
//       { name: "Fee Collection", path: "#" },
//       { name: "Expenses", path: "#" },
//       { name: "Salary", path: "#" },
//       { name: "Reports", path: "#" },
//     ],
//     office: [
//       { name: "Dashboard", path: "/dashboard/office" },
//       { name: "Students", path: "/office/students" },
//       { name: "Admissions", path: "/office/admissions" },
//     ],
//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal" },
//       { name: "Reports", path: "/principal/reports" },
//       { name: "Staff", path: "/principal/staff" },
//     ],
//   };

//   const menuItems = menuByRole[role] || [];

//   const SidebarContent = (
//     <>
//       <h5 className="mb-4">ERP Panel</h5>

//       {menuItems.map((item, i) => (
//         <NavLink
//           key={i}
//           to={item.path}
//           className="d-block text-white mb-3 text-decoration-none"
//           onClick={onClose}
//         >
//           {item.name}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div
//         className="d-none d-md-flex flex-column bg-danger text-white p-3"
//         style={{
//           width: 250,
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           overflowY: "auto",
//           zIndex: 1000,
//         }}
//       >
//         {SidebarContent}
//       </div>

//       {/* Mobile Sidebar */}
//       {show && (
//         <div
//           className="position-fixed top-0 start-0 bg-danger text-white p-3"
//           style={{
//             width: 250,
//             height: "100vh",
//             zIndex: 1050,
//           }}
//         >
//           <button
//             className="btn btn-light btn-sm mb-3"
//             onClick={onClose}
//           >
//             Close
//           </button>
//           {SidebarContent}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ show, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const menuByRole = {
    teacher: [
      { name: "Dashboard", path: "/dashboard/teacher" },
      { name: "My Classes", path: "/teacher/classes" },
      { name: "Students", path: "/teacher/students" },
      { name: "Assignments", path: "/teacher/assignments" },
      { name: "Study Materials", path: "/teacher/study-materials" },
      { name: "Exams & Marks", path: "/teacher/exams-marks" },
      { name: "Timetable", path: "/teacher/timetable" },
      { name: "Notices", path: "/teacher/notices" },
      { name: "My Profile", path: "/teacher/profile" },
    ],
    librarian: [
      { name: "Dashboard", path: "/dashboard/librarian" },
      { name: "Books", path: "/library/books" },
      { name: "Issue Books", path: "/library/issue" },
      { name: "Members", path: "/library/members" },
      { name: "Reports", path: "/library/reports" },
    ],
    accountant: [
      { name: "Dashboard", path: "/dashboard/accountant" },
      { name: "Fee Collection", path: "#" },
      { name: "Expenses", path: "#" },
      { name: "Salary", path: "#" },
      { name: "Reports", path: "#" },
    ],
    office: [
      { name: "Dashboard", path: "/dashboard/office" },
      { name: "Students", path: "/office/students" },
      { name: "Admissions", path: "/office/admissions" },
    ],
    principal: [
      { name: "Dashboard", path: "/dashboard/principal" },
      { name: "Reports", path: "/principal/reports" },
      { name: "Staff", path: "/principal/staff" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  const SidebarContent = (
    <>
      <h5 className="mb-4">ERP Panel</h5>
      {menuItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          className={({ isActive }) =>
            `d-block text-white mb-3 text-decoration-none ${
              isActive ? "fw-bold" : ""
            }`
          }
          onClick={onClose}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div
        className="d-none d-md-flex flex-column bg-danger text-white p-3"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        {SidebarContent}
      </div>

      {/* Mobile Sidebar - overlay */}
      {show && (
        <>
          {/* Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50"
            style={{ zIndex: 1040 }}
            onClick={onClose}
          ></div>

          {/* Sidebar */}
          <div
            className="position-fixed top-0 start-0 bg-danger text-white p-3 d-flex flex-column"
            style={{
              width: "250px",
              height: "100vh",
              zIndex: 1050,
            }}
          >
            <button
              className="btn btn-light btn-sm align-self-end mb-3"
              onClick={onClose}
            >
              ✕
            </button>
            {SidebarContent}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;