// SuccessPage.jsx

import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const userName = location.state && location.state.username;

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Login Successful. You are now logged in.</p>
      {/* Add additional content or actions here */}
    </div>
  );
};

export default SuccessPage;
