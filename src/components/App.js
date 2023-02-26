import React, { useEffect } from "react";

import { createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Navbar from "./Navbar";
import { onAuthStateChanged, auth } from "../../firebase";
import { login, logout } from "../slice/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        console.log(userAuth);
        dispatch(
          login({
            email: userAuth.email,
            name: userAuth.displayName,
          })
        );
        localStorage.setItem("primeCinemaUser", true);
      } else {
        // dispatch(logout());
        localStorage.removeItem("primeCinemaUser");
      }
    });
  }, [Home, Login]);
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default App;
