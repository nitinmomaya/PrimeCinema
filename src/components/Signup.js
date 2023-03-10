import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../../firebase";
import { useFormik } from "formik";
import { lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../slice/userSlice";

const Button = lazy(() => import("../UI/Button"));
const GoogleButton = lazy(() => import("../UI/GoogleButton"));
const Input = lazy(() => import("../UI/Input"));
import InputShimmer from "../Shimmer/InputShimmer";
import ButtonShimmer from "../Shimmer/ButtonShimmer";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values, action) => {
        handleSignup(values.email, values.password, values.name);

        action.resetForm();
      },
    });

  const handleDemo = () => {
    signInWithEmailAndPassword(auth, "recruiter@hireme.com", "123456").then(
      () => {
        dispatch(
          login({
            email: "recruiter@hireme.com",
            name: "123456",
          })
        );
        navigate("/");
      }
    );
  };

  const handleSignup = (email, password, name) => {
    // Create a new user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // Update username
        updateProfile(userAuth.user, {
          displayName: name,
        })
          .then(
            // Dispatch the user information for persistence in the redux state
            dispatch(
              login({
                email: userAuth.user.email,
                name: userAuth.user.displayName,
              })
            )
          )
          .catch((error) => {
            console.log("user not updated");
          });

        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <div
        rel="preload"
        as="image"
        className="w-full  flex xl:flex-row flex-col xl:px-28 sm:px-12 px-8 py-8  justify-between items-center xl:h-screen h-full space-y-6 bg-singup-background bg-cover font-display"
      >
        <div className="flex flex-col text-white xl:w-1/2 w-full  sm:space-y-6 space-y-2">
          <h1 className="font-semibold sm:text-5xl text-xl">
            Experience the New Generation of Watching Movie
          </h1>
          <p className=" sm:text-2xl text-md">
            PrimeCinema comes with the best cinematic experience sign up now and
            get the experience
          </p>
        </div>
        <div className="xl:w-1/3 w-full h-fit bg-white rounded-md sm:p-8 p-6">
          <div className="flex sm:justify-between sm:items-center sm:flex-row flex-col space-y-4 mb-6">
            <div className="flex flex-col">
              <h1 className="text-neutral-900 font-semibold text-2xl">
                Signup Here
              </h1>
              {error && (
                <p className="text-red-600 font-display font-semibold">
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Link to="/login">
                <button className="px-4 py-2 border-[1px] rounded-md border-black text-black font-semibold hover:bg-black hover:text-white ">
                  login
                </button>
              </Link>
              <button
                onClick={handleDemo}
                className="px-4 py-2 border-[1px] rounded-md border-black text-black font-semibold hover:bg-black hover:text-white "
              >
                Demo Login
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Suspense fallback={<InputShimmer />}>
              <Input
                label={"Name"}
                name={"name"}
                type={"text"}
                value={values.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name}
                placeholder={"Enter Name"}
              />
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

              <Button name={"Signup Now"} />
            </Suspense>
          </form>
          <Suspense fallback={<ButtonShimmer />}>
            <GoogleButton />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Signup;
