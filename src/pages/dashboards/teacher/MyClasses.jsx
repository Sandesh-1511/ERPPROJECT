// src/pages/dashboards/teacher/MyClasses.jsx
import React from "react";
import { Card, Table } from "react-bootstrap";

const MyClasses = () => {
  return (
    <>
      <h4 className="mb-3">My Classes</h4>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>B.Com I</td>
                <td>Mathematics</td>
                <td>60</td>
              </tr>
              <tr>
                <td>BBA II</td>
                <td>Statistics</td>
                <td>55</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyClasses;
