import dayjs from "dayjs";
import { lazy, Suspense } from "react";
import { FiStar } from "react-icons/fi";

const Genres = lazy(() => import("../components/Genres"));
const MovieCard = ({ posterUrl, title, vote, date, genre, explore }) => {
  return (
    <div
      className={
        explore === true
          ? "w-full sm:w-48 flex-shrink-0 relative font-display"
          : "w-48 flex-shrink-0 relative font-display"
      }
    >
      <div className="w-full flex justify-between ">
        <img
          loading="lazy"
          className="w-full h-max rounded-lg object-cover object-center "
          src={posterUrl}
          alt={title}
        />
      </div>
      <div className=" flex flex-col  text-slate-50 space-y-2 ">
        <div className="py-2 px-2 gap-2 font-semibold items-center justify-center flex rounded-tr-md absolute backdrop-blur  bg-slate-900/50 top-0 right-0">
          <FiStar className="w-4 h-4 fill-white " />
          {vote.toFixed(1)}
        </div>
        <Suspense fallback={<div className="w-8 h-2 bg-slate-50"></div>}>
          <Genres data={genre.slice(0, 1)} />
        </Suspense>
        <div className="text-lg font-semibold">{title}</div>
        <div className="title text-slate-400">
          {dayjs(date).format("MMM D, YYYY")}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
