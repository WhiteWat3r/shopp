import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { IProtectedRouteElement } from './ProtectedRouteElementTypes';

function ProtectedRouteElement({element, anonymous=false}: IProtectedRouteElement) {
    const location = useLocation();
    const from = location.state?.from || '/';

    const isAuthenticated = useAppSelector((store)=> store.user.isAuthenticated)

    if (anonymous && isAuthenticated) {
        return <Navigate to={ from } />;
      }
    
      if (!anonymous && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}}/>;
      }
      return <>{element}</>
}

export default ProtectedRouteElement
