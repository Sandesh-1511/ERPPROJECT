import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const Announcements = () => {
  return (
    <>
    <h3 className="mb-4">Announcements</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h5>Announcements</h5>
            <Button size="sm" variant="outline-primary">
              New
            </Button>
          </div>

          <ListGroup>
            <ListGroup.Item>📢 Internal marks due Friday</ListGroup.Item>
            <ListGroup.Item>📢 Faculty meeting at 4 PM</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default Announcements;
