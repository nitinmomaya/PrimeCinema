import dayjs from "dayjs";
import { FiPlay, FiStar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import Genres from "./Genres";

const DetailsHeroSection = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const detailGenres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <>
      <div className="w-full font-display overflow-hidden">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="relative bg-transparent w-full h-[120vh] ">
            <div className="backdrop-img  h-full w-full absolute z-10">
              <img
                className="w-full h-full object-cover"
                src={url?.backdrop + data?.backdrop_path}
                alt=""
              />
            </div>

            <div className="opacity-layer bg-slate-900/70 absolute z-20 w-full h-full"></div>
            <div className="w-full py-32">
              <div className="flex xl:px-60 px-8  overflow-hidden gap-10 w-full  absolute z-30">
                <div className="left">
                  {data?.poster_path ? (
                    <div className="relative text-white">
                      <img
                        className="w-80 rounded-lg"
                        src={url?.backdrop + data?.poster_path}
                      />
                      <div className="py-2 px-2 gap-2  font-semibold items-center justify-center flex rounded-tr-md absolute backdrop-blur  bg-slate-900/50 top-0 right-0">
                        <FiStar className="w-4 h-4 fill-white " />
                        {data?.vote_average.toFixed(1)}
                      </div>
                    </div>
                  ) : (
                    <img src="" />
                  )}
                </div>

                <div className=" w-full backdrop-blur bg-slate-900/25 px-8 py-8 rounded-lg">
                  <div className="flex flex-col gap-1 pb-4">
                    <h1 className="text-3xl font-semibold text-slate-100">{`${
                      data?.name || data?.title
                    } (${dayjs(data?.release_date).format("YYYY")})`}</h1>
                    <p className=" text-lg text-slate-400 font-medium">
                      {data?.tagline}
                    </p>
                  </div>

                  <Genres data={detailGenres} />

                  <div
                    className="flex cursor-pointer w-fit gap-2 text-slate-50 bg-black/70 p-4 hover:bg-black/30  rounded-md mt-4  items-center justify-center"
                    onClick={() => {
                      //   setShow(true);
                      //   setVideoId(video.key);
                    }}
                  >
                    <FiPlay className="w-6 h-6 fill-white" />
                    <span className="font-semibold ">Watch Trailer</span>
                  </div>

                  <div className="overview flex flex-col gap-1 py-4">
                    <h1 className="text-slate-100 font-semibold text-xl">
                      Overview
                    </h1>
                    <p className="text-md text-slate-300 font-medium">
                      {data?.overview}
                    </p>
                  </div>

                  <div className="flex gap-8 flex-wrap">
                    <div className="flex gap-2">
                      <h1 className="text-slate-100 font-medium text-md">
                        Status:
                      </h1>
                      <p className="text-md text-slate-300 font-medium">
                        {data?.status}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <h1 className="text-slate-100 font-medium text-md">
                        Release Date:
                      </h1>
                      <p className="text-md text-slate-300 font-medium">
                        {dayjs(data?.release_date).format("MMM D, YYYY")}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {data?.runtime ? (
                        <h1 className="text-slate-100 font-medium text-md">
                          Duration:
                        </h1>
                      ) : (
                        <h1 className="text-slate-100 font-medium text-md">
                          Total Episodes:
                        </h1>
                      )}
                      {data?.runtime ? (
                        <p className="text-md text-slate-300 font-medium">
                          {toHoursAndMinutes(data?.runtime)}
                        </p>
                      ) : (
                        <p className="text-md text-slate-300 font-medium">
                          {data?.number_of_episodes}
                        </p>
                      )}
                    </div>
                    <div>
                      {director?.length > 0 && (
                        <div className="flex gap-2">
                          <h1 className="text-slate-100 font-medium text-md">
                            Director:{" "}
                          </h1>
                          <div className="flex gap-2">
                            {director?.map((d, i) => (
                              <p
                                className="text-md text-slate-300 font-medium"
                                key={i}
                              >
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {writer?.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          <h1 className="text-slate-100 font-medium text-md">
                            Writer:
                          </h1>
                          <div className="flex gap-2">
                            {writer?.map((d, i) => (
                              <p
                                className="text-md text-slate-300 font-medium"
                                key={i}
                              >
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsHeroSection;
//  {
//    writer?.length > 0 && (
//      <div className="info">
//        <span className="text bold">Writer: </span>
//        <span className="text">
//          {writer?.map((d, i) => (
//            <span key={i}>
//              {d?.name}
//              {writer?.length - 1 !== i && ", "}
//            </span>
//          ))}
//        </span>
//      </div>
//    );
//  }
