import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      if (loadUser === false || currentUser === undefined) {
        setLoading(false);
      }
    }

    return () => (mount = false);
  }, [loadUser]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </>
  );
}
