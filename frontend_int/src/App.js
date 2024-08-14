import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LeaderDashboard from './pages/LeaderDashboard';
import MemberDashboard from './pages/MemberDashboard';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar'; 
import Task from './Components/Task';
import Progress from './Components/Progress';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
}

const AuthRoutes = () => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = Boolean(user);
  const role = user?.role;

  return (
    <>
      {/* Display Navbar only for non-dashboard pages */}
      {!isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to={`/${role === 'ADMIN' ? 'leader-dashboard' : 'member-dashboard'}`} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to={`/${role === 'ADMIN' ? 'leader-dashboard' : 'member-dashboard'}`} /> : <SignUp />
          }
        />
        <Route
          path="/leader-dashboard"
          element={
            isAuthenticated && role === 'ADMIN' ? <LeaderDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/member-dashboard"
          element={
            isAuthenticated && role === 'USER' ? <MemberDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/task" element={isAuthenticated ? <Task /> : <Navigate to="/login" />} />
        <Route path="/progress" element={isAuthenticated ? <Progress /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
