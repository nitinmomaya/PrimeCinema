import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../slice/userSlice";

import useFetch from "../utils/useFetch";
import HeroSearch from "./HeroSearch";

const HeroSection = () => {
  const user = useSelector(selectUser);
  console.log("user", user);
  const [searchValue, setSearchValue] = useState("");
  const [backGround, setBackGround] = useState();
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  const { url } = useSelector((state) => state.home);
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.length > 0) {
      navigate(`/search/${searchValue}`);
    }
  };

  useEffect(() => {
    const bground =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBackGround(bground);
  }, [data]);

  const name = user?.name;

  return (
    <>
      <div className="  w-full h-[80vh]  px-80 overflow-x-hidden bg-slate-900  flex justify-center items-center   relative font-display ">
        <div className="w-full h-full bg-black absolute z-20">
          <div className="w-full h-full bg-gradient-to-t from-slate-900  absolute z-50 "></div>
          <img
            src={backGround}
            className="w-full h-full object-cover   "
            alt=""
          />
        </div>
        <div className="flex flex-col items-center absolute justify-center z-30">
          <h1 className="text-4xl text-slate-50 font-semibold">{`Welcome ${name},`}</h1>
          <p className="text-xl py-2 text-slate-100 ">
            Find the latest and greatest Movie and Shows all available on
            PrimeCinema
          </p>

          <HeroSearch
            change={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            submit={handleSearch}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
