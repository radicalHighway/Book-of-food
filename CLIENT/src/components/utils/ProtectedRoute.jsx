import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoute({children, user, redirectTo}) {
  if (user.status === 'logging') {
    return <div>Loading...</div>;
  } 
  if ( user.status !== 'logged') {
    return <Navigate to={redirectTo} replace />;
  }
    return children
  
}