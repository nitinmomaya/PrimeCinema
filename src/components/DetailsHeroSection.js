import dayjs from "dayjs";
import { lazy, Suspense, useEffect, useState } from "react";
import { FiPlay, FiStar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { noImage } from "../contant";
import useFetch from "../utils/useFetch";

const Genres = lazy(() => import("./Genres"));
const VideoPlayer = lazy(() => import("./VideoPlayer"));

const DetailsHeroSection = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const detailGenres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const imgurl = url?.backdrop + data?.backdrop_path;

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  useEffect(() => {
    toHoursAndMinutes();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full bg-red-700"></div>
      ) : (
        <div className=" w-full flex flex-col relative h-full font-display ">
          <div className="backdrop-img  h-full w-full absolute z-10">
            <div className="opacity-layer bg-gradient-to-t from-slate-900 absolute top-0 w-full h-full z-20"></div>
            <img
              rel="preload"
              as="image"
              className="w-full h-full object-cover"
              src={imgurl}
              alt="bg-img"
            />
          </div>

          <div className="flex sm:flex-row flex-col gap-10 w-full   xl:px-60 px-8 py-32">
            {data?.poster_path ? (
              <div className="relative text-white z-30">
                <img
                  rel="preload"
                  as="image"
                  className="sm:w-80 w-full  rounded-lg"
                  src={url?.backdrop + data?.poster_path}
                />
                <div className="sm:py-2 sm:px-2 p-4 gap-2  font-semibold items-center justify-center flex rounded-tr-md absolute backdrop-blur  bg-slate-900/50 top-0 right-0">
                  <FiStar className="w-4 h-4 fill-white " />
                  {data?.vote_average.toFixed(1)}
                </div>
              </div>
            ) : (
              <img className="sm:w-80 w-full  rounded-lg" src={noImage} />
            )}

            <div className=" w-full backdrop-blur bg-slate-900/70 px-8 py-8 rounded-lg z-30">
              <div className="flex flex-col gap-1 pb-4">
                <h1 className="text-3xl font-semibold text-slate-100">{`${
                  data?.name || data?.title
                } (${dayjs(data?.release_date).format("YYYY")})`}</h1>
                <p className=" text-lg text-slate-400 font-medium">
                  {data?.tagline}
                </p>
              </div>

              <Suspense fallback={<div className="w-8 h-2 bg-slate-50"></div>}>
                <Genres data={detailGenres} />
              </Suspense>

              <div
                className="flex cursor-pointer w-fit gap-2 text-slate-50 bg-black/70 p-4 hover:bg-black/30  rounded-md mt-4  items-center justify-center"
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
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
                      Duration:
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
                {director?.length > 0 && (
                  <div className="flex  gap-2">
                    <h1 className="text-slate-100 font-medium text-md">
                      Director:
                    </h1>
                    <div className="flex flex-wrap">
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

                {writer?.length > 0 && (
                  <div className="flex gap-2">
                    <h1 className="text-slate-100 font-medium text-md">
                      Writer:
                    </h1>
                    <div className="flex-wrap flex">
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
            <Suspense
              fallback={<div className="w-full h-full bg-slate-900"></div>}
            >
              <VideoPlayer
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsHeroSection;
