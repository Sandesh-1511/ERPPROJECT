// import React from "react";
// import { ProgressBar, Row, Col } from "react-bootstrap";

// const syllabus = [
//   { subject: "English (210)", percent: 62 },
//   { subject: "Hindi (230)", percent: 100 },
//   { subject: "Mathematics (110)", percent: 75 },
//   { subject: "Science (111)", percent: 67 },
// ];

// export default function SyllabusStatus() {
//   return (
//     <div className="bg-white p-3 shadow-sm mb-4 rounded">
//       <h5>Syllabus Status</h5>

//       <Row className="mt-3">
//         {syllabus.map((s, i) => (
//           <Col md={3} sm={6} key={i} className="mb-3">
//             <strong>{s.subject}</strong>
//             <ProgressBar
//               now={s.percent}
//               label={`${s.percent}%`}
//               className="mt-2"
//             />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }



// src/components/SyllabusStatus.jsx
import React from 'react';

const SyllabusStatus = () => {
  const syllabus = [
    { subject: 'Math', completed: 80 },
    { subject: 'English', completed: 75 },
    { subject: 'Science', completed: 65 },
    { subject: 'Hindi', completed: 70 },
  ];

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">📘 Syllabus Completion</h5>
      </div>
      <div className="card-body">
        {syllabus.map((sub, idx) => (
          <div className="mb-3" key={idx}>
            <div className="d-flex justify-content-between mb-1">
              <span>{sub.subject}</span>
              <span>{sub.completed}%</span>
            </div>
            <div className="progress" style={{ height: '12px' }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${sub.completed}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusStatus;