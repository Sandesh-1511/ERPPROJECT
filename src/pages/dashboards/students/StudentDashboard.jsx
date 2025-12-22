    

// src/pages/StudentDashboard.jsx
import React from 'react';
import StudentHeader from './StudentHeader';
import FeesSection from './FeesSection';
import TimetableSection from './TimetableSection';
import SyllabusStatus from './SyllabusStatus';
import HomeworkSection from './HomeworkSection';
import LeaveSection from './LeaveSection';
import AttendanceCalendar from './AttendanceCalendar';
import LibrarySection from './LibrarySection';

const StudentDashboard = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      {/* ===== STUDENT PROFILE (ADDED ONLY) ===== */}
      <div className="row mb-4">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-wrap align-items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Student"
                className="rounded-circle me-4 mb-3 mb-md-0"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">Edward Smith</h5>
                <p className="mb-1 text-muted">
                  Admission No: <strong>STU-1025</strong>
                </p>
                <p className="mb-1 text-muted">
                  Class: <strong>10</strong> | Section: <strong>A</strong>
                </p>
                <p className="mb-0 text-muted">
                  Email: edward@student.com | Phone: 9876543210
                </p>
              </div>

              <div className="mt-3 mt-md-0">
                <span className="badge bg-success px-3 py-2">
                  Active Student
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <StudentHeader />
        </div>
      </div>

      {/* Fees */}
      <div className="row mb-4">
        <div className="col">
          <FeesSection />
        </div>
      </div>

      {/* Timetable & Syllabus */}
      <div className="row mb-4">
        <div className="col-md-6">
          <TimetableSection />
        </div>
        <div className="col-md-6">
          <SyllabusStatus />
        </div>
      </div>

      {/* Homework */}
      <div className="row mb-4">
        <div className="col">
          <HomeworkSection />
        </div>
      </div>

      {/* Leave & Attendance */}
      <div className="row mb-4">
        <div className="col-md-6">
          <LeaveSection />
        </div>
        <div className="col-md-6">
          <AttendanceCalendar />
        </div>
      </div>

      {/* Library */}
      <div className="row">
        <div className="col">
          <LibrarySection />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
