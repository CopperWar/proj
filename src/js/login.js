import React, { useState } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./usercontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password_login, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password_login }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login_bg">
      <br />
      <br />
      <h2 className="login_title">Log in</h2>
      <br />

      <form onSubmit={login}>
        <div className="login_ess">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            required
            className="email_box"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            minLength="6"
            maxLength="15"
            required
            className="password_box"
            name="password"
            value={password_login}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <br />
          <br />

          <input type="checkbox" id="Remember" />
          <label htmlFor="Remember"> Remember me</label>
          <br />
          <br />
          <br />

          <input type="submit" className="submit_box" value="Log in" />
          <br />
          <br />

          <label className="register_here_text">
            Don't have an account?{" "}
            <a href="/register" className="register_link">
              Register here
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}
