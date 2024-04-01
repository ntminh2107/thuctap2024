import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/login", values)
      .then((res) => {
        navigate("/success", { state: { username: values.username } });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            My Awesome App
          </a>
        </div>
      </div>
      <div className="full-screen-bg bg-gray d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card  position-relative">
                <div className="card-body">
                  <h5 className="card-title text-center">Login</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setValues({ ...values, username: e.target.value })
                        }
                        className="form-control text-center"
                        id="username"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        type="password"
                        className="form-control text-center"
                        id="password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                    <p className="text-center mt-3">
                      Don't have an account? <a href="/signup">Register here</a>
                      .
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
