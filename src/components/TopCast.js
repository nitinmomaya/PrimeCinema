import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";

const TopCast = ({ data, loading }) => {
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
      <h1 className="text-slate-50 font-semibold text-xl ">Top Cast</h1>
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
          {data?.map((credit) => {
            const imgurl = credit?.profile_path
              ? url?.profile + credit?.profile_path
              : "";

            return (
              <div className=" w-48 flex-shrink-0 relative ">
                <div className="w-full flex justify-between ">
                  <img
                    loading="lazy"
                    className="w-full h-full rounded-lg object-cover object-center "
                    src={imgurl}
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-1 pt-4">
                  <h1 className="text-slate-50 font-semibold text-lg">
                    {credit?.name}
                  </h1>
                  <h2 className="text-slate-400 ">{credit?.character}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      ;
    </>
  );
};

export default TopCast;
