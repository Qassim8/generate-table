import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); 
  const role = localStorage.getItem("userRole"); 

  if (!token && role !== "admin") {
    return <Navigate to="/login" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
