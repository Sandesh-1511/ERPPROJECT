// // src/components/DashboardLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = () => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="d-flex">
//       <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//       <div
//         className="flex-grow-1"
//         style={{ marginLeft: window.innerWidth >= 768 ? 250 : 0 }}
//       >
//         {/* Mobile Top Bar */}
//         <div className="d-md-none p-2 bg-light shadow-sm">
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => setShowSidebar(true)}
//           >
//             <FaBars />
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="p-3 bg-light" style={{ minHeight: "100vh" }}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// // src/components/DashboardLayout.jsx
// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = () => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Handle resize
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="d-flex">
//       <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//       <div
//         className="flex-grow-1"
//         style={{ marginLeft: isMobile ? 0 : 250 }}
//       >
//         {/* Mobile Top Bar */}
//         <div className="d-md-none p-3 bg-white shadow-sm d-flex align-items-center">
//           <button
//             className="btn btn-danger rounded-circle p-2 me-2"
//             onClick={() => setShowSidebar(true)}
//             aria-label="Open menu"
//           >
//             <FaBars className="text-white" />
//           </button>
//           <span className="h5 mb-0 text-dark">Dashboard</span>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="p-3 bg-light" style={{ minHeight: "100vh" }}>
//           <Outlet />
//         </div>
//       </div>

//       {/* Global Scrollbar Hide (for all pages) */}
//       <style jsx global>{`
//         ::-webkit-scrollbar {
//           display: none;
//         }
//         * {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
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
    <div className="d-flex">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: isMobile ? 0 : 250,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Mobile Header */}
        <div className="d-md-none bg-white shadow-sm p-3 d-flex align-items-center">
          <button
            className="btn btn-danger me-3"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>
          <h5 className="mb-0">Dashboard</h5>
        </div>

        {/* Content */}
        <main className="p-3 bg-light" style={{ minHeight: "100vh" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
