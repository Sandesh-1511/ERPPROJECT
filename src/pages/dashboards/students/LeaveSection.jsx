// import React from "react";
// import { Table, Badge, Button } from "react-bootstrap";

// export default function LeaveSection() {
//   return (
//     <div className="bg-white p-3 shadow-sm mb-4 rounded">
//       <div className="d-flex justify-content-between mb-2">
//         <h5>Leave List</h5>
//         <Button size="sm">+ Add</Button>
//       </div>

//       <Table responsive>
//         <thead>
//           <tr>
//             <th>Apply Date</th>
//             <th>From</th>
//             <th>To</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>04/01/2025</td>
//             <td>04/08/2025</td>
//             <td>04/10/2025</td>
//             <td><Badge bg="success">Approved</Badge></td>
//           </tr>
//           <tr>
//             <td>09/02/2025</td>
//             <td>09/22/2025</td>
//             <td>09/25/2025</td>
//             <td><Badge bg="warning">Pending</Badge></td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// }




// src/components/LeaveSection.jsx
import React from 'react';

const LeaveSection = () => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">🛂 Apply Leave</h5>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Leave Type</label>
            <select className="form-select">
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">From Date – To Date</label>
            <div className="d-flex align-items-center">
              <input type="date" className="form-control me-2" />
              <span className="mx-2">to</span>
              <input type="date" className="form-control ms-2" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Reason</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-danger">Submit Leave Request</button>
        </form>
      </div>
    </div>
  );
};

export default LeaveSection;