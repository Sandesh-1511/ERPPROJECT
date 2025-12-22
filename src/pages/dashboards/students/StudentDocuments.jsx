// // src/components/StudentDocuments.jsx
// import React from "react";
// import { Container, Table, Badge } from "react-bootstrap";

// const documents = [
//   { name: "Aadhar Card", status: "Uploaded" },
//   { name: "Birth Certificate", status: "Pending" },
//   { name: "Marksheet", status: "Uploaded" },
// ];

// const StudentDocuments = () => {
//   return (
//     <Container fluid className="p-4">
//       <h4 className="mb-3">Student Documents</h4>

//       <div className="table-responsive">
//         <Table bordered>
//           <thead className="table-secondary">
//             <tr>
//               <th>#</th>
//               <th>Document Name</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documents.map((doc, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{doc.name}</td>
//                 <td>
//                   <Badge bg={doc.status === "Uploaded" ? "success" : "warning"}>
//                     {doc.status}
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// export default StudentDocuments;


// src/components/StudentDocuments.jsx
import React from "react";
import { Container, Table, Badge } from "react-bootstrap";

const documents = [
  { name: "Aadhar Card", status: "Uploaded" },
  { name: "Birth Certificate", status: "Pending" },
  { name: "Marksheet", status: "Uploaded" },

  // ===== ADDITIONAL DOCUMENTS (ADDED ONLY) =====
  { name: "Transfer Certificate", status: "Pending" },
  { name: "Previous School Leaving Certificate", status: "Uploaded" },
  { name: "Caste Certificate", status: "Pending" },
  { name: "Income Certificate", status: "Uploaded" },
  { name: "Passport Size Photo", status: "Uploaded" },
  { name: "Medical Fitness Certificate", status: "Pending" },
  { name: "Parent ID Proof", status: "Uploaded" },
];

const StudentDocuments = () => {
  return (
    <Container fluid className="p-4">
      <h4 className="mb-3">Student Documents</h4>

      <div className="table-responsive">
        <Table bordered>
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Document Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>
                  <Badge bg={doc.status === "Uploaded" ? "success" : "warning"}>
                    {doc.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default StudentDocuments;
