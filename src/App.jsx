// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Dashboards
import PrincipalDashboard from "./pages/dashboards/PrincipalDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import LibrarianDashboard from "./pages/dashboards/LibrarianDashboard";
import AccountantDashboard from "./pages/dashboards/AccountantDashboard";
import StudentsList from "./pages/dashboards/officestaff/StudentsList";
import AdmissionsList from "./pages/dashboards/officestaff/AdmissionsList";
import CertificateRequests from "./pages/dashboards/officestaff/CertificateRequests";
import EnquiriesList from "./pages/dashboards/officestaff/EnquiriesList";
import CommunicationsLog from "./pages/dashboards/officestaff/CommunicationsLog";
import ReportsPage from "./pages/dashboards/officestaff/ReportsPage";
import NoticesPage from "./pages/dashboards/officestaff/NoticesPage";
import ProfilePage from "./pages/dashboards/officestaff/ProfilePage";
import OfficeDashboard from "./pages/dashboards/officestaff/OfficeDashboard";

// Office Staff Pages


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Office Staff Nested Routes */}
        <Route
          path="/dashboard/office"
          element={
            <ProtectedRoute role="office">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OfficeDashboard/>} />
          <Route path="students" element={<StudentsList />} />
          <Route path="admissions" element={<AdmissionsList />} />
          <Route path="certificates" element={<CertificateRequests />} />
          <Route path="enquiries" element={<EnquiriesList />} />
          <Route path="communications" element={<CommunicationsLog />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Other Role Dashboards (no sub-routes yet) */}
        <Route
          path="/dashboard/principal"
          element={
            <ProtectedRoute role="principal">
              <DashboardLayout>
                <PrincipalDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute role="teacher">
              <DashboardLayout>
                <TeacherDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/librarian"
          element={
            <ProtectedRoute role="librarian">
              <DashboardLayout>
                <LibrarianDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/accountant"
          element={
            <ProtectedRoute role="accountant">
              <DashboardLayout>
                <AccountantDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;