// import React from 'react';

// // ================================
// // Placeholder Components (Replace with real charts later)
// // ================================

// const StudentEnrollmentChart = () => {
//   const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
//   const studentCounts = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];

//   return (
//     <div className="card p-3 shadow-sm h-100">
//       <h5>Student Enrollment by Class</h5>
//       <div className="mt-3" style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '0 10px' }}>
//         {classes.map((cls, idx) => (
//           <div key={cls} className="d-flex flex-column align-items-center" style={{ flex: '1 1 auto', minWidth: '20px' }}>
//             <div
//               style={{
//                 width: '12px',
//                 height: `${studentCounts[idx] / 10}px`,
//                 backgroundColor: '#2196F3',
//                 marginBottom: '2px',
//                 borderRadius: '2px 2px 0 0'
//               }}
//             ></div>
//             <small>{cls}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const TeacherAttendanceChart = () => {
//   const days = Array.from({ length: 30 }, (_, i) => i + 1);
//   const attendanceData = [95, 92, 98, 90, 88, 94, 96, 93, 91, 97, 95, 92, 96, 94, 93, 90, 91, 95, 97, 96, 94, 92, 98, 90, 89, 93, 95, 96, 94, 92];

//   return (
//     <div className="card p-3 shadow-sm h-100">
//       <h5>Teacher Attendance This Month</h5>
//       <div className="mt-3" style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '5px', padding: '0 10px' }}>
//         {days.map((day, idx) => (
//           <div key={day} className="d-flex flex-column align-items-center" style={{ flex: '1 1 auto', minWidth: '10px' }}>
//             <div
//               style={{
//                 width: '6px',
//                 height: `${attendanceData[idx] / 5}px`,
//                 backgroundColor: '#4CAF50',
//                 marginBottom: '2px',
//                 borderRadius: '50%'
//               }}
//             ></div>
//             {idx % 5 === 0 && <small>{day}</small>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const StudentPerformanceDonut = () => {
//   const categories = [
//     { name: 'Passed', value: 75, color: '#4CAF50' },
//     { name: 'Failed', value: 10, color: '#FF5722' },
//     { name: 'Pending', value: 15, color: '#FFC107' }
//   ];

//   return (
//     <div className="card p-3 shadow-sm h-100">
//       <h5>Student Performance Overview</h5>
//       <div className="mt-3" style={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         {/* Legend */}
//         <div className="d-flex flex-wrap justify-content-center mb-3">
//           {categories.map(cat => (
//             <div key={cat.name} className="d-flex align-items-center me-3 mb-2">
//               <div style={{ width: '15px', height: '15px', backgroundColor: cat.color, marginRight: '5px' }}></div>
//               <span style={{ fontSize: '0.8rem' }}>{cat.name} ({cat.value}%)</span>
//             </div>
//           ))}
//         </div>

//         {/* Semi-Circle Donut */}
//         <div style={{
//           width: '180px',
//           height: '90px',
//           borderRadius: '90px 90px 0 0',
//           backgroundColor: '#f8f9fa',
//           position: 'relative',
//           overflow: 'hidden'
//         }}>
//           {categories.reduce((acc, cat, index) => {
//             const startAngle = acc.start;
//             const endAngle = startAngle + (cat.value / 100) * 180;
//             const transform = `rotate(${startAngle}deg)`;
//             const clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`;

//             return {
//               start: endAngle,
//               elements: [...acc.elements, (
//                 <div
//                   key={cat.name}
//                   style={{
//                     position: 'absolute',
//                     top: '0',
//                     left: '0',
//                     width: '100%',
//                     height: '100%',
//                     clipPath: clipPath,
//                     transform: transform,
//                     transformOrigin: 'bottom center',
//                     backgroundColor: cat.color,
//                     border: '2px solid white'
//                   }}
//                 />
//               )]
//             };
//           }, { start: 0, elements: [] }).elements}
//         </div>
//       </div>
//     </div>
//   );
// };

// const StaffDistributionPie = () => {
//   const departments = [
//     { name: 'Academics', value: 40, color: '#9C27B0' },
//     { name: 'Administration', value: 25, color: '#2196F3' },
//     { name: 'Sports', value: 15, color: '#FF9800' },
//     { name: 'Library', value: 10, color: '#795548' },
//     { name: 'Others', value: 10, color: '#9E9E9E' }
//   ];

