// // src/components/DashboardLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import { Button } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = ({ children }) => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="d-flex min-vh-100">
//       {/* Sidebar */}
//       <div
//         className={`
//           bg-danger text-white
//           ${showSidebar ? "d-block" : "d-none"}
//           d-md-block
//         `}
//         style={{
//           width: "250px",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 1050,
//         }}
//       >
//         <Sidebar onClose={() => setShowSidebar(false)} />
//       </div>

//       {/* Main Content */}
//       <div
//         className="flex-grow-1"
//         style={{
//           marginLeft: "0",
//         }}
//       >
//         {/* Top Navbar (only for mobile) */}
//         <div className="d-md-none bg-white shadow-sm p-3 d-flex align-items-center">
//           <Button
//             variant="outline-danger"
//             onClick={() => setShowSidebar(true)}
//           >
//             <FaBars />
//           </Button>
//           <h6 className="mb-0 ms-3 fw-bold">Dashboard</h6>
//         </div>

//         {/* Page Content */}
//         <div
//           className="p-3 p-md-4 bg-light"
//           style={{
//             minHeight: "100vh",
//             marginLeft: "0",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// // src/components/DashboardLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import { Button } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = ({ children }) => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//       {/* Main Content */}
//       <div className="flex-grow-1">
//         {/* Top Navbar (Mobile only) */}
//         <div className="d-lg-none p-2 bg-danger text-white">
//           <Button
//             variant="light"
//             size="sm"
//             onClick={() => setShowSidebar(true)}
//           >
//             <FaBars />
//           </Button>
//           <span className="ms-3 fw-bold">ERP Panel</span>
//         </div>

//         {/* Page Content */}
//         <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;









// // src/components/DashboardLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = ({ children }) => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <>
//       {/* Mobile Top Bar */}
//       <div className="d-md-none bg-danger text-white p-2 d-flex align-items-center">
//         <button
//           className="btn btn-light btn-sm me-2"
//           onClick={() => setShowSidebar(true)}
//         >
//           <FaBars />
//         </button>
//         <strong>ERP Panel</strong>
//       </div>

//       <div className="d-flex">
//         <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//         {/* Main Content */}
//         <div
//           className="bg-light p-3"
//           style={{
//             marginLeft: window.innerWidth >= 768 ? 250 : 0,
//             width: "100%",
//             minHeight: "100vh",
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;



// // src/components/DashboardLayout.jsx
// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { FaBars } from "react-icons/fa";

// const DashboardLayout = ({ children }) => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Close sidebar when route changes or on desktop
//   useEffect(() => {
//     if (!isMobile) {
//       setShowSidebar(false);
//     }
//   }, [isMobile]);

//   return (
//     <>
//       {/* Mobile Top Bar */}
//       <div className="d-md-none bg-danger text-white p-2 d-flex align-items-center">
//         <button
//           className="btn btn-light btn-sm me-2"
//           onClick={() => setShowSidebar(true)}
//           aria-label="Toggle sidebar"
//         >
//           <FaBars />
//         </button>
//         <strong>ERP Panel</strong>
//       </div>

//       <div className="d-flex">
//         <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//         {/* Main Content */}
//         <main
//           className="bg-light p-3 flex-grow-1"
//           style={{
//             marginLeft: isMobile ? 0 : "250px",
//             minHeight: "100vh",
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           {children}
//         </main>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;





// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div
        className="flex-grow-1"
        style={{ marginLeft: window.innerWidth >= 768 ? 250 : 0 }}
      >
        {/* Mobile Top Bar */}
        <div className="d-md-none p-2 bg-light shadow-sm">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-3 bg-light" style={{ minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;