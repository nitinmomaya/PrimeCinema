import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "../../firebase";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../slice/userSlice";

import Button from "../UI/Button";
import GoogleButton from "../UI/GoogleButton";
import Input from "../UI/Input";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [error, setError] = useState("");

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
        localStorage.removeItem("primeCinemaUser", true);
      }
    });
  }, []);

  const handleLogin = (email, password) => {
    // Sign in an existing user with Firebase
    signInWithEmailAndPassword(auth, email, password)
      // returns  an auth object after a successful authentication
      // userAuth.user contains all our user details
      .then((userAuth) => {
        // store the user's information in the redux state
        dispatch(
          login({
            email: userAuth.user.email,
            name: userAuth.user.displayName,
          })
        );
        navigate("/");
      })
      // display the error if any
      .catch((err) => {
        setError(err.message);
      });
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values, action) => {
        console.log("values:", values);
        handleLogin(values.email, values.password);

        action.resetForm();
      },
    });

  return (
    <>
      <div className="w-screen h-screen bg-login-background bg-cover font-display relative">
        <div className="w-full px-28 flex justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col text-white w-[45%] space-y-6">
            <h1 className="font-semibold text-5xl">
              Looking for Good Movie Recommendation to watch?
            </h1>
            <p className=" text-2xl ">
              Find the latest and greatest Movie and Shows all available on
              PrimeCinema
            </p>
          </div>
          <div className="w-1/3 bg-white rounded-md p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <h1 className="text-neutral-900 font-semibold text-2xl">
                  Login Here
                </h1>
                {error && (
                  <p className="text-red-600 font-display font-semibold">
                    {error}
                  </p>
                )}
              </div>

              <Link to="/signup">
                <button className="px-4 py-2 border-[1px] rounded-md border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white ">
                  Signup
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label={"Email"}
                name={"email"}
                type={"email"}
                value={values.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.email}
                placeholder={"Enter Email"}
              />
              <Input
                label={"Password"}
                name={"password"}
                type={"password"}
                value={values.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.password}
                icon={true}
                placeholder={"Enter Password"}
              />

              <Button name={"Login Now"} />
            </form>
            <GoogleButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
