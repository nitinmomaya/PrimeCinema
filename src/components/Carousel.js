import { lazy, Suspense, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noImage from "../Assest/NoImage.png";
const MovieCard = lazy(() => import("../UI/MovieCard"));

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
                : noImage;
              return (
                <Link
                  key={item.id}
                  to={`/${item.media_type || endpoint}/${item.id}`}
                >
                  <Suspense
                    fallback={<div className="w-40 h-28 bg-slate-500"></div>}
                  >
                    <MovieCard
                      posterUrl={posterUrl}
                      title={item?.title || item?.name}
                      vote={item?.vote_average}
                      genre={item?.genre_ids}
                      date={item?.first_air_date || item?.release_date}
                    />
                  </Suspense>
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
