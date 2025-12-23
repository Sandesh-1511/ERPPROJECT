// src/components/StudyMaterialSection.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudyMaterialSection = () => {
  // Mock data for study materials
  const studyMaterials = [
    {
      id: 1,
      topic: "Numbers and Place Value",
      type: "PDF",
      status: "unlocked",
      downloadable: true,
      url: "#",
    },
    {
      id: 2,
      topic: "Addition and Subtraction",
      type: "Video",
      status: "unlocked",
      downloadable: false,
      url: "#",
    },
    {
      id: 3,
      topic: "Geometry Basics",
      type: "PDF",
      status: "locked",
      downloadable: false,
      unlockCondition: "Complete previous topic",
    },
    {
      id: 4,
      topic: "Reading Comprehension",
      type: "PDF",
      status: "unlocked",
      downloadable: true,
      url: "#",
    },
    {
      id: 5,
      topic: "Grammar: Nouns and Verbs",
      type: "Video",
      status: "unlocked",
      downloadable: false,
      url: "#",
    },
    {
      id: 6,
      topic: "Science: Plants and Animals",
      type: "PDF",
      status: "locked",
      downloadable: false,
      unlockCondition: "Teacher will unlock soon",
    },
  ];

  // Mock assignments
  const assignments = [
    {
      id: 1,
      title: "Math Worksheet - Week 1",
      dueDate: "Dec 25, 2025",
      status: "pending",
      downloadable: true,
      url: "#",
    },
    {
      id: 2,
      title: "English Story Writing",
      dueDate: "Dec 28, 2025",
      status: "submitted",
      downloadable: true,
      url: "#",
    },
  ];

  const getIcon = (type) => {
    if (type === "PDF") return "📄";
    if (type === "Video") return "🎥";
    return "📎";
  };

  const getStatusBadge = (status) => {
    if (status === "unlocked") {
      return <span className="badge bg-success">🔓 Unlocked</span>;
    }
    return <span className="badge bg-secondary">🔒 Locked</span>;
  };

  const handleDownload = (url) => {
    // In real app: trigger download or open in new tab
    alert("Downloading file...");
  };

  const handleView = (url) => {
    // In real app: open modal or new tab
    alert("Opening file for viewing...");
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">📚 Study Material / Learning Section</h5>
      </div>
      <div className="card-body">

        {/* === Assignments Section === */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary mb-3">📝 Assignments</h6>
          {assignments.length === 0 ? (
            <p className="text-muted">No assignments available.</p>
          ) : (
            <div className="list-group">
              {assignments.map((item) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="me-2">
                    <div className="fw-bold">{item.title}</div>
                    <small className="text-muted">Due: {item.dueDate}</small>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleView(item.url)}
                    >
                      View
                    </button>
                    {item.downloadable && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleDownload(item.url)}
                      >
                        Download
                      </button>
                    )}
                    {item.status === "submitted" && (
                      <span className="badge bg-info ms-2">Submitted</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === Study Materials === */}
        <div>
          <h6 className="fw-bold text-secondary mb-3">📘 Topic-wise Study Material</h6>
          {studyMaterials.length === 0 ? (
            <p className="text-muted">No study materials available.</p>
          ) : (
            <div className="row">
              {studyMaterials.map((item) => (
                <div className="col-12 col-md-6 mb-3" key={item.id}>
                  <div className="card h-100 border">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-1">{getIcon(item.type)} {item.topic}</h6>
                        {getStatusBadge(item.status)}
                      </div>

                      {item.status === "locked" ? (
                        <p className="text-muted small mb-2">
                          <em>{item.unlockCondition || "Complete prerequisites to unlock"}</em>
                        </p>
                      ) : (
                        <div className="mt-auto d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => handleView(item.url)}
                            disabled={!item.url}
                          >
                            View
                          </button>
                          {item.downloadable && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleDownload(item.url)}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialSection;