import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Dashboard/Login/Login";
import Dashboard from "./Dashboard/dashboard/dashboard";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User/user";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("loggedIn")
  );

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("loggedIn"));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Login />} />
          <Route
            exact
            path="/dash"
            element={isLoggedIn === "true" ? <Dashboard /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
