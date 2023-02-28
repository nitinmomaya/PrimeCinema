import { onAuthStateChanged, auth } from "../../firebase";
import { login } from "../slice/userSlice";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

const authchanged = () => {
  const dispatch = useDispatch();
  return useEffect(() => {
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
        console.log("it worked...");
      } else {
        localStorage.removeItem("primeCinemaUser");
      }
    });
  }, []);
};

export default authchanged;
