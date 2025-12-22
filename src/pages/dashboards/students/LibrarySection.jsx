// import React from "react";
// import { Table, Badge } from "react-bootstrap";

// export default function LibrarySection() {
//   return (
//     <div className="bg-white p-3 shadow-sm mb-4 rounded">
//       <h5>Library</h5>

//       <Table responsive>
//         <thead>
//           <tr>
//             <th>Book Name</th>
//             <th>Issue Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>English Reader</td>
//             <td>01/12/2025</td>
//             <td><Badge bg="danger">Issued</Badge></td>
//           </tr>
//           <tr>
//             <td>Math Workbook</td>
//             <td>—</td>
//             <td><Badge bg="success">Available</Badge></td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// }



// src/components/LibrarySection.jsx
import React from 'react';

const LibrarySection = () => {
  const issuedBooks = [
    { title: 'The Magic Tree House #1', issued: 'Nov 28, 2025', due: 'Dec 12, 2025', status: 'Overdue' },
    { title: 'Fun with Numbers', issued: 'Dec 10, 2025', due: 'Dec 24, 2025', status: 'Active' },
  ];

  const getBookStatusBadge = (status) => {
    if (status === 'Overdue') return <span className="badge bg-danger">Overdue</span>;
    return <span className="badge bg-primary">Active</span>;
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">📚 Library — Issued Books</h5>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Issued On</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book, idx) => (
              <tr key={idx}>
                <td>{book.title}</td>
                <td>{book.issued}</td>
                <td>{book.due}</td>
                <td>{getBookStatusBadge(book.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-outline-dark">View All Books</button>
      </div>
    </div>
  );
};

export default LibrarySection;