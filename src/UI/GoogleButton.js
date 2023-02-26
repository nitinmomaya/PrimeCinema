import { useNavigate } from "react-router-dom";
import google from "../Assest/Google-Logo.png";

import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import { auth, signInWithPopup, GoogleAuthProvider } from "../../firebase";
const GoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("result", user);
        dispatch(
          login({
            email: user.email,
            name: user.displayName,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-full flex flex-col mt-6">
        <div className="w-full flex justify-between font-display  items-center">
          <div className="w-full h-[1px] bg-neutral-200"></div>
          <h1 className="px-2">OR</h1>
          <div className="w-full h-[1px] bg-neutral-200"></div>
        </div>
        <button
          onClick={handleGoogleSignin}
          className="w-full flex justify-center items-center px-4 py-4 my-2 border-[1px] border-neutral-200 bg-white font-semibold text-neutral-900 rounded-md hover:bg-neutral-50"
        >
          <img src={google} className="w-6 h-6 mx-2" />
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default GoogleButton;
