import { Navigate } from 'react-router-dom';
import { IProtectedProps } from '../Utils/Interface/Interface';

const Protected = ({ isSignedIn, children }: IProtectedProps) => {
  return <div>{isSignedIn ? children : <Navigate to="/login" />}</div>;
};

export default Protected;
