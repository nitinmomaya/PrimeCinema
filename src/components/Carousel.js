import dayjs from "dayjs";
import { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiStar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../UI/MovieCard";
import Genres from "./Genres";

const Carousel = ({ data, loading, endpoint }) => {
  const carouselRef = useRef();
  const { url } = useSelector((state) => state.home);

  const navigation = (dir) => {
    const container = carouselRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 40)
        : container.scrollLeft + (container.offsetWidth + 40);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className=" w-full mx-0 my-auto flex justify-between relative">
          <div
            onClick={() => navigation("left")}
            className="md:w-12 md:h-12 md:bg-black/70 md:rounded-full md:flex md:justify-center md:items-center   md:text-slate-50 md:cursor-pointer md:absolute md:left-0  md:z-10 md:top-[30%] hidden"
          >
            <FiArrowLeft className="w-8  h-8 " />
          </div>
          <div
            onClick={() => navigation("right")}
            className="md:w-12 md:h-12 md:bg-black/70 md:rounded-full md:flex md:justify-center md:items-center   md:text-slate-50 md:cursor-pointer md:absolute md:right-0  md:z-10 md:top-[30%] hidden"
          >
            <FiArrowRight className="w-8  h-8 " />
          </div>

          <div
            ref={carouselRef}
            className="flex w-full gap-10   py-8 md:overflow-hidden overflow-y-hidden  carousel items"
          >
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url?.poster + item.poster_path
                : "";
              return (
                <Link
                  key={item.id}
                  to={`/${item.media_type || endpoint}/${item.id}`}
                >
                  <MovieCard
                    posterUrl={posterUrl}
                    title={item?.title || item?.name}
                    vote={item?.vote_average}
                    genre={item?.genre_ids}
                    date={item?.first_air_date || item?.release_date}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
// let d = new Date(2010, 7, 5);
// let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
// let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
// let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
// console.log(`${da}-${mo}-${ye}`);
