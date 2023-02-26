import { useNavigate } from "react-router-dom";
import { signOut, auth } from "../../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-full px-28 flex justify-between">
        <h1>PrimeCinema</h1>
        <button
          className="p-8 bg-red-500 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
export default Navbar;
