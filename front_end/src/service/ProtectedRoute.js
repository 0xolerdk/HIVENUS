import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import UserService from './logRegLogic.js';

const ProtectedComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("You are not logged in");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedComponent;
