// // src/components/AttendanceCalendar.jsx
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AttendanceCalendar = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025

//   // Mock attendance data for December 2025
//   const attendanceData = {
//     1: 'Absent',
//     2: 'Present',
//     3: 'Present',
//     4: 'Absent',
//     5: 'Half Day',
//     6: 'Holiday',
//     8: 'Late',
//     9: 'Half Day',
//     10: 'Present',
//     11: 'Absent',
//     12: 'Present',
//     13: 'Absent',
//     15: 'Holiday',
//     16: 'Absent',
//     17: 'Late',
//     18: 'Present',
//     19: 'Absent',
//     20: 'Half Day',
//     // Add more as needed...
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Present': return 'bg-success text-white';
//       case 'Absent': return 'bg-danger text-white';
//       case 'Late': return 'bg-warning text-dark';
//       case 'Half Day': return 'bg-orange text-white'; // We'll define .bg-orange below
//       case 'Holiday': return 'bg-secondary text-white';
//       default: return 'bg-light text-dark';
//     }
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

//     const days = [];
//     // Add empty cells for days before the 1st
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }
//     // Add actual days
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }
//     return days;
//   };

//   const navigateMonth = (direction) => {
//     const newDate = new Date(currentMonth);
//     newDate.setMonth(newDate.getMonth() + direction);
//     setCurrentMonth(newDate);
//   };

//   const days = getDaysInMonth(currentMonth);
//   const monthName = currentMonth.toLocaleString('default', { month: 'long' });
//   const year = currentMonth.getFullYear();

//   return (
//     <div className="card shadow-sm">
//       <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
//         <h5 className="mb-0">📅 Attendance - December 2025</h5>
//         <div>
//           <button
//             className="btn btn-dark me-2"
//             onClick={() => navigateMonth(-1)}
//             aria-label="Previous Month"
//           >
//             &lt;
//           </button>
//           <button
//             className="btn btn-dark"
//             onClick={() => navigateMonth(1)}
//             aria-label="Next Month"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>

//       <div className="card-body p-0">
//         <div className="table-responsive">
//           <table className="table table-bordered mb-0">
//             <thead>
//               <tr className="text-center">
//                 <th>Mon</th>
//                 <th>Tue</th>
//                 <th>Wed</th>
//                 <th>Thu</th>
//                 <th>Fri</th>
//                 <th>Sat</th>
//                 <th>Sun</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => {
//                 const start = weekIndex * 7;
//                 const end = start + 7;
//                 const weekDays = days.slice(start, end);

//                 return (
//                   <tr key={weekIndex}>
//                     {weekDays.map((day, idx) => {
//                       const dateNum = day;
//                       const status = attendanceData[dateNum];
//                       const isToday = dateNum === new Date().getDate() && 
//                                       currentMonth.getMonth() === new Date().getMonth() &&
//                                       currentMonth.getFullYear() === new Date().getFullYear();

//                       return (
//                         <td
//                           key={idx}
//                           className={`text-center p-2 ${isToday ? 'bg-light-yellow' : ''}`}
//                           style={{ height: '100px', verticalAlign: 'top' }}
//                         >
//                           {dateNum && (
//                             <>
//                               <div className="d-block mb-1">{dateNum}</div>
//                               {status && (
//                                 <span
//                                   className={`badge w-100 py-2 ${getStatusClass(status)}`}
//                                   style={{ fontSize: '0.85rem' }}
//                                 >
//                                   {status}
//                                 </span>
//                               )}
//                             </>
//                           )}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Optional: Add custom CSS for "bg-orange" and "bg-light-yellow"
// // You can add this in your global CSS or index.css
// /*
// .bg-orange {
//   background-color: #FF8C00 !important;
//   color: white !important;
// }

// .bg-light-yellow {
//   background-color: #FFF8E1 !important;
// }
// */

// export default AttendanceCalendar;


