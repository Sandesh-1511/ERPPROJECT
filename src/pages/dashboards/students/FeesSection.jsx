// import React from "react";
// import { Table, Badge, Button } from "react-bootstrap";

// export default function FeesSection() {
//   return (
//     <div className="bg-white p-3 shadow-sm mb-4 rounded">
//       <h5 className="mb-3">Student Fees</h5>

//       <Table responsive bordered>
//         <thead>
//           <tr>
//             <th>Fees</th>
//             <th>Due Date</th>
//             <th>Status</th>
//             <th>Amount</th>
//             <th>Paid</th>
//             <th>Balance</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="table-danger">
//             <td>Admission Fees</td>
//             <td>04/10/2025</td>
//             <td><Badge bg="danger">Unpaid</Badge></td>
//             <td>2500</td>
//             <td>0</td>
//             <td>2500</td>
//             <td><Button size="sm">Pay</Button></td>
//           </tr>

//           <tr className="table-warning">
//             <td>August Month Fees</td>
//             <td>08/10/2025</td>
//             <td><Badge bg="warning">Partial</Badge></td>
//             <td>350</td>
//             <td>100</td>
//             <td>150</td>
//             <td><Button size="sm">Pay</Button></td>
//           </tr>

//           <tr className="table-success">
//             <td>April Month Fees</td>
//             <td>04/10/2025</td>
//             <td><Badge bg="success">Paid</Badge></td>
//             <td>350</td>
//             <td>350</td>
//             <td>0</td>
//             <td>—</td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// }



// src/components/FeesSection.jsx
import React from 'react';

const FeesSection = () => {
  const feesData = [
    { type: 'Admission Fees', due: '04/10/2025', status: 'Unpaid', amount: 2500, paid: 0, balance: 2500 },
    { type: 'April Month Fees', due: '04/10/2025', status: 'Paid', amount: 350, paid: 350, balance: 0 },
    { type: 'August Month Fees', due: '08/10/2025', status: 'Partial', amount: 350, paid: 100, balance: 250 },
    { type: 'Bus Fees', due: '12/15/2025', status: 'Unpaid', amount: 200, paid: 0, balance: 200 },
    { type: 'December Fees', due: '12/10/2025', status: 'Partial', amount: 350, paid: 180, balance: 170 },
  ];

  const getStatusBadge = (status) => {
    if (status === 'Paid') return <span className="badge bg-success">Paid</span>;
    if (status === 'Partial') return <span className="badge bg-warning text-dark">Partial</span>;
    return <span className="badge bg-danger">Unpaid</span>;
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">💰 Fees</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Amount ($)</th>
                <th>Paid ($)</th>
                <th>Balance ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feesData.map((fee, idx) => (
                <tr key={idx}>
                  <td>{fee.type}</td>
                  <td>{fee.due}</td>
                  <td>{getStatusBadge(fee.status)}</td>
                  <td>{fee.amount.toFixed(2)}</td>
                  <td>{fee.paid.toFixed(2)}</td>
                  <td>{fee.balance.toFixed(2)}</td>
                  <td>
                    {fee.balance > 0 && (
                      <button className="btn btn-sm btn-outline-success">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesSection;