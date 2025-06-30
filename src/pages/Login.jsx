import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ minWidth: '360px', maxWidth: '420px', width: '100%' }}>
        <h2 className="mb-4 text-center">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Email/Password Form */}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* OR Separator */}
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        {/* OAuth Buttons */}
        <div>
          <button
            type="button"
            className="btn btn-outline-danger w-100 mb-2"
            onClick={() => handleOAuthLogin('google')}
          >
            <i className="bi bi-google me-2"></i> Sign in with Google
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => handleOAuthLogin('github')}
          >
            <i className="bi bi-github me-2"></i> Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
