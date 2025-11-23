
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academics from './pages/Academics';
import Placement from './pages/Placement';
import AITutor from './pages/AITutor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow bg-slate-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              {/* AI Tutor is Free & Open to All */}
              <Route path="/ai-tutor" element={<AITutor />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes (Logged in Users Only) */}
              <Route path="/academics" element={
                <ProtectedRoute>
                  <Academics />
                </ProtectedRoute>
              } />
              <Route path="/placements" element={
                <ProtectedRoute>
                  <Placement />
                </ProtectedRoute>
              } />

              {/* Admin Route */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
