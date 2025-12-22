// import React, { useState } from "react";
// import { Table, Badge, Nav } from "react-bootstrap";

// export default function HomeworkSection() {
//   const [tab, setTab] = useState("upcoming");

//   return (
//     <div className="bg-white p-3 shadow-sm mb-4 rounded">
//       <h5>Homework</h5>

//       <Nav variant="tabs" className="mb-3">
//         <Nav.Item>
//           <Nav.Link active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
//             Upcoming Homework
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link active={tab === "closed"} onClick={() => setTab("closed")}>
//             Closed Homework
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>

//       <Table responsive>
//         <thead>
//           <tr>
//             <th>Subject</th>
//             <th>Homework Date</th>
//             <th>Submission Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Computer</td>
//             <td>12/22/2025</td>
//             <td>12/27/2025</td>
//             <td><Badge bg="warning">Submitted</Badge></td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// }



// src/components/HomeworkSection.jsx
import React from 'react';

const HomeworkSection = () => {
  const homework = [
    { subject: 'Math', task: 'Complete Exercise 5.2', due: 'Dec 22, 2025' },
    { subject: 'English', task: 'Write a story on “My Best Friend”', due: 'Dec 23, 2025' },
    { subject: 'Science', task: 'Draw parts of a plant', due: 'Dec 21, 2025' },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">📝 Homework</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {homework.map((hw, idx) => (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={idx}>
              <div>
                <strong>{hw.subject}:</strong> {hw.task}
              </div>
              <span className="badge bg-secondary">Due: {hw.due}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeworkSection;