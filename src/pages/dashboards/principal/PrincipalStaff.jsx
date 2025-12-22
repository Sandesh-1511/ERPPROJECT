import { Table } from "react-bootstrap";

const PrincipalStaff = () => (
  <>
    <h4 className="mb-4">Staff</h4>
    <Table bordered responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dr. Anil Sharma</td>
          <td>Teacher</td>
          <td>Commerce</td>
        </tr>
      </tbody>
    </Table>
  </>
);

export default PrincipalStaff;
