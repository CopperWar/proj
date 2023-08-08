import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [contact_no, setcontact_no] = useState("");
  const [gender, setgender] = useState("Male");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register_db(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ contact_no, gender, username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
      setRedirect(true);
    } else {
      alert("registration failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="login_bg">
      <h1 className="login_title">Register</h1>
      <form onSubmit={register_db}>
        <div className="login_ess">
          <label htmlFor="firstname">Username:</label>
          <br />
          <input
            type="text"
            id="firstname"
            required
            className="first_box"
            name="firstname"
            value={username}
            onChange={(ev) => setusername(ev.target.value)}
          />
          <br />
          <br />

          <label>Gender:</label>
          <div className="custom-radio">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(ev) => setgender(ev.target.value)}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div className="custom-radio">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(ev) => setgender(ev.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>

          <div className="custom-radio">
            <input
              type="radio"
              id="others"
              name="gender"
              value="others"
              checked={gender === "other"}
              onChange={(ev) => setgender(ev.target.value)}
            />
            <label htmlFor="others">Other</label>
          </div>
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            placeholder="htmlFor eg. abc@gmail.com"
            required
            className="email_box"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
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
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <br />

          <label htmlFor="Phone no.">Contact number:</label>
          <br />
          <input
            type="tel"
            id="Phone no."
            pattern="[0-9]{10}"
            required
            className="phone_box"
            name="contact"
            value={contact_no}
            onChange={(ev) => setcontact_no(ev.target.value)}
          />
          <br />

          <input type="submit" className="submit_box" value="Register" />
          <br />
          <br />
          <label className="login_here_text">
            Alredy have an account?
            <a href="/login" className="register_link">
               Log in
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}
