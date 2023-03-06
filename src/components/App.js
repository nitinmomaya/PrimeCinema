import React, { useEffect } from "react";

import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Navbar from "./Navbar";

import authchanged from "../utils/authchanged";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "../slice/homeSlice";
import Footer from "./Footer";
import Error from "../Error/Error";
import Details from "./Details";
import SearchResult from "./SearchResult";
import Explore from "./Explore";
import { fetchAPI } from "../utils/fetchAPI";

const App = () => {
  const dispatch = useDispatch();
  // check at page load if a user is authenticated

  authchanged();
  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
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
  const fetchGenres = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((endPoint) => {
      promises.push(fetchAPI(`/genre/${endPoint}/list`));
    });

    const data = await Promise.all(promises);
    console.log("Data from Promise.all", data);

    data.map(({ genres }) => {
      return genres.map((genre, index) => (allGenres[genre.id] = genre));
    });
    console.log("ALL", allGenres);

    dispatch(getGenres(allGenres));
  };
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/:mediaType/:id", element: <Details /> },
      { path: "/search/:searchValue", element: <SearchResult /> },
      { path: "/explore/:mediaType", element: <Explore /> },
    ],
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
