// SuccessPage.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/")
      .then((res) => {
        if (res.data.Status === "success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  });

  const handleDelete = () => {
    axios
      .get("http://localhost:8080/api/logout")
      .then((res) => {
        (res) => location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            My Awesome App
          </Link>
          <div className="navbar-nav ml-auto">
            <span className="navbar-text mr-3">Hello, {name}!</span>
            <a href="/login" className="nav-link" onClick={handleDelete}>
              Logout
            </a>
          </div>
        </div>
      </nav>
      {auth ? (
        <div className="container mt-5">
          <h1>Welcome, {name}!</h1>
          <p>Login Successful. You are now logged in.</p>
          {/* Add additional content or actions here */}
        </div>
      ) : (
        <div className="container mt-5">
          <h1>{message}</h1>
          <p>
            Cannot authenticate, pls <a href="/login">login </a>
            again
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
