// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ show, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const menuByRole = {
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher" },
//       { name: "My Classes", path: "/dashboard/teacher/classes" },
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
//    accountant: [
//       { name: "Dashboard", path: "/dashboard/accountant" },
//       { name: "Fee Collection", path: "/dashboard/accountant/fees" },
//       { name: "Expenses", path: "/dashboard/accountant/expenses" },
//       { name: "Salary", path: "/dashboard/accountant/salary" },
//       { name: "Invoices", path: "/dashboard/accountant/invoices" },
//       { name: "Receipts", path: "/dashboard/accountant/receipts" },
//       { name: "Due Reminders", path: "/dashboard/accountant/reminders" },
//       { name: "Reports", path: "/dashboard/accountant/reports" },
//       { name: "My Profile", path: "/dashboard/accountant/profile" },
//     ],
//     office: [
//       { name: "Dashboard", path: "/dashboard/office" },
//       { name: "All Students", path: "/dashboard/office/students" },
//       { name: "Admissions", path: "/dashboard/office/admissions" },
//       { name: "Certificate Requests", path: "/dashboard/office/certificates" },
//       { name: "Enquiries", path: "/dashboard/office/enquiries" },
//       { name: "SMS / Email Log", path: "/dashboard/office/communications" },
//       { name: "Reports", path: "/dashboard/office/reports" },
//       { name: "Notices", path: "/dashboard/office/notices" },
//       { name: "My Profile", path: "/dashboard/office/profile" },
//     ],
//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal" },
//       { name: "Reports", path: "/principal/reports" },
//       { name: "Staff", path: "/principal/staff" },
//     ],
//     student: [
//       {name: "Dashboard", path: "/dashboard/student"},
//       {name: "Student Documents", path: "/dashboard/student/student-documents"},
//       {name: "Student Form", path: "/dashboard/student/student-form"},
//       {name: "Student Guardians", path: "/dashboard/student/student-guardians"},
//       {name: "Student List", path: "/dashboard/student/student-list"},
//       {name: "Student Profile", path: "/dashboard/student/student-profile"},
//       {name: "Fees", path: "/dashboard/student/student-fees"},
//       {name: "Timetable", path: "/dashboard/student/student-timetable"},
//       {name: "Syllabus", path: "/dashboard/student/student-syllabus"},
//       {name: "Leave", path: "/dashboard/student/student-leave"},
//       {name: "Attendance", path: "/dashboard/student/student-attendance"},
//       {name: "Library", path: "/dashboard/student/student-library"},
//     ]
//   };

//   const menuItems = menuByRole[role] || [];

//   const SidebarContent = (
//     <>
//       <h5 className="mb-4">ERP Panel</h5>
//       {menuItems.map((item, i) => (
//         <NavLink
//           key={i}
//           to={item.path}
//           className={({ isActive }) =>
//             `d-block text-white mb-3 text-decoration-none ${
//               isActive ? "fw-bold" : ""
//             }`
//           }
//           onClick={onClose}
//         >
//           {item.name}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar - hidden on mobile */}
//       <div
//         className="d-none d-md-flex flex-column bg-danger text-white p-3"
//         style={{
//           width: "250px",
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

//       {/* Mobile Sidebar - overlay */}
//       {show && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50"
//             style={{ zIndex: 1040 }}
//             onClick={onClose}
//           ></div>

//           {/* Sidebar */}
//           <div
//             className="position-fixed top-0 start-0 bg-danger text-white p-3 d-flex flex-column"
//             style={{
//               width: "250px",
//               height: "100vh",
//               zIndex: 1050,
//             }}
//           >
//             <button
//               className="btn btn-light btn-sm align-self-end mb-3"
//               onClick={onClose}
//             >
//             ✕
//             </button>
//             {SidebarContent}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// // src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaChalkboardTeacher,
//   FaUsers,
//   FaTasks,
//   FaBook,
//   FaChartBar,
//   FaCalendarAlt,
//   FaBell,
//   FaUser,
//   FaBookReader,
//   FaMoneyBillWave,
//   FaFileInvoice,
//   FaEnvelope,
//   FaGraduationCap,
//   FaUserFriends,
//   FaFileAlt,
//   FaUserCircle,
//   FaDoorOpen,
//   FaHome,
//   FaClipboardList,
//   FaIdCard,
//   FaFilePdf,
//   FaCalendarCheck,
//   FaBookOpen,
//   FaSignOutAlt,
//   FaThList,
//   FaRegCalendarCheck,
//   FaRegFileAlt,
//   FaRegUser,
//   FaRegFolderOpen,
//   FaRegClock,
//   FaRegMoneyBillAlt,
//   FaRegCalendar,
//   FaRegClipboard,
//   FaRegAddressCard,
// } from "react-icons/fa";
// import LogoutButton from "./LogoutButton";

