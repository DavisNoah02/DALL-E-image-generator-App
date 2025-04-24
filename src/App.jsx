import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ImageGenerator from './components/ImageGenerator';
import ForgotPassword from './components/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './App.css';

// Protected route component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Helper wrappers to inject navigation
function LoginWithNav(props) {
  const navigate = useNavigate();
  return (
    <Login
      {...props}
      onRegister={() => navigate("/signup")}
      onForgotPassword={() => navigate("/forgot-password")}
    />
  );
}

function SignupWithNav(props) {
  const navigate = useNavigate();
  return (
    <SignUp
      {...props}
      onLogin={() => navigate("/login")}
      onForgotPassword={() => navigate("/forgot-password")}
    />
  );
}

function App() {
  return (
    <Router>
        <ToastContainer />
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginWithNav />} />
            <Route path="/signup" element={<SignupWithNav />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <ImageGenerator />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;