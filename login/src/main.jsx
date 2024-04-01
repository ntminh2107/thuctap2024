import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test.jsx";
import SuccessPage from "./success.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/test" Component={Test} />
        <Route path="/success" Component={SuccessPage} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