//   return (
//     <div className="card p-3 shadow-sm h-100">
//       <h5>Staff Distribution by Department</h5>
//       <div className="mt-3" style={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         {/* Legend */}
//         <div className="d-flex flex-wrap justify-content-center mb-3">
//           {departments.map(dep => (
//             <div key={dep.name} className="d-flex align-items-center me-3 mb-2">
//               <div style={{ width: '15px', height: '15px', backgroundColor: dep.color, marginRight: '5px' }}></div>
//               <span style={{ fontSize: '0.8rem' }}>{dep.name} ({dep.value}%)</span>
//             </div>
//           ))}
//         </div>

//         {/* Semi-Circle Pie */}
//         <div style={{
//           width: '180px',
//           height: '90px',
//           borderRadius: '90px 90px 0 0',
//           backgroundColor: '#f8f9fa',
//           position: 'relative',
//           overflow: 'hidden'
//         }}>
//           {departments.reduce((acc, dep, index) => {
//             const startAngle = acc.start;
//             const endAngle = startAngle + (dep.value / 100) * 180;
//             const transform = `rotate(${startAngle}deg)`;
//             const clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`;

//             return {
//               start: endAngle,
//               elements: [...acc.elements, (
//                 <div
//                   key={dep.name}
//                   style={{
//                     position: 'absolute',
//                     top: '0',
//                     left: '0',
//                     width: '100%',
//                     height: '100%',
//                     clipPath: clipPath,
//                     transform: transform,
//                     transformOrigin: 'bottom center',
//                     backgroundColor: dep.color,
//                     border: '2px solid white'
//                   }}
//                 />
//               )]
//             };
//           }, { start: 0, elements: [] }).elements}
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuickStatsPanel = () => {
//   return (
//     <div className="card p-3 shadow-sm">
//       <h5>Quick Stats & Alerts</h5>
//       <div className="mt-3">
//         <div className="mb-3">
//           <h6>🏆 Top Performing Classes</h6>
//           <ul className="list-unstyled mb-0">
//             <li><strong>XII A</strong> - Avg: 92%</li>
//             <li><strong>X B</strong> - Avg: 89%</li>
//             <li><strong>VIII C</strong> - Avg: 87%</li>
//           </ul>
//         </div>

//         <div className="mb-3">
//           <h6>⚠️ Most Absent Students (Last 7 Days)</h6>
//           <ul className="list-unstyled mb-0">
//             <li>Rahul Sharma - 3 Days</li>
//             <li>Priya Patel - 2 Days</li>
//             <li>Amit Kumar - 2 Days</li>
//           </ul>
//         </div>

//         <div>
//           <h6>📅 Upcoming Events</h6>
//           <ul className="list-unstyled mb-0">
//             <li>PTM - Jan 5, 2026</li>
//             <li>Sports Day - Jan 15, 2026</li>
//             <li>Exam Schedule Release - Dec 25, 2025</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ================================
// // Main Principal Dashboard Component
// // ================================

// function PrincipalDashboard() {
//   return (
//     <>
//       <h3>Principal Dashboard</h3>

//       {/* Top Summary Cards */}
//       <div className="row mt-4 mb-4">
//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-people-fill me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Total Students</h6>
//                 <p className="mb-0 fw-bold">650</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-person-badge me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Total Teachers</h6>
//                 <p className="mb-0 fw-bold">45</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-check-circle me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Student Attendance Today</h6>
//                 <p className="mb-0 fw-bold">620/650 (95%)</p>
//                 <div className="progress mt-2" style={{ height: '4px' }}>
//                   <div className="progress-bar bg-success" role="progressbar" style={{ width: '95%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-exclamation-triangle me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Pending Fees Alerts</h6>
//                 <p className="mb-0 fw-bold">88 Students</p>
//                 <div className="progress mt-2" style={{ height: '4px' }}>
//                   <div className="progress-bar bg-warning" role="progressbar" style={{ width: '25%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Dashboard Grid */}
//       <div className="row g-4">
//         {/* Left Column - Charts */}
//         <div className="col-lg-8">
//           <div className="row g-4">
//             <div className="col-12">
//               <StudentEnrollmentChart />
//             </div>

//             <div className="col-12">
//               <TeacherAttendanceChart />
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Charts and Stats */}
//         <div className="col-lg-4">
//           <div className="row g-4">
//             <div className="col-12">
//               <StudentPerformanceDonut />
//             </div>

//             <div className="col-12">
//               <StaffDistributionPie />
//             </div>

