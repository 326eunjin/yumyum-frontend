import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loading.css';
import loadinglogo from "./loadinglogo.png";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Redirect to the login page after 5 seconds
      navigate('/home');
    }, 5000);

    return () => clearTimeout(timeoutId); // Clear the timeout on unmount (cleanup)
  }, [navigate]);

  return (
    <div id="background">
        <img id="loadinglogo" src={loadinglogo} alt="Logo" />
    </div>
  );
};

export default LoadingPage;
