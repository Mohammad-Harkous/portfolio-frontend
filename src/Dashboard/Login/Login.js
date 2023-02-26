import React, { useState } from "react";
import "./Login.css";
import loginProfile from "../images/a.png";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    
    fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if ((data.status = 201)) {
          alert("login successful");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/dash";
        }
      });
  }

  return (
    <div className="loginMain">
      <div className="loginSubMain">
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="loginImgs">
              <div className="loginContainerImage">
                <img src={loginProfile} alt="profile" className="loginProfile" />
              </div>
            </div>
            <div>
              <h1>Login Page</h1>
              <div className="inputArea">
                
                <input
                  type="text"
                  placeholder="Enter email"
                  className="loginName"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-second-input">
            
                <input
                  type="password"
                  placeholder="Enter password"
                  className="loginName"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginButton">
                <button className="LoginButton">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
