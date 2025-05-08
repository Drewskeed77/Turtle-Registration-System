import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import RegisterNewTurtlePage from "./pages/RegisterNewTurtlePage";
import UpdateTurtlePage from "./pages/UpdateTurtlePage";
import UpdateUserPage from "./pages/UpdateUserPage";
import UserDashboardPage from "./pages/UserDashboard";
import HealthCertificatePage from "./pages/HealthCertificatePage";
import UsersDashboard from "./components/UsersDashboard";
import TurtlesDashboard from "./components/TurtlesDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['User', 'Admin', 'Vet']}>
            <UserDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['Admin', 'Vet']}>
            <TurtlesDashboard />
          </ProtectedRoute>
        } />

        <Route path="/manage-users" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <UsersDashboard />
          </ProtectedRoute>
        } />

        <Route path="/register-turtle" element={
          <ProtectedRoute allowedRoles={['Vet', 'Admin']}>
            <RegisterNewTurtlePage />
          </ProtectedRoute>
        } />

        <Route path="/update-turtle" element={
          <ProtectedRoute allowedRoles={['Vet']}>
            <UpdateTurtlePage />
          </ProtectedRoute>
        } />

        <Route path="/update-user" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <UpdateUserPage />
          </ProtectedRoute>
        } />

        <Route path="/health-certificate" element={
          <ProtectedRoute allowedRoles={['Vet']}>
            <HealthCertificatePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
