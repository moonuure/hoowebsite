import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const SomeComponent = () => {
  const { user, userRole } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user ? user.email : "Guest"}!</h1>
      <p>Your role is: {userRole || "No role assigned"}</p>
    </div>
  );
};

export default SomeComponent;
