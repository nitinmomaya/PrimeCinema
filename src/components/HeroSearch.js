import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.length > 0) {
      console.log("searchValue", searchValue);
      navigate(`/search/${searchValue}`);
    }
  };
  console.log(searchValue);
  return (
    <>
      <div className="w-full flex relative rounded-full border-none my-8 ">
        <FiSearch className="w-6 h-6 absolute top-4 te left-6 right-2 text-slate-300 z-50" />
        <input
          className="px-16  py-4 w-full rounded-full backdrop-blur bg-slate-900/25 text-white focus:outline-none"
          type="search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Search movies, show etc..."
          onKeyDown={handleSearch}
        />

        <button
          onClick={() => navigate(`/search/${searchValue}`)}
          className=" bg-slate-900 hover:bg-slate-900/50 px-8 h-full rounded-full absolute -right-1 text-slate-50 font-semibold"
        >
          Search
        </button>
      </div>
    </>
  );
};
export default HeroSearch;
