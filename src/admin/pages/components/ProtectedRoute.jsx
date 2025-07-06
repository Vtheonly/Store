// src/admin/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../../../../api/supabaseClient";

const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an active session
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // Listen for auth state changes (e.g., login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    // You can replace this with a more sophisticated loading spinner component
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If a session exists, render the child routes. Otherwise, redirect to login.
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;