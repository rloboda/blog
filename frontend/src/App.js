import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './pages/MainPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ element }) => {
      return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
      <Router>
          <nav>
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/main">Main</Link></li>
                  {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
              </ul>
          </nav>

          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/" element={<div>Welcome to the home page!</div>} />
              <Route path="/main" element={<ProtectedRoute element={<MainPage />} />} />
          </Routes>
      </Router>
  );
}

export default App;