//             <div className="col-12">
//               <QuickStatsPanel />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PrincipalDashboard;

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock Data (Replace with your API data)
const studentEnrollmentData = [
  { class: "Nursery", students: 25 },
  { class: "LKG", students: 30 },
  { class: "UKG", students: 35 },
  { class: "I", students: 40 },
  { class: "II", students: 45 },
  { class: "III", students: 50 },
  { class: "IV", students: 55 },
  { class: "V", students: 60 },
  { class: "VI", students: 65 },
  { class: "VII", students: 70 },
  { class: "VIII", students: 75 },
  { class: "IX", students: 80 },
  { class: "X", students: 85 },
  { class: "XI", students: 90 },
  { class: "XII", students: 95 },
];

const teacherAttendanceData = Array.from({ length: 30 }, (_, i) => ({
  day: `Dec ${i + 1}`,
  present: 40 + Math.floor(Math.random() * 6), // Random 40–45 out of 45
  total: 45,
}));

const performanceData = [
  { name: "Passed", value: 75 },
  { name: "Failed", value: 10 },
  { name: "Pending", value: 15 },
];

const departmentData = [
  { name: "Academics", value: 25 },
  { name: "Administration", value: 10 },
  { name: "Sports", value: 5 },
  { name: "Library", value: 3 },
  { name: "Others", value: 2 },
];

const COLORS = ["#4CAF50", "#FF5722", "#FFC107"];
const DEPT_COLORS = ["#9C27B0", "#2196F3", "#FF9800", "#795548", "#9E9E9E"];

const QuickStatsPanel = () => (
  <div className="card p-3 shadow-sm h-100">
    <h5>Quick Stats & Alerts</h5>
    <div className="mt-3">
      <div className="mb-3">
        <h6>🏆 Top Performing Classes</h6>
        <ul className="list-unstyled mb-0">
          <li>
            <strong>XII A</strong> – Avg: 92%
          </li>
          <li>
            <strong>X B</strong> – Avg: 89%
          </li>
          <li>
            <strong>VIII C</strong> – Avg: 87%
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <h6>⚠️ Most Absent Students (Last 7 Days)</h6>
        <ul className="list-unstyled mb-0">
          <li>Rahul Sharma – 3 Days</li>
          <li>Priya Patel – 2 Days</li>
          <li>Amit Kumar – 2 Days</li>
        </ul>
      </div>

      <div>
        <h6>📅 Upcoming Events</h6>
        <ul className="list-unstyled mb-0">
          <li>PTM – Jan 5, 2026</li>
          <li>Sports Day – Jan 15, 2026</li>
          <li>Exam Schedule – Dec 25, 2025</li>
        </ul>
      </div>
    </div>
  </div>
);

function PrincipalDashboard() {
  return (
    <>
      <h3>Principal Dashboard</h3>

      {/* Top Summary Cards */}
      <div className="row mt-4 mb-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-people-fill me-2"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div>
                <h6 className="mb-0">Total Students</h6>
                <p className="mb-0 fw-bold">650</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-person-badge me-2"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div>
                <h6 className="mb-0">Total Teachers</h6>
                <p className="mb-0 fw-bold">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-check-circle me-2"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div>
                <h6 className="mb-0">Student Attendance Today</h6>
                <p className="mb-0 fw-bold">620/650 (95%)</p>
                <div className="progress mt-2" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-exclamation-triangle me-2"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div>
                <h6 className="mb-0">Pending Fees Alerts</h6>
                <p className="mb-0 fw-bold">88 Students</p>
                <div className="progress mt-2" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="row g-4">
        {/* Left Column - Charts */}
        <div className="col-lg-8">
          <div className="row g-4">
            <div className="col-12">
              <div className="card p-3 shadow-sm h-100">
                <h5>Student Enrollment by Class</h5>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={studentEnrollmentData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="class"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="students"
                        fill="#2196F3"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-3 shadow-sm h-100">
                <h5>Teacher Attendance This Month</h5>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={teacherAttendanceData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" hide />
                      <YAxis domain={[35, 46]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="present"
                        name="Present Teachers"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Charts and Stats */}
        <div className="col-lg-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="card p-3 shadow-sm h-100">
                <h5>Student Performance Overview</h5>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-3 shadow-sm h-100">
                <h5>Staff by Department</h5>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={DEPT_COLORS[index % DEPT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        height={60}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-12">
              <QuickStatsPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrincipalDashboard;
