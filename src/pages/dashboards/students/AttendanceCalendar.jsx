// src/components/AttendanceCalendar.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025

  // Mock attendance data for December 2025
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
    // Add more as needed...
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'bg-success text-white';
      case 'Absent': return 'bg-danger text-white';
      case 'Late': return 'bg-warning text-dark';
      case 'Half Day': return 'bg-orange text-white'; // We'll define .bg-orange below
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
    const startingDayOfWeek = firstDay.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    const days = [];
    // Add empty cells for days before the 1st
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
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
      <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📅 Attendance - December 2025</h5>
        <div>
          <button
            className="btn btn-dark me-2"
            onClick={() => navigateMonth(-1)}
            aria-label="Previous Month"
          >
            &lt;
          </button>
          <button
            className="btn btn-dark"
            onClick={() => navigateMonth(1)}
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead>
              <tr className="text-center">
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
                          className={`text-center p-2 ${isToday ? 'bg-light-yellow' : ''}`}
                          style={{ height: '100px', verticalAlign: 'top' }}
                        >
                          {dateNum && (
                            <>
                              <div className="d-block mb-1">{dateNum}</div>
                              {status && (
                                <span
                                  className={`badge w-100 py-2 ${getStatusClass(status)}`}
                                  style={{ fontSize: '0.85rem' }}
                                >
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
  );
};

// Optional: Add custom CSS for "bg-orange" and "bg-light-yellow"
// You can add this in your global CSS or index.css
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