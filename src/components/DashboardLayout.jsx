

// // src/components/DashboardLayout.jsx
// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = () => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (!mobile) setShowSidebar(false);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="d-flex">
//       <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//       <div
//         className="flex-grow-1"
//         style={{
//           marginLeft: isMobile ? 0 : 250,
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {/* Mobile Header */}
//         <div className="d-md-none bg-white shadow-sm p-3 d-flex align-items-center">
//           <button
//             className="btn btn-danger me-3"
//             onClick={() => setShowSidebar(true)}
//           >
//             <FaBars />
//           </button>
//           <h5 className="mb-0">Dashboard</h5>
//         </div>

//         {/* Content */}
//         <main className="p-3 bg-light" style={{ minHeight: "100vh" }}>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// src/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ overflowX: "hidden" }}>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: isMobile ? 0 : 260, // 🔸 Match sidebar width
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        {/* Mobile Header */}
        <div className="d-md-none bg-white shadow-sm p-3 d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>
          <h5 className="mb-0">Dashboard</h5>
        </div>

        {/* Content */}
        <main className="p-3 p-md-4" style={{ background: "#f8f9fa" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
