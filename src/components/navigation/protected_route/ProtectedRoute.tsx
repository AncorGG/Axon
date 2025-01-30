import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const { children } = props;
  const isAuthenticated = sessionStorage.getItem("username");

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/user/login" replace />
  );
}

export default ProtectedRoute;
