import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useEffect, useContext} from "react";
import { UserContext } from "./usercontext";

export default function Navigation() {
  const {setUserInfo, userInfo }= useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    setUserInfo(null)
  }

  const username = userInfo?.username
  return (
    <nav>
      <div className="nav-section" id="nav-logo-section">
        <img src={logo} alt="logo" className="logo"></img>
      </div>
      {username && (
        <>
          <div className="links-section" id="nav-about-section">
            <h3>HELLO {username}</h3>
            <Link to="/">ABOUT US</Link>
            <Link to="/">GET IN TOUCH</Link>
            <a onClick={logout}>logout</a>
          </div>
        </>
      )}
      {!username && (
        <>
          <div className="links-section" id="nav-about-section">
            <Link to="/">ABOUT US</Link>
            <Link to="/login">LOG IN</Link>
            <Link to="/register">REGISTER</Link>
            <Link to="/">GET IN TOUCH</Link>
          </div>
        </>
      )}
    </nav>
  );
}
