import { Navigate } from "react-router";
import React from 'react';

export default function AuthRoute({children, user, redirectTo}) {
    if (user.status === 'logging') {  
        return <div>Loading...</div>;
    }
    if (user.status === 'logged') { 
      return <Navigate to={redirectTo} replace />;
    }
    return children;
  }