// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import PrincipalDashboard from "./pages/dashboards/principal/PrincipalDashboard";
import TeacherDashboard from "./pages/dashboards/teacher/TeacherDashboard";
import LibrarianDashboard from "./pages/dashboards/librarian/LibrarianDashboard";
import AccountantDashboard from "./pages/dashboards/accoutant/AccountantDashboard";
import MyClasses from "./pages/dashboards/teacher/MyClasses";
import OfficeStaffDashboard from "./pages/dashboards/officestaff/OfficeStaffDashboard";
import AdmissionsList from "./pages/dashboards/officestaff/AdmissionsList";
import CertificateRequests from "./pages/dashboards/officestaff/CertificateRequests";
import CommunicationsLog from "./pages/dashboards/officestaff/CommunicationsLog";
import EnquiriesList from "./pages/dashboards/officestaff/EnquiriesList";
// import NoticesPage from "./pages/dashboards/officestaff/NoticesPage";
import ProfilePage from "./pages/dashboards/officestaff/ProfilePage";
import ReportsPage from "./pages/dashboards/officestaff/ReportsPage";
import StudentsList from "./pages/dashboards/officestaff/StudentsList";
import NoticesPage from "./pages/dashboards/officestaff/NoticesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/office"
          element={
            <ProtectedRoute role="office">
              <DashboardLayout/>
            </ProtectedRoute>
          }
        > 
        <Route index element={<OfficeStaffDashboard/>}/>
          <Route path="admissions" element={<AdmissionsList/>}/>
          <Route path="certificates" element={<CertificateRequests/>}/>
          <Route path="communications" element={<CommunicationsLog/>}/>
          <Route path="enquiries" element={<EnquiriesList/>}/>
          <Route path="notices" element={<NoticesPage/>}/>
          <Route path="reports" element={<ReportsPage/>}/>
          <Route path="students" element={<StudentsList/>}/>
          <Route path="profile" element={<ProfilePage/>}/>

        </Route>

        <Route
          path="/dashboard/principal"
          element={
            <ProtectedRoute role="principal">
              <DashboardLayout/>
            </ProtectedRoute>
          }
        >
        </Route>

        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute role="teacher">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<MyClasses />} />
        </Route>

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
