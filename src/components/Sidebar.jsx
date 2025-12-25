
// // src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Sidebar = ({ show, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   // Define menu items with icons (Bootstrap Icons)
//   const menuByRole = {
//     principal: [
//       { name: "Dashboard", path: "/dashboard/principal", icon: "speedometer2" },
//       { name: "Students", path: "/dashboard/principal/students", icon: "people-fill" },
//       { name: "Fee Management", path: "/dashboard/principal/fees", icon: "cash-stack" },
//       { name: "Examinations", path: "/dashboard/principal/exams", icon: "file-text" },
//       { name: "Academic", path: "/dashboard/principal/academic", icon: "book" },
//       { name: "Staff", path: "/dashboard/principal/staff", icon: "person-badge" },
//       { name: "Reports", path: "/dashboard/principal/reports", icon: "graph-up" },
//       // { name: "Settings", path: "/dashboard/principal/settings", icon: "gear" },
//     ],
//     teacher: [
//       { name: "Dashboard", path: "/dashboard/teacher", icon: "speedometer2" },
//       { name: "My Classes", path: "/dashboard/teacher/classes", icon: "book" },
//       { name: "Students", path: "/dashboard/teacher/students", icon: "people-fill" },
//       { name: "Assignments", path: "/dashboard/teacher/assignments", icon: "clipboard-check" },
//       { name: "Timetable", path: "/dashboard/teacher/timetable", icon: "calendar-week" },
//       { name: "Profile", path: "/dashboard/teacher/profile", icon: "person-circle" },
//       { name: "My Profile", path: "/dashboard/profile", icon: "person" },
//     ],
//     librarian: [
//       { name: "Dashboard", path: "/dashboard/librarian", icon: "speedometer2" },
//       { name: "Books", path: "/dashboard/librarian/books", icon: "book" },
//       { name: "Issue Books", path: "/dashboard/librarian/issue", icon: "arrow-right-square" },
//       { name: "Members", path: "/dashboard/librarian/members", icon: "people" },
//       { name: "Reports", path: "/dashboard/librarian/reports", icon: "graph-up" },
//     ],
//     accounts_staff: [
//       { name: "Dashboard", path: "/dashboard/accounts_staff", icon: "speedometer2" },
//       { name: "Fees", path: "/dashboard/accountant/fees", icon: "cash-stack" },
//       { name: "Expenses", path: "/dashboard/accountant/expenses", icon: "receipt" },
//       { name: "Salary", path: "/dashboard/accountant/salary", icon: "currency-dollar" },
//       { name: "Reports", path: "/dashboard/accountant/reports", icon: "graph-up" },
//       { name: "My Profile", path: "/dashboard/profile", icon: "person" },
//     ],
//   };

//   const menuItems = menuByRole[role] || [];

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div
//         className="d-none d-md-flex flex-column bg-gradient-to-b from-indigo-700 to-purple-800 text-white p-3"
//         style={{
//           width: 250,
//           height: "100vh",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           overflowY: "auto",
//           zIndex: 1000,
//           background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)",
//         }}
//       >
//         <div className="mb-4">
//           <h5 className="d-flex align-items-center">
//             <i className="bi bi-mortarboard me-2"></i>
//             School ERP
//           </h5>
//           <p className="small ms-2">Principal Portal</p>
//         </div>

//         <hr className="my-3 border-white opacity-50" />

//         {menuItems.map((item, i) => (
//           <NavLink
//             key={i}
//             to={item.path}
//             className={({ isActive }) =>
//               `d-flex align-items-center text-black mb-3 text-decoration-none p-2 rounded ${
//                 isActive ? "bg-white bg-opacity-20" : ""
//               }`
//             }
//           >
//             <i className={`bi bi-${item.icon} me-2`}></i>
//             {item.name}
//           </NavLink>
//         ))}

