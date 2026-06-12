import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminRooms from './pages/AdminRooms';
import AdminStudents from './pages/AdminStudents';
import AdminFees from './pages/AdminFees';
import AdminComplaints from './pages/AdminComplaints';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentFees from './pages/StudentFees';
import StudentComplaints from './pages/StudentComplaints';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            {/* Redirect root to admin or student based on role is handled in Layout or AuthContext ideally, but we'll default to login if no path */}
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/rooms" element={<AdminRooms />} />
            <Route path="admin/students" element={<AdminStudents />} />
            <Route path="admin/fees" element={<AdminFees />} />
            <Route path="admin/complaints" element={<AdminComplaints />} />

            {/* Student Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="student/fees" element={<StudentFees />} />
            <Route path="student/complaints" element={<StudentComplaints />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
