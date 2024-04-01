import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Alert } from "bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/signup", values) // Note: Use http:// instead of just localhost
      .then((res) => {
        if (res.data.Status == "Success") {
          navigate("/login");
        } else {
          alert("error");
        }
      })
      .catch((err) => console.error(err)); // Use catch for error handling
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-center">Signup</h5>
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    className="form-control text-center"
                    id="name"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className="form-control text-center"
                    id="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control text-center"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary btn-block ">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
