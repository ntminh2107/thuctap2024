// SuccessPage.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const userName = location.state && location.state.username;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            My Awesome App
          </Link>
          <div className="navbar-nav ml-auto">
            <span className="navbar-text mr-3">Hello, {userName}!</span>
            <a href="" className="nav-link">
              Logout
            </a>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <h1>Welcome, {userName}!</h1>
        <p>Login Successful. You are now logged in.</p>
        {/* Add additional content or actions here */}
      </div>
    </div>
  );
};

export default SuccessPage;
