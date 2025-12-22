import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

const CourseProgress = () => {
  const courses = [
    { name: "Accounting", progress: 70 },
    { name: "Business Studies", progress: 45 },
  ];

  return (
    <>
    <h3 className="mb-4">Course Progress</h3>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Progress</h5>
          {courses.map((c, i) => (
            <div key={i} className="mb-3">
              <div className="d-flex justify-content-between">
                <span>{c.name}</span>
                <span>{c.progress}%</span>
              </div>
              <ProgressBar now={c.progress} />
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default CourseProgress;
