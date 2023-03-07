import { auth, signInWithEmailAndPassword } from "../../firebase";
import { useFormik } from "formik";
import { lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../slice/userSlice";
import authchanged from "../utils/authchanged";
const Button = lazy(() => import("../UI/Button"));
const GoogleButton = lazy(() => import("../UI/GoogleButton"));
const Input = lazy(() => import("../UI/Input"));

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  authchanged();

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
      <div
        rel="preload"
        as="image"
        className=" w-full  flex xl:flex-row flex-col xl:px-28 sm:px-12 px-8 py-8  justify-between items-center xl:h-screen h-full space-y-6 bg-login-background bg-cover font-display "
      >
        <div className="flex flex-col text-white xl:w-1/2 w-full  sm:space-y-6 space-y-2">
          <h1 className="font-semibold sm:text-5xl text-xl ">
            Looking for Good Movie Recommendation to watch?
          </h1>
          <p className=" sm:text-2xl text-md">
            Find the latest and greatest Movie and Shows all available on
            PrimeCinema
          </p>
        </div>
        <div className="xl:w-1/3 w-full h-fit bg-white rounded-md sm:p-8 p-6">
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
              <button className="px-4 py-2 border-[1px] rounded-md border-black text-black font-semibold hover:bg-black hover:text-white ">
                Signup
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <Suspense fallback={<h1>Loading</h1>}>
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
            </Suspense>
          </form>
          <Suspense fallback={<h1>Loading..</h1>}>
            <GoogleButton />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Login;
