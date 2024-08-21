/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from "react-router-dom";
import  { ReactNode } from "react";

interface ProtectedProps {
  isSignedIn: boolean;
  children: ReactNode;
}

const Protected = ({ isSignedIn, children }: ProtectedProps) => {
  return (
    <div>
      {isSignedIn ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Protected;