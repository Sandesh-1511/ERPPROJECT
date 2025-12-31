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
          <div className="card p-3 shadow-sm h-100">
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
          <div className="card p-3 shadow-sm h-100">
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
          <div className="card p-3 shadow-sm h-100">
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
          <div className="card p-3 shadow-sm h-100">
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
              <div
                className="card p-3 shadow-sm h-100  position-relative"
                style={{ top: "40px" }}
              >
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
            {/* 
            <div className="col-12">
              <QuickStatsPanel />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrincipalDashboard;