// const Sidebar = ({ show, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   // Icon map by route keyword or exact match
//   const getIcon = (path, name) => {
//     if (path.includes("dashboard")) return <FaTachometerAlt />;
//     if (path.includes("classes") || path.includes("timetable")) return <FaCalendarAlt />;
//     if (path.includes("students") || path.includes("student-list")) return <FaGraduationCap />;
//     if (path.includes("assignments") || path.includes("homework")) return <FaTasks />;
//     if (path.includes("study-materials") || path.includes("syllabus")) return <FaBookOpen />;
//     if (path.includes("exams") || path.includes("marks")) return <FaChartBar />;
//     if (path.includes("notices")) return <FaBell />;
//     if (path.includes("profile")) return <FaUserCircle />;
//     if (path.includes("documents")) return <FaFilePdf />;
//     if (path.includes("form")) return <FaIdCard />;
//     if (path.includes("guardians")) return <FaUserFriends />;
//     if (path.includes("fees")) return <FaMoneyBillWave />;
//     if (path.includes("leave")) return <FaDoorOpen />;
//     if (path.includes("attendance")) return <FaCalendarCheck />;
//     if (path.includes("library") || path.includes("books")) return <FaBookReader />;
//     if (path.includes("reports")) return <FaChartBar />;
//     if (path.includes("office")) return <FaHome />;
//     if (path.includes("admissions")) return <FaFileAlt />;
//     if (path.includes("communications")) return <FaEnvelope />;
//     if (path.includes("staff")) return <FaChalkboardTeacher />;
//     if (path.includes("principal")) return <FaUser />;

//     // Fallbacks based on name
//     if (name === "Dashboard") return <FaTachometerAlt />;
//     if (name === "My Classes") return <FaCalendarAlt />;
//     if (name === "Students") return <FaUsers />;
//     if (name === "Assignments") return <FaTasks />;
//     if (name === "Study Materials") return <FaBookOpen />;
//     if (name === "Exams & Marks") return <FaChartBar />;
//     if (name === "Timetable") return <FaCalendarAlt />;
//     if (name === "Notices") return <FaBell />;
//     if (name === "My Profile") return <FaUserCircle />;
//     if (name === "Books") return <FaBookReader />;
//     if (name === "Issue Books") return <FaRegFolderOpen />;
//     if (name === "Members") return <FaUsers />;
//     if (name === "Fee Collection") return <FaMoneyBillWave />;
//     if (name === "Expenses") return <FaRegMoneyBillAlt />;
//     if (name === "Salary") return <FaRegClipboard />;
//     if (name === "Invoices") return <FaFileInvoice />;
//     if (name === "Receipts") return <FaRegFileAlt />;
//     if (name === "Due Reminders") return <FaRegClock />;
//     if (name === "All Students") return <FaGraduationCap />;
//     if (name === "Admissions") return <FaFileAlt />;
//     if (name === "Certificate Requests") return <FaRegAddressCard />;
//     if (name === "Enquiries") return <FaThList />;
//     if (name === "SMS / Email Log") return <FaEnvelope />;
//     if (name === "Staff") return <FaChalkboardTeacher />;
//     if (name === "Student Documents") return <FaFilePdf />;
//     if (name === "Student Form") return <FaIdCard />;
//     if (name === "Student Guardians") return <FaUserFriends />;
//     if (name === "Student Profile") return <FaUserCircle />;
//     if (name === "Fees") return <FaMoneyBillWave />;
//     if (name === "Syllabus") return <FaBookOpen />;
//     if (name === "Leave") return <FaDoorOpen />;
//     if (name === "Attendance") return <FaCalendarCheck />;
//     if (name === "Library") return <FaBookReader />;

//     return <FaTachometerAlt />;
//   };

