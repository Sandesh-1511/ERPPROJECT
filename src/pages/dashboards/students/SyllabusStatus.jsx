
// import React from 'react';

// const SyllabusStatus = () => {
//   // Enhanced mock data: courses with subjects and metadata
//   const enrolledCourses = [
//     {
//       id: 1,
//       title: "Primary School Curriculum - Class 1",
//       duration: "Apr 2025 – Mar 2026",
//       subjects: [
//         { name: "Math", completed: 80 },
//         { name: "English", completed: 75 },
//         { name: "Science", completed: 65 },
//         { name: "Hindi", completed: 70 },
//       ],
//     },
//     {
//       id: 2,
//       title: "Creative Arts Program",
//       duration: "Aug 2025 – Jan 2026",
//       subjects: [
//         { name: "Drawing", completed: 90 },
//         { name: "Music", completed: 60 },
//         { name: "Craft", completed: 50 },
//       ],
//     },
//   ];

//   // Helper: calculate overall course completion (average of subjects)
//   const calculateCourseProgress = (subjects) => {
//     const total = subjects.reduce((sum, sub) => sum + sub.completed, 0);
//     return Math.round(total / subjects.length);
//   };

//   return (
//     <div className="card shadow-sm h-100">
//       <div className="card-header bg-info text-white">
//         <h5 className="mb-0">📘 My Courses / My Subjects</h5>
//       </div>
//       <div className="card-body">
//         {enrolledCourses.map((course) => {
//           const progress = calculateCourseProgress(course.subjects);
//           return (
//             <div className="mb-4" key={course.id}>
//               {/* Course Header */}
//               <div className="d-flex justify-content-between align-items-start mb-2">
//                 <h6 className="fw-bold text-dark">{course.title}</h6>
//                 <span className="badge bg-light text-dark">{course.duration}</span>
//               </div>

//               {/* Course Progress */}
//               <div className="d-flex justify-content-between mb-2">
//                 <small>Course Progress</small>
//                 <small>{progress}%</small>
//               </div>
//               <div className="progress mb-3" style={{ height: '8px' }}>
//                 <div
//                   className="progress-bar bg-success"
//                   role="progressbar"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>

//               {/* Subjects List */}
//               <div className="ps-3">
//                 {course.subjects.map((subject, idx) => (
//                   <div className="d-flex justify-content-between mb-1" key={idx}>
//                     <span className="small">{subject.name}</span>
//                     <span className="small fw-medium">{subject.completed}%</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}

//         {enrolledCourses.length === 0 && (
//           <p className="text-muted text-center mb-0">No enrolled courses found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SyllabusStatus;


// src/components/SyllabusStatus.jsx
import React from 'react';

const SyllabusStatus = () => {
  // Mock data: Enrolled courses with subjects, duration, and progress
  const enrolledCourses = [
    {
      id: 1,
      name: "Class 1 - Academic Year 2025-26",
      duration: "April 2025 – March 2026",
      totalTopics: 120,
      completedTopics: 85,
    },
    {
      id: 2,
      name: "Art & Creativity Program",
      duration: "August 2025 – January 2026",
      totalTopics: 40,
      completedTopics: 28,
    },
    {
      id: 3,
      name: "Moral Science & Life Skills",
      duration: "June 2025 – December 2025",
      totalTopics: 30,
      completedTopics: 30,
    },
  ];

  // Subjects grouped under each course (matching course ID)
  const subjectsByCourse = {
    1: ["Math", "English", "Hindi", "Science", "EVS"],
    2: ["Drawing", "Color Theory", "Craft", "Music"],
    3: ["Moral Stories", "Ethics", "Good Habits"]
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📘 My Courses / My Subjects</h5>
      </div>
      <div className="card-body">
        {enrolledCourses.length === 0 ? (
          <p className="text-muted text-center">No enrolled courses.</p>
        ) : (
          enrolledCourses.map((course) => {
            const completed = course.completedTopics;
            const total = course.totalTopics;
            const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const pending = total - completed;

            return (
              <div className="mb-4" key={course.id}>
                {/* Course Name & Duration */}
                <h6 className="fw-bold text-dark mb-1">{course.name}</h6>
                <p className="text-muted small mb-2">
                  <em>{course.duration}</em>
                </p>

                {/* Progress: Completed vs Pending */}
                <div className="d-flex justify-content-between small mb-1">
                  <span>Completed: {completed}</span>
                  <span>Pending: {pending}</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="text-end small text-muted mt-1">{progressPercent}% Complete</p>

                {/* Subjects under this course */}
                <div className="mt-2">
                  <strong className="small text-secondary">Subjects:</strong>
                  <ul className="list-unstyled mb-0 mt-1 ps-3">
                    {subjectsByCourse[course.id]?.map((subject, idx) => (
                      <li key={idx} className="small">
                        • {subject}
                      </li>
                    )) || <li className="small text-muted">No subjects listed</li>}
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SyllabusStatus;