import React, { useEffect, useContext } from "react";
import { logout } from "../utils/request";
import { AppContext } from "../Context";

const Logout = () => {
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const onMount = async () => {
      localStorage.setItem("role", "");
      localStorage.setItem("token", "");
      await logout();
      setUser(false);
    };
    onMount();
  }, []);

  return (
    <div>
      <h3>Logging out</h3>
    </div>
  );
};

export default Logout;
