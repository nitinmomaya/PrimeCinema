import { useEffect, useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signOut, auth } from "../../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolly, setScrolly] = useState(0);
  const user = JSON.parse(localStorage.getItem("primeCinemaUser"));
  const [isActive, setIsActive] = useState(false);
  const handleState = () => {
    setIsActive(!isActive);
  };

  const [bg, setBg] = useState(true);
  const [navShow, setNavShow] = useState(true);
  const bgValue = `flex justify-between  xl:px-60 px-8 py-4 font-display font items-center w-full ${
    bg ? "backdrop-blur bg-slate-900/25" : "bg-black"
  }`;
  const controlNav = () => {
    // console.log(window.scrollY);

    if (window.scrollY > 300) {
      setBg(false);

      if (window.scrollY > scrolly) {
        setNavShow(false);
      } else {
        setNavShow(true);
      }
    } else {
      setBg(true);
    }
    setScrolly(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNav);

    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [scrolly]);

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
  // "w-full z-50 font-display backdrop-blur bg-slate-900/25 px-40 py-6 flex justify-between items-center fixed"
  return (
    <>
      <div
        className={
          navShow ? "flex flex-col  w-full fixed  justify-end z-50" : "hidden"
        }
      >
        <div className={bgValue}>
          <Link to="/">
            <h1 className="font-display font-semibold text-2xl text-slate-50">
              PrimeCinema
            </h1>
          </Link>
          <ul className="sm:flex sm:items-center md:space-x-12 sm:space-x-4 hidden">
            <Link to="/explore/movie">
              <li className="font-display text-slate-50 font-semibold hover:text-slate-700">
                Movies
              </li>
            </Link>
            <Link to="/explore/tv">
              <li className="font-display text-slate-50 font-semibold hover:text-slate-700">
                TV Shows
              </li>
            </Link>

            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-slate-900  px-4 py-2 rounded font-display font-semibold text-slate-50 hover:bg-slate-900/50 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-slate-900  px-4 py-2 rounded font-display font-semibold text-slate-50 hover:bg-slate-900/50 hover:text-white"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
          <div className="sm:hidden ">
            {isActive ? (
              <button onClick={handleState}>
                <FiX className="w-9 h-9 text-slate-50" />
              </button>
            ) : (
              <button onClick={handleState}>
                <FiAlignJustify className="w-9 h-9 text-slate-50" />
              </button>
            )}
          </div>
        </div>

        <div
          className={
            isActive
              ? "flex py-4 sm:px-24 px-8  backdrop-blur bg-slate-900/25"
              : "hidden"
          }
        >
          <ul className=" sm:hidden flex flex-col space-y-6">
            <Link to="/explore/movie">
              <li className="font-display text-slate-50 font-semibold hover:text-slate-700">
                Movies
              </li>
            </Link>
            <Link to="/explore/tv">
              <li className="font-display text-slate-50 font-semibold hover:text-slate-700">
                TV Shows
              </li>
            </Link>

            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-slate-900  px-4 py-2 rounded font-display font-semibold text-slate-50 hover:bg-slate-900/50 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-slate-900  px-4 py-2 rounded font-display font-semibold text-slate-50 hover:bg-slate-900/50 hover:text-white"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
