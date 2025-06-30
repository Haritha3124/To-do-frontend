import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import OAuthSuccess from './utils/OAuthSuccess';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to TodoApp</h2>} />
          <Route path="/dashboard" element={ <Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
