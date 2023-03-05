import useFetch from "../utils/useFetch";
import HeroSearch from "./HeroSearch";

const SearchHeroSection = ({ bground }) => {
  const { data, loading } = useFetch("/movie/upcoming");

  return (
    <>
      <div className="  w-full h-[50vh]   xl:px-60 px-8  overflow-hidden bg-slate-900  flex justify-center items-center   relative font-display ">
        <div className="w-full h-full  bg-slate-900 absolute z-20">
          <div className="w-full h-full  bg-gradient-to-t from-slate-900  absolute z-50 "></div>
          {!loading && (
            <img
              loading="lazy"
              src={bground}
              className="w-full h-full object-cover"
              alt="hero-image"
            />
          )}
        </div>
        <div className=" xl:px-40 sm:px-20 px-8 flex flex-col items-center absolute justify-center z-30">
          <p className="sm:text-4xl text-xl text-center text-slate-50 font-semibold">
            Search any Movie and Shows all available on PrimeCinema
          </p>

          <HeroSearch />
        </div>
      </div>
    </>
  );
};

export default SearchHeroSection;