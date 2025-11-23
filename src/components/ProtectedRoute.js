// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiPrefix } from "../constant.js";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${apiPrefix}/verify`, {
          withCredentials: true, // send cookie along with request
        });
        console.log("Verification response:", res) ;
        if (res.data.status) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.log("Verification failed:", err);
        setIsAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuth === null) return <div>Checking authentication...</div>;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