//   const menuByRole = {
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher" },
//       { name: "Teacher Profile Card", path: "/dashboard/teacher/teacher-profile-card" },
//       { name: "Student List", path: "/dashboard/teacher/student-list" },
//       { name: "Teacher Stats", path: "/dashboard/teacher/teacher-stats" },
//       { name: "Timetable Section", path: "/dashboard/teacher/timetable-section" },
//       { name: "Courses Progress", path: "/dashboard/teacher/courses-progress" },
//       { name: "Attendance Summary", path: "/dashboard/teacher/attendance-summary" },
//       { name: "Assignment Module", path: "/dashboard/teacher/assignment-summary" },
//       { name: "Performance Analytics", path: "/dashboard/teacher/performance-analysis" },
//       { name: "Announcements", path: "/dashboard/teacher/annoucement" },
//     ],
//     librarian: [
//       { name: "Dashboard", path: "/dashboard/librarian" },
//       { name: "Books", path: "/dashboard/librarian/books" },
//       { name: "Issue Books", path: "/dashboard/librarian/issue" },
//       { name: "Members", path: "/dashboard/librarian/members" },
//       { name: "Reports", path: "/dashboard/librarian/reports" },
//     ],
//     accountant: [
//       { name: "Dashboard", path: "/dashboard/accountant" },
//       { name: "Fee Collection", path: "/dashboard/accountant/fees" },
//       { name: "Expenses", path: "/dashboard/accountant/expenses" },
//       { name: "Salary", path: "/dashboard/accountant/salary" },
//       { name: "Invoices", path: "/dashboard/accountant/invoices" },
//       { name: "Receipts", path: "/dashboard/accountant/receipts" },
//       { name: "Due Reminders", path: "/dashboard/accountant/reminders" },
//       { name: "Reports", path: "/dashboard/accountant/reports" },
//       { name: "My Profile", path: "/dashboard/accountant/profile" },
//     ],
//     office: [
//       { name: "Dashboard", path: "/dashboard/office" },
//       { name: "All Students", path: "/dashboard/office/students" },
//       { name: "Admissions", path: "/dashboard/office/admissions" },
//       { name: "Certificate Requests", path: "/dashboard/office/certificates" },
//       { name: "Enquiries", path: "/dashboard/office/enquiries" },
//       { name: "SMS / Email Log", path: "/dashboard/office/communications" },
//       { name: "Reports", path: "/dashboard/office/reports" },
//       { name: "Notices", path: "/dashboard/office/notices" },
//       { name: "My Profile", path: "/dashboard/office/profile" },
//     ],
//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal" },
//       { name: "Reports", path: "/dashboard/principal/reports" },
//       { name: "Staff", path: "/dashboard/principal/staff" },
//     ],
//     student: [
//       { name: "Dashboard", path: "/dashboard/student" },
//       { name: "Student Documents", path: "/dashboard/student/student-documents" },
//       { name: "Student Form", path: "/dashboard/student/student-form" },
//       { name: "Student Guardians", path: "/dashboard/student/student-guardians" },
//       { name: "Student List", path: "/dashboard/student/student-list" },
//       { name: "Student Profile", path: "/dashboard/student/student-profile" },
//       { name: "Fees", path: "/dashboard/student/student-fees" },
//       { name: "Timetable", path: "/dashboard/student/student-timetable" },
//       { name: "Syllabus", path: "/dashboard/student/student-syllabus" },
//       { name: "Leave", path: "/dashboard/student/student-leave" },
//       { name: "Attendance", path: "/dashboard/student/student-attendance" },
//       { name: "Library", path: "/dashboard/student/student-library" },
//     ],
//   };

//   const menuItems = menuByRole[role] || [];

//   const SidebarContent = (
//     <>
//       <h5 className="mb-4 fw-bold">🏫 ERP Panel</h5>
//       <nav className="d-flex flex-column">
//         {menuItems.map((item, i) => (
//           <NavLink
//             key={i}
//             to={item.path}
//             className={({ isActive }) =>
//               `d-flex align-items-center text-white mb-2 py-2 px-3 rounded text-decoration-none ${
//                 isActive
//                   ? "bg-danger text-white fw-bold"
//                   : "text-danger opacity-90 hover-bg"
//               }`
//             }
//             onClick={onClose}
//           >
//             <span className="me-3 fs-5">{getIcon(item.path, item.name)}</span>
//             <span>{item.name}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar - hidden on mobile */}
//       <div
//         className="d-none d-md-flex flex-column flex-shrink-0 bg-danger text-white p-3"
//         style={{
//           width: "250px",
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           overflowY: "auto",
//           zIndex: 1000,
//           transition: "all 0.3s ease",
//         }}
//       >
//         {/* Hide scrollbar but keep functionality */}
//         <style jsx>{`
//           .sidebar::-webkit-scrollbar {
//             display: none;
//           }
//           .sidebar {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//         `}</style>
//         <div className="sidebar">
//           {SidebarContent}
//         </div>
//         <div>
//             <LogoutButton/>
//           </div>
//       </div>

