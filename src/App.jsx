// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import OfficeStaffDashboard from "./pages/dashboards/OfficeStaffDashboard";
import PrincipalDashboard from "./pages/dashboards/PrincipalDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import LibrarianDashboard from "./pages/dashboards/LibrarianDashboard";
import AccountantDashboard from "./pages/dashboards/AccountantDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/office"
          element={
            <ProtectedRoute role="office">
              <DashboardLayout>
                <OfficeStaffDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

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
