// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import PrincipalDashboard from "./pages/dashboards/principal/PrincipalDashboard";
import TeacherDashboard from "./pages/dashboards/teacher/TeacherDashboard";
import LibrarianDashboard from "./pages/dashboards/librarian/LibrarianDashboard";
import AccountantDashboard from "./pages/dashboards/accoutant/AccountantDashboard";
import OfficeStaffDashboard from "./pages/dashboards/officestaff/OfficeStaffDashboard";
import AdmissionsList from "./pages/dashboards/officestaff/AdmissionsList";
import CertificateRequests from "./pages/dashboards/officestaff/CertificateRequests";
import CommunicationsLog from "./pages/dashboards/officestaff/CommunicationsLog";
import EnquiriesList from "./pages/dashboards/officestaff/EnquiriesList";
import ProfilePage from "./pages/dashboards/officestaff/ProfilePage";
import ReportsPage from "./pages/dashboards/officestaff/ReportsPage";
import StudentsList from "./pages/dashboards/officestaff/StudentsList";
import NoticesPage from "./pages/dashboards/officestaff/NoticesPage";
import Books from "./pages/dashboards/librarian/Books";
import IssueBooks from "./pages/dashboards/librarian/IssueBooks";
import Members from "./pages/dashboards/librarian/Members";
import Reports from "./pages/dashboards/librarian/Reports";
import PrincipalReports from "./pages/dashboards/principal/PrincipalReports";
import PrincipalStaff from "./pages/dashboards/principal/PrincipalStaff";
import TeacherProfileCard from "./pages/dashboards/teacher/TeacherProfileCard";
import TeacherStats from "./pages/dashboards/teacher/TeacherStats";
import TimetableSection from "./pages/dashboards/teacher/TimetableSection";
import CourseProgress from "./pages/dashboards/teacher/CourseProgress";
import AttendanceSummary from "./pages/dashboards/teacher/AttendanceSummary";
import AssignmentModule from "./pages/dashboards/teacher/AssignmentModule";
import PerformanceAnalytics from "./pages/dashboards/teacher/PerformanceAnalytics";
import Announcements from "./pages/dashboards/teacher/Announcements";
import FeeCollection from "./pages/dashboards/accoutant/FeeCollection";
import Expenses from "./pages/dashboards/accoutant/Expenses";
import SalaryManagement from "./pages/dashboards/accoutant/SalaryManagement";
import Invoices from "./pages/dashboards/accoutant/Invoices";
import DueReminders from "./pages/dashboards/accoutant/DueReminders";
import AccountantProfile from "./pages/dashboards/accoutant/AccoutantProfile";
import Receipts from "./pages/dashboards/accoutant/Receipts";
import StudentDashboard from "./pages/dashboards/students/StudentDashboard";
import StudentDocuments from "./pages/dashboards/students/StudentDocuments";
import StudentGuardians from "./pages/dashboards/students/StudentGuardians";
import StudentForm from "./pages/dashboards/students/StudyMaterialSection";
import StudentProfile from "./pages/dashboards/students/StudentProfile";
import FeesSection from "./pages/dashboards/students/FeesSection";
import SyllabusStatus from "./pages/dashboards/students/SyllabusStatus";
import LeaveSection from "./pages/dashboards/students/LeaveSection";
import AttendanceCalendar from "./pages/dashboards/students/AttendanceCalendar";
import LibrarySection from "./pages/dashboards/students/LibrarySection";
import StudyMaterialSection from "./pages/dashboards/students/StudyMaterialSection";
import MyProfile from "./pages/MyProfile";
import Student_List from "./pages/dashboards/teacher/Student_List";
import PrincipalStudents from "./pages/dashboards/principal/PrincipalStudents";
import PrincipalFees from "./pages/dashboards/principal/PrincipalFees";
import PrincipalExams from "./pages/dashboards/principal/PrincipalExams";
import PrincipalAcademic from "./pages/dashboards/principal/PrincipalAcademic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Common Profile Page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<MyProfile />} />
        </Route>

        {/* OfficeStaffDashboard */}
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

        {/* Principal */}
        <Route
          path="/dashboard/principal"
          element={
            <ProtectedRoute role="principal">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PrincipalDashboard />} />
          <Route path="students" element={<PrincipalStudents />} />
          <Route path="fees" element={<PrincipalFees />} />
          <Route path="exams" element={<PrincipalExams />} />
          <Route path="academic" element={<PrincipalAcademic />} />
          <Route path="staff" element={<PrincipalStaff />} />
          <Route path="reports" element={<PrincipalReports />} />
          <Route path="principal-profile" element={<MyProfile />} />
        </Route>

        {/* Teacher */}
        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute role="teacher">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="teacher-profile-card" element={<TeacherProfileCard />} />
          <Route path="teacher-stats" element={<TeacherStats />} />
          <Route path="timetable-section" element={<TimetableSection />} />
          <Route path="courses-progress" element={<CourseProgress />} />
          <Route path="attendance-summary" element={<AttendanceSummary />} />
          <Route path="assignment-summary" element={<AssignmentModule />} />
          <Route
            path="performance-analysis"
            element={<PerformanceAnalytics />}
          />
          <Route path="annoucement" element={<Announcements />} />
          <Route path="student-list" element={<Student_List />} />
        </Route>

        {/* Librarian */}
        <Route
          path="/dashboard/librarian"
          element={
            <ProtectedRoute role="librarian">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LibrarianDashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="issue" element={<IssueBooks />} />
          <Route path="members" element={<Members />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Accountant */}
        <Route
          path="/dashboard/accounts_staff"
          element={
            <ProtectedRoute role="accounts_staff">
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
          <Route path="profile" element={<MyProfile />} />
        </Route>

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute role="student">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="student-documents" element={<StudentDocuments />} />
          <Route
            path="student-StudyMaterialSection"
            element={<StudyMaterialSection />}
          />
          <Route path="student-guardians" element={<StudentGuardians />} />
          <Route path="student-profile" element={<StudentProfile />} />
          <Route path="student-fees" element={<FeesSection />} />
          <Route path="student-timetable" element={<TimetableSection />} />
          <Route path="student-syllabus" element={<SyllabusStatus />} />
          <Route path="student-leave" element={<LeaveSection />} />
          <Route path="student-attendance" element={<AttendanceCalendar />} />
          <Route path="student-library" element={<LibrarySection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
