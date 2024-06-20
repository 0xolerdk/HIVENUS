import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService.js';

const ProtectedComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("You are not logged in");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedComponent;
