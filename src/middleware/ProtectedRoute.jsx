import { verifyApi } from "@/api/authApi";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");
  // loading | authorized | unauthorized

  useEffect(() => {
    const validate = async () => {
      try {
        await verifyApi();
        setStatus('authorized')
      } catch {
        localStorage.removeItem("token");
        setStatus('unauthorized')
      }
    };
    validate();
  },[]);

  if (status === "loading") {
    return <div></div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
