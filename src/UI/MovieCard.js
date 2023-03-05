import dayjs from "dayjs";
import { FiStar } from "react-icons/fi";
import Genres from "../components/Genres";

const MovieCard = ({ posterUrl, title, vote, date, genre }) => {
  return (
    <div className=" sm:w-48 w-full flex-shrink-0 relative font-display">
      <div className=" w-full  ">
        <img
          loading="lazy"
          className="w-full h-full rounded-lg object-cover object-center "
          src={posterUrl}
          alt={title}
        />
      </div>
      <div className=" flex flex-col text-slate-50 space-y-2 ">
        <div className="py-2 px-2 gap-2 font-semibold items-center justify-center flex rounded-tr-md absolute backdrop-blur  bg-slate-900/50 top-0 right-0">
          <FiStar className="w-4 h-4 fill-white " />
          {vote.toFixed(1)}
        </div>
        <Genres data={genre.slice(0, 1)} />
        <div className="text-lg font-semibold">{title}</div>
        <div className="title text-slate-400">
          {dayjs(date).format("MMM D, YYYY")}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
