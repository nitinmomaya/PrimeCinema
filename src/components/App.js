import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "../slice/homeSlice";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import authchanged from "../utils/authchanged";
import Login from "./Login";
const Signup = lazy(() => import("./Signup"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Home = lazy(() => import("./Home"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));
const Error = lazy(() => import("../Error/Error"));
const Details = lazy(() => import("./Details"));
const SearchResult = lazy(() => import("./SearchResult"));
const Explore = lazy(() => import("./Explore"));

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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Navbar />
      </Suspense>
      <Outlet />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Footer />
      </Suspense>
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<h1>Loading..</h1>}>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/:mediaType/:id",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Details />
          </Suspense>
        ),
      },
      {
        path: "/search/:searchValue",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <SearchResult />
          </Suspense>
        ),
      },
      {
        path: "/explore/:mediaType",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Explore />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Signup />
      </Suspense>
    ),
  },
]);

export default App;
