import React, { useEffect, useState } from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../Components/Login";
import UserList from "../Components/UserList";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