//         <div className="mt-auto pt-4">
//           <hr className="my-3 border-white opacity-50" />
//           <LogoutButton />
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {show && (
//         <div
//           className="position-fixed top-0 start-0 bg-gradient-to-b from-indigo-700 to-purple-800 text-white p-3"
//           style={{ width: 250, height: "100vh", zIndex: 1050, background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)" }}
//         >
//           <button
//             className="btn btn-light btn-sm mb-3"
//             onClick={onClose}
//           >
//             <i className="bi bi-x me-1"></i> Close
//           </button>

//           {menuItems.map((item, i) => (
//             <NavLink
//               key={i}
//               to={item.path}
//               className={({ isActive }) =>
//                 `d-flex align-items-center text-dark d-block mb-3 p-2 rounded ${
//                   isActive ? "bg-white bg-opacity-20" : ""
//                 }`
//               }
//               onClick={onClose}
//             >
//               <i className={`bi bi-${item.icon} me-2`}></i>
//               {item.name}
//             </NavLink>
//           ))}
//           <LogoutButton />
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



/// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ show, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Define menu items with icons (Bootstrap Icons)
  const menuByRole = {
    principal: [
      { name: "Dashboard", path: "/dashboard/principal", icon: "speedometer2" },
      { name: "Students", path: "/dashboard/principal/students", icon: "people-fill" },
      { name: "Fee Management", path: "/dashboard/principal/fees", icon: "cash-stack" },
      { name: "Examinations", path: "/dashboard/principal/exams", icon: "file-text" },
      { name: "Academic", path: "/dashboard/principal/academic", icon: "book" },
      { name: "Staff", path: "/dashboard/principal/staff", icon: "person-badge" },
      { name: "Reports", path: "/dashboard/principal/reports", icon: "graph-up" },
      { name: "profile", path: "/dashboard/principal/principal-profile", icon: "gear" },
    ],
    teacher: [
      { name: "Dashboard", path: "/dashboard/teacher", icon: "speedometer2" },
      { name: "My Classes", path: "/dashboard/teacher/classes", icon: "book" },
      { name: "Students", path: "/dashboard/teacher/students", icon: "people-fill" },
      { name: "Assignments", path: "/dashboard/teacher/assignments", icon: "clipboard-check" },
      { name: "Timetable", path: "/dashboard/teacher/timetable", icon: "calendar-week" },
      { name: "Profile", path: "/dashboard/teacher/profile", icon: "person-circle" },
      { name: "My Profile", path: "/dashboard/profile", icon: "person" },
    ],
    librarian: [
      { name: "Dashboard", path: "/dashboard/librarian", icon: "speedometer2" },
      { name: "Books", path: "/dashboard/librarian/books", icon: "book" },
      { name: "Issue Books", path: "/dashboard/librarian/issue", icon: "arrow-right-square" },
      { name: "Members", path: "/dashboard/librarian/members", icon: "people" },
      { name: "Reports", path: "/dashboard/librarian/reports", icon: "graph-up" },
    ],
    accounts_staff: [
      { name: "Dashboard", path: "/dashboard/accounts_staff", icon: "speedometer2" },
      { name: "Fees", path: "/dashboard/accountant/fees", icon: "cash-stack" },
      { name: "Expenses", path: "/dashboard/accountant/expenses", icon: "receipt" },
      { name: "Salary", path: "/dashboard/accountant/salary", icon: "currency-dollar" },
      { name: "Reports", path: "/dashboard/accountant/reports", icon: "graph-up" },
      { name: "My Profile", path: "/dashboard/profile", icon: "person" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-flex flex-column bg-gradient-to-b from-indigo-700 to-purple-800 text-black p-3"
        style={{
          width: 250,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1000,
          background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)",
        }}
      >
        <div className="mb-4">
          <h5 className="d-flex align-items-center">
            <i className="bi bi-mortarboard me-2"></i>
            School ERP
          </h5>
          <p className="small mb-0">Principal Portal</p>
        </div>

        <hr className="my-3 border-white opacity-50" />

        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center text-dark mb-3 text-decoration-none p-2 rounded ${
                isActive ? "bg-white bg-opacity-20" : ""
              }`
            }
          >
            <i className={`bi bi-${item.icon} me-2`}></i>
            {item.name}
          </NavLink>
        ))}

        <div className="mt-auto pt-4">
          <hr className="my-3 border-white opacity-50" />
          <LogoutButton />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {show && (
        <div
          className="position-fixed top-0 start-0 bg-gradient-to-b from-indigo-700 to-purple-800 text-dark p-3"
          style={{ width: 250, height: "100vh", zIndex: 1050, background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)" }}
        >
          <button
            className="btn btn-light btn-sm mb-3"
            onClick={onClose}
          >
            <i className="bi bi-x me-1"></i> Close
          </button>

          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `d-flex align-items-center text-white d-block mb-3 p-2 rounded ${
                  isActive ? "bg-white bg-opacity-20" : ""
                }`
              }
              onClick={onClose}
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
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