//       {/* Mobile Sidebar - overlay */}
//       {show && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50"
//             style={{ zIndex: 1040 }}
//             onClick={onClose}
//           ></div>

//           {/* Sidebar */}
//           <div
//             className="position-fixed top-0 start-0 bg-danger text-white p-3 d-flex flex-column"
//             style={{
//               width: "250px",
//               height: "100vh",
//               zIndex: 1050,
//               transition: "transform 0.3s ease",
//             }}
//           >
//             <button
//               className="btn btn-light btn-sm align-self-end mb-3 rounded-circle"
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               ✕
//             </button>
//             {SidebarContent}
//           </div>
//           <div>
//             <LogoutButton/>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// // src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import LogoutButton from "./LogoutButton";
// import {
//   FaTachometerAlt,
//   FaChalkboardTeacher,
//   FaUsers,
//   FaTasks,
//   FaBookOpen,
//   FaChartBar,
//   FaCalendarAlt,
//   FaBell,
//   FaUserCircle,
//   FaBookReader,
//   FaMoneyBillWave,
//   FaFileAlt,
// } from "react-icons/fa";

// const Sidebar = ({ show, onClose }) => {
//   // ✅ SUPPORT BOTH OLD + NEW AUTH STORAGE
//   const user =
//     JSON.parse(localStorage.getItem("authUser")) ||
//     JSON.parse(localStorage.getItem("user"));

//   // ✅ NORMALIZE ROLE
//   const role = user?.role?.toLowerCase();

//   const menuByRole = {
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher", icon: <FaTachometerAlt /> },
//       { name: "My Classes", path: "/dashboard/teacher/classes", icon: <FaCalendarAlt /> },
//       { name: "Students", path: "/dashboard/teacher/students", icon: <FaUsers /> },
//       { name: "Assignments", path: "/dashboard/teacher/assignments", icon: <FaTasks /> },
//       { name: "Study Materials", path: "/dashboard/teacher/study-materials", icon: <FaBookOpen /> },
//       { name: "Exams & Marks", path: "/dashboard/teacher/exams", icon: <FaChartBar /> },
//       { name: "Timetable", path: "/dashboard/teacher/timetable", icon: <FaCalendarAlt /> },
//       { name: "Notices", path: "/dashboard/teacher/notices", icon: <FaBell /> },
//       { name: "My Profile", path: "/dashboard/teacher/profile", icon: <FaUserCircle /> },
//     ],

//     librarian: [
//       { name: "Dashboard", path: "/dashboard/librarian", icon: <FaTachometerAlt /> },
//       { name: "Books", path: "/dashboard/librarian/books", icon: <FaBookReader /> },
//       { name: "Issue Books", path: "/dashboard/librarian/issue", icon: <FaBookOpen /> },
//       { name: "Members", path: "/dashboard/librarian/members", icon: <FaUsers /> },
//       { name: "Reports", path: "/dashboard/librarian/reports", icon: <FaChartBar /> },
//     ],

//     accountant: [
//       { name: "Dashboard", path: "/dashboard/accountant", icon: <FaTachometerAlt /> },
//       { name: "Fee Collection", path: "/dashboard/accountant/fees", icon: <FaMoneyBillWave /> },
//       { name: "Expenses", path: "/dashboard/accountant/expenses", icon: <FaFileAlt /> },
//       { name: "Salary", path: "/dashboard/accountant/salary", icon: <FaMoneyBillWave /> },
//       { name: "Reports", path: "/dashboard/accountant/reports", icon: <FaChartBar /> },
//     ],

