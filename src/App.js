import "./css/App.css";
import "./css/login.css";
import "./css/register.css";
import Navigation from "./js/navigation";
import Manga from "./js/home_main";
import Register from "./js/register";
import Login from "./js/login";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./js/usercontext.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          index
          element={
            <>
              <Navigation />
              <Manga />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navigation />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navigation />
              <Register />
            </>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
