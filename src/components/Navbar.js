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
      <div className="w-full z-50 font-display backdrop-blur bg-slate-900/25 px-40 py-6 flex justify-between items-center fixed">
        <h1 className="text-slate-50 font-semibold text-2xl">PrimeCinema</h1>
        <button
          className="px-4 py-2 bg-black  font-medium text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
export default Navbar;
