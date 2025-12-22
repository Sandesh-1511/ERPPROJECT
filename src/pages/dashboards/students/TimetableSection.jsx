// import React from "react";
// import { Card, Table } from "react-bootstrap";

// const timetable = [
//   { day: "Monday", subject: "English", time: "9:00 - 10:00" },
//   { day: "Tuesday", subject: "Maths", time: "10:00 - 11:00" },
//   { day: "Wednesday", subject: "Science", time: "11:00 - 12:00" },
// ];

// const TimetableSection = () => (
//   <Card className="mb-4 shadow-sm">
//     <Card.Header><strong>Class Timetable</strong></Card.Header>
//     <Card.Body className="table-responsive">
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Day</th>
//             <th>Subject</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {timetable.map((t, i) => (
//             <tr key={i}>
//               <td>{t.day}</td>
//               <td>{t.subject}</td>
//               <td>{t.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Card.Body>
//   </Card>
// );

// export default TimetableSection;



// src/components/TimetableSection.jsx
import React from 'react';

const TimetableSection = () => {
  const timetable = [
    { day: 'Monday', periods: ['Math', 'English', 'Science', 'Art', 'PE'] },
    { day: 'Tuesday', periods: ['Hindi', 'Math', 'Story Time', 'Music', 'Library'] },
    { day: 'Wednesday', periods: ['Science', 'Math', 'English', 'Craft', 'PE'] },
    { day: 'Thursday', periods: ['Moral Science', 'Hindi', 'Math', 'Computer', 'Art'] },
    { day: 'Friday', periods: ['Science', 'English', 'Math', 'Music', 'Story Time'] },
  ];

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">🕒 Class Timetable</h5>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Day</th>
              <th>Periods</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((day, idx) => (
              <tr key={idx}>
                <td><strong>{day.day}</strong></td>
                <td>{day.periods.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableSection;