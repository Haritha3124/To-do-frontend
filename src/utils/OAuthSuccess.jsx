// OAuthSuccess.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('user', JSON.stringify({ token }));
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [params, navigate]);

  return <p className="text-center mt-5">Signing you in...</p>;
};

export default OAuthSuccess;