// src/components/AttendanceCalendar.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025

  // === 1. Daily Attendance Data (for calendar) ===
  const attendanceData = {
    1: 'Absent',
    2: 'Present',
    3: 'Present',
    4: 'Absent',
    5: 'Half Day',
    6: 'Holiday',
    8: 'Late',
    9: 'Half Day',
    10: 'Present',
    11: 'Absent',
    12: 'Present',
    13: 'Absent',
    15: 'Holiday',
    16: 'Absent',
    17: 'Late',
    18: 'Present',
    19: 'Absent',
    20: 'Half Day',
    22: 'Present',
    23: 'Present',
    24: 'Late',
    26: 'Absent',
    27: 'Present',
    28: 'Present',
    29: 'Half Day',
    30: 'Present',
    31: 'Present',
  };

  // === 2. Subject-wise Attendance ===
  const subjectAttendance = [
    { subject: 'Math', total: 25, present: 20, percentage: 80 },
    { subject: 'English', total: 24, present: 18, percentage: 75 },
    { subject: 'Science', total: 22, present: 15, percentage: 68 },
    { subject: 'Hindi', total: 20, present: 19, percentage: 95 },
  ];

  // === 3. Monthly Summary ===
  const totalDays = 31;
  const presentDays = Object.values(attendanceData).filter(s => s === 'Present').length;
  const halfDays = Object.values(attendanceData).filter(s => s === 'Half Day').length;
  const lateDays = Object.values(attendanceData).filter(s => s === 'Late').length;
  const absentDays = Object.values(attendanceData).filter(s => s === 'Absent').length;

  // Count only school days (exclude holidays & weekends if needed — simplified here)
  const workingDays = totalDays - Object.values(attendanceData).filter(s => s === 'Holiday').length;
  const effectiveAttendance = presentDays + halfDays * 0.5;
  const overallPercentage = workingDays > 0 ? Math.round((effectiveAttendance / workingDays) * 100) : 0;

  // === Helper Functions ===
  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'bg-success text-white';
      case 'Absent': return 'bg-danger text-white';
      case 'Late': return 'bg-warning text-dark';
      case 'Half Day': return 'bg-orange text-white';
      case 'Holiday': return 'bg-secondary text-white';
      default: return 'bg-light text-dark';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0=Sun, 1=Mon...

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">📅 Attendance Section</h5>
      </div>
      <div className="card-body">

        {/* === Attendance Percentage & Warning Alert === */}
        <div className="mb-4 text-center">
          <h3 className="display-6 fw-bold text-dark">{overallPercentage}%</h3>
          <p className="text-muted mb-2">Overall Attendance (Dec 2025)</p>
          {overallPercentage < 75 && (
            <div className="alert alert-warning d-inline-block px-4 py-2">
              ⚠️ Low attendance! Contact office if absent due to medical reasons.
            </div>
          )}
        </div>

        {/* === Monthly Summary === */}
        <div className="row mb-4 text-center">
          <div className="col-3">
            <div className="bg-light p-2 rounded">
              <div className="text-success fw-bold">{presentDays}</div>
              <small>Present</small>
            </div>
          </div>
          <div className="col-3">
            <div className="bg-light p-2 rounded">
              <div className="text-danger fw-bold">{absentDays}</div>
              <small>Absent</small>
            </div>
          </div>
          <div className="col-3">
            <div className="bg-light p-2 rounded">
              <div className="text-warning fw-bold">{lateDays}</div>
              <small>Late</small>
            </div>
          </div>
          <div className="col-3">
            <div className="bg-light p-2 rounded">
              <div className="text-info fw-bold">{halfDays}</div>
              <small>Half Day</small>
            </div>
          </div>
        </div>

        {/* === Subject-wise Attendance === */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary mb-3">📚 Subject-wise Attendance</h6>
          {subjectAttendance.map((sub, idx) => (
            <div className="mb-3" key={idx}>
              <div className="d-flex justify-content-between small mb-1">
                <span>{sub.subject}</span>
                <span>{sub.percentage}% ({sub.present}/{sub.total})</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className={`progress-bar ${sub.percentage >= 75 ? 'bg-success' : 'bg-danger'}`}
                  role="progressbar"
                  style={{ width: `${sub.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* === Daily Attendance Calendar === */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-secondary mb-0">
              📆 Daily Attendance — {monthName} {year}
            </h6>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-1"
                onClick={() => navigateMonth(-1)}
                aria-label="Previous Month"
              >
                &lt;
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => navigateMonth(1)}
                aria-label="Next Month"
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered mb-0">
              <thead>
                <tr className="text-center small">
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => {
                  const start = weekIndex * 7;
                  const end = start + 7;
                  const weekDays = days.slice(start, end);
                  return (
                    <tr key={weekIndex}>
                      {weekDays.map((day, idx) => {
                        const dateNum = day;
                        const status = attendanceData[dateNum];
                        const isToday = dateNum === new Date().getDate() &&
                          currentMonth.getMonth() === new Date().getMonth() &&
                          currentMonth.getFullYear() === new Date().getFullYear();

                        return (
                          <td
                            key={idx}
                            className={`text-center p-1 ${isToday ? 'bg-light-yellow' : ''}`}
                            style={{ height: '70px', verticalAlign: 'top', fontSize: '0.85rem' }}
                          >
                            {dateNum && (
                              <>
                                <div className="fw-bold mb-1">{dateNum}</div>
                                {status && (
                                  <span className={`badge py-1 w-100 ${getStatusClass(status)}`}>
                                    {status}
                                  </span>
                                )}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these to your global CSS (e.g., index.css)
/*
.bg-orange {
  background-color: #FF8C00 !important;
  color: white !important;
}
.bg-light-yellow {
  background-color: #FFF8E1 !important;
}
*/

export default AttendanceCalendar;