import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loading.css';
import logo from "./logo.png";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Redirect to the login page after 5 seconds
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timeoutId); // Clear the timeout on unmount (cleanup)
  }, [navigate]);

  return (
    <div id="background">
      <div>
        <img id="logo" src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default LoadingPage;