//     office: [
//       { name: "Dashboard", path: "/dashboard/office", icon: <FaTachometerAlt /> },
//       { name: "Students", path: "/dashboard/office/students", icon: <FaUsers /> },
//       { name: "Admissions", path: "/dashboard/office/admissions", icon: <FaFileAlt /> },
//       { name: "Reports", path: "/dashboard/office/reports", icon: <FaChartBar /> },
//     ],

//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal", icon: <FaTachometerAlt /> },
//       { name: "Reports", path: "/dashboard/principal/reports", icon: <FaChartBar /> },
//       { name: "Staff", path: "/dashboard/principal/staff", icon: <FaChalkboardTeacher /> },
//     ],
//   };

//   const menuItems = menuByRole[role] || [];

//   return (
//     <>
//       {/* DESKTOP */}
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
//         <h5 className="mb-4 fw-bold">🏫 ERP Panel</h5>

//         {menuItems.map((item, i) => (
//           <NavLink
//             key={i}
//             to={item.path}
//             className={({ isActive }) =>
//               `d-flex align-items-center mb-2 px-3 py-2 rounded text-decoration-none ${
//                 isActive ? "bg-dark text-white" : "text-white"
//               }`
//             }
//           >
//             <span className="me-3">{item.icon}</span>
//             {item.name}
//           </NavLink>
//         ))}

//         <div className="mt-auto">
//           <LogoutButton />
//         </div>
//       </div>

//       {/* MOBILE */}
//       {show && (
//         <>
//           <div
//             className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
//             style={{ zIndex: 1040 }}
//             onClick={onClose}
//           />

//           <div
//             className="position-fixed top-0 start-0 bg-danger text-white p-3"
//             style={{ width: 250, height: "100vh", zIndex: 1050 }}
//           >
//             <button className="btn btn-light btn-sm mb-3" onClick={onClose}>
//               ✕
//             </button>

//             {menuItems.map((item, i) => (
//               <NavLink
//                 key={i}
//                 to={item.path}
//                 onClick={onClose}
//                 className="d-flex align-items-center text-white mb-2 text-decoration-none"
//               >
//                 <span className="me-3">{item.icon}</span>
//                 {item.name}
//               </NavLink>
//             ))}

//             <LogoutButton />
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ show, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // ✅ NOW EXISTS

  const menuByRole = {
    principal: [
      { name: "Dashboard", path: "/dashboard/principal" },
      { name: "Reports", path: "/dashboard/principal/reports" },
      { name: "Staff", path: "/dashboard/principal/staff" },
      { name: "My Profile", path: "/dashboard/profile" }
    ],
    teacher: [
      { name: "Dashboard", path: "/dashboard/teacher" },
      { name: "My Classes", path: "/dashboard/teacher/classes" },
      { name: "Students", path: "/dashboard/teacher/students" },
      { name: "Assignments", path: "/dashboard/teacher/assignments" },
      { name: "Timetable", path: "/dashboard/teacher/timetable" },
      { name: "Profile", path: "/dashboard/teacher/profile" },
      { name: "My Profile", path: "/dashboard/profile" }
    ],
    librarian: [
      { name: "Dashboard", path: "/dashboard/librarian" },
      { name: "Books", path: "/dashboard/librarian/books" },
      { name: "Issue Books", path: "/dashboard/librarian/issue" },
      { name: "Members", path: "/dashboard/librarian/members" },
      { name: "Reports", path: "/dashboard/librarian/reports" },
    ],
    accountant: [
      { name: "Dashboard", path: "/dashboard/accounts_staff" },
      { name: "Fees", path: "/dashboard/accountant/fees" },
      { name: "Expenses", path: "/dashboard/accountant/expenses" },
      { name: "Salary", path: "/dashboard/accountant/salary" },
      { name: "Reports", path: "/dashboard/accountant/reports" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-flex flex-column bg-danger text-white p-3"
        style={{
          width: 250,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        <h5 className="mb-4">🏫 ERP Panel</h5>

        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className="text-white mb-3 text-decoration-none"
          >
            {item.name}
          </NavLink>
        ))}

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {show && (
        <div
          className="position-fixed top-0 start-0 bg-danger text-white p-3"
          style={{ width: 250, height: "100vh", zIndex: 1050 }}
        >
          <button className="btn btn-light btn-sm mb-3" onClick={onClose}>
            Close
          </button>

          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className="text-white d-block mb-3"
              onClick={onClose}
            >
              {item.name}
            </NavLink>
          ))}
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default Sidebar;
