// // src/components/StudentForm.jsx
// import React from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";

// const StudentForm = () => {
//   return (
//     <Container fluid className="p-4">
//       <h4 className="mb-4">Add / Edit Student</h4>

//       <Form>
//         <Row>
//           <Col xs={12} md={6} className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control placeholder="Enter student name" />
//           </Col>

//           <Col xs={12} md={3} className="mb-3">
//             <Form.Label>Class</Form.Label>
//             <Form.Control placeholder="Class" />
//           </Col>

//           <Col xs={12} md={3} className="mb-3">
//             <Form.Label>Section</Form.Label>
//             <Form.Control placeholder="Section" />
//           </Col>

//           <Col xs={12} md={6} className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" placeholder="Email" />
//           </Col>

//           <Col xs={12} md={6} className="mb-3">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control placeholder="Phone number" />
//           </Col>
//         </Row>

//         <Button variant="success">Submit</Button>
//       </Form>
//     </Container>
//   );
// };

// export default StudentForm;


// src/components/StudentForm.jsx
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const StudentForm = () => {
  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">Add / Edit Student</h4>

      <Form>
        <Row>
          {/* ===== YOUR ORIGINAL CODE (UNCHANGED) ===== */}
          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter student name" />
          </Col>

          <Col xs={12} md={3} className="mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Control placeholder="Class" />
          </Col>

          <Col xs={12} md={3} className="mb-3">
            <Form.Label>Section</Form.Label>
            <Form.Control placeholder="Section" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control placeholder="Phone number" />
          </Col>

          {/* ===== ADDITIONAL STUDENT INFORMATION ===== */}

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>Admission Number</Form.Label>
            <Form.Control placeholder="Admission No" />
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" />
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control placeholder="Father's Name" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Mother's Name</Form.Label>
            <Form.Control placeholder="Mother's Name" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Guardian Contact Number</Form.Label>
            <Form.Control placeholder="Guardian Phone Number" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Guardian Email</Form.Label>
            <Form.Control type="email" placeholder="Guardian Email" />
          </Col>

          <Col xs={12} md={12} className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter full address"
            />
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder="City" />
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control placeholder="State" />
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control placeholder="Pincode" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select>
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Student Status</Form.Label>
            <Form.Select>
              <option value="">Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Upload Student Photo</Form.Label>
            <Form.Control type="file" />
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Label>Upload Birth Certificate</Form.Label>
            <Form.Control type="file" />
          </Col>
        </Row>

        {/* ===== ORIGINAL SUBMIT BUTTON (UNCHANGED) ===== */}
        <Button variant="success">Submit</Button>
      </Form>
    </Container>
  );
};

export default StudentForm;
