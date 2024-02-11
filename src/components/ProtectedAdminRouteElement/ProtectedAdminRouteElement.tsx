import React from 'react';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedAdminRouteElement = ({ element }: { element: React.ReactNode }) => {
  const location = useLocation();

  const role = useAppSelector((store) => store.user?.user?.role);

  console.log(role);

  if (role === 'ADMIN') {
    return element;
  } else if (role === 'USER') return <Navigate to="/" state={{ from: location }} />;
};
