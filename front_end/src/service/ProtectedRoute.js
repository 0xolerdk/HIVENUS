import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from './logRegLogic.js';

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = UserService.isAuthenticated();


  useEffect(() => {

    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedComponent;
