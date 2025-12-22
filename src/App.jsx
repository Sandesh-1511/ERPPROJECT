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
import FeeCollection from "./pages/dashboards/accoutant/FeeCollection";
import Expenses from "./pages/dashboards/accoutant/Expenses";
import SalaryManagement from "./pages/dashboards/accoutant/SalaryManagement";
import Invoices from "./pages/dashboards/accoutant/Invoices";
import Reports from "./pages/dashboards/accoutant/Reports";
import Receipts from "./pages/dashboards/accoutant/Receipts";
import DueReminders from "./pages/dashboards/accoutant/DueReminders";
import Profile from "./pages/dashboards/accoutant/Profile";
import StudentDashboard from "./pages/dashboards/students/StudentDashboard";
import StudentDocuments from "./pages/dashboards/students/StudentDocuments";
import StudentForm from "./pages/dashboards/students/StudentForm";
import StudentGuardians from "./pages/dashboards/students/StudentGuardians";
import StudentList from "./pages/dashboards/students/StudentList";
import StudentProfile from "./pages/dashboards/students/StudentProfile";
import FeesSection from "./pages/dashboards/students/FeesSection";
import TimetableSection from "./pages/dashboards/students/TimetableSection";
import SyllabusStatus from "./pages/dashboards/students/SyllabusStatus";
import LeaveSection from "./pages/dashboards/students/LeaveSection";
import AttendanceCalendar from "./pages/dashboards/students/AttendanceCalendar";
import LibrarySection from "./pages/dashboards/students/LibrarySection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/office"
          element={
            <ProtectedRoute role="office">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OfficeStaffDashboard />} />
          <Route path="admissions" element={<AdmissionsList />} />
          <Route path="certificates" element={<CertificateRequests />} />
          <Route path="communications" element={<CommunicationsLog />} />
          <Route path="enquiries" element={<EnquiriesList />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/dashboard/principal"
          element={
            <ProtectedRoute role="principal">
              <DashboardLayout />
            </ProtectedRoute>
          }
        ></Route>

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
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountantDashboard />} />
          <Route path="fees" element={<FeeCollection />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="salary" element={<SalaryManagement />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="receipts" element={<Receipts />} />
          <Route path="reminders" element={<DueReminders />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard/>}/>
          <Route path="student-documents" element={<StudentDocuments/>}/>
          <Route path="student-form" element={<StudentForm/>}/>
          <Route path="student-guardians" element={<StudentGuardians/>}/>
          <Route path="student-list" element={<StudentList/>}/>
          <Route path="student-profile" element={<StudentProfile/>}/>
          <Route path="student-fees" element={<FeesSection/>}/>
          <Route path="student-timetable" element={<TimetableSection/>}/>
          <Route path="student-syllabus" element={<SyllabusStatus/>}/>
          <Route path="student-leave" element={<LeaveSection/>}/>
          <Route path="student-attendance" element={<AttendanceCalendar/>}/>
          <Route path="student-library" element={<LibrarySection/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
