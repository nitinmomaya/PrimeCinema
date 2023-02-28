import { FiSearch } from "react-icons/fi";

const HeroSearch = ({ change, value }) => {
  console.log(value);
  return (
    <>
      <form className="w-full flex relative rounded-full border-none my-8 ">
        <FiSearch className="w-6 h-6 absolute top-4 te left-6 right-2 text-slate-300 z-50" />
        <input
          className="px-16  py-4 w-full rounded-full backdrop-blur bg-slate-900/25 text-white focus:outline-none"
          type="search"
          onChange={change}
          value={value}
          placeholder="Search movies, show etc..."
        />

        <button className=" bg-black px-8 h-full rounded-full absolute -right-2 text-slate-50 font-semibold">
          Search
        </button>
      </form>
    </>
  );
};
export default HeroSearch;
