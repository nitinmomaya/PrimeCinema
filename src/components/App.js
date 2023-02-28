import React, { useEffect } from "react";
import { fetchAPI } from "../utils/api";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Navbar from "./Navbar";

import authchanged from "../utils/authchanged";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "../slice/homeSlice";

const App = () => {
  const dispatch = useDispatch();
  // check at page load if a user is authenticated

  authchanged();
  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchAPI("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

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
