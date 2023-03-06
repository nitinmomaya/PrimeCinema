import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { sortByData } from "../contant";
import MovieCard from "../UI/MovieCard";
import { fetchAPI } from "../utils/fetchAPI";
import useFetch from "../utils/useFetch";

let filters = {};

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchAPI(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchAPI(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res?.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (items, action) => {
    if (action?.name === "sortby") {
      setSortby(items);
      if (action?.action !== "clear") {
        filters.sort_by = items?.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action?.name === "genres") {
      setGenre(items);
      if (action?.action !== "clear") {
        let genreId = items?.map((g) => g?.id);
        console.log("GENREID", genreId);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters?.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };
  return (
    <>
      <div className="w-full xl:px-60 px-8 py-4 flex flex-col pt-20 bg-slate-900 font-display">
        <div className="flex w-full sm:flex-row flex-col sm:justify-between py-8">
          <div className="text-slate-50 text-xl font-semibold w-full">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="flex sm:flex-row flex-col gap-2 w-full justify-end py-4 sm:py-0">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option?.name}
              getOptionValue={(option) => option?.id}
              onChange={onChange}
              placeholder="Select genres"
              className="w-full"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortByData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="w-full"
            />
          </div>
        </div>
        {loading && <h1>Loading..</h1>}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="w-full flex  gap-10 bg-slate-900 flex-wrap  justify-between"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<h1>Loading..</h1>}
              >
                {data?.results?.map((item) => {
                  if (item.media_type === "person") return;
                  const posterUrl = item?.poster_path
                    ? url?.poster + item.poster_path
                    : "";
                  return (
                    <Link
                      key={item.id}
                      to={`/${item.media_type || mediaType}/${item.id}`}
                    >
                      <MovieCard
                        key={item.id}
                        posterUrl={posterUrl}
                        title={item?.title || item?.name}
                        vote={item?.vote_average}
                        genre={item?.genre_ids}
                        date={item?.first_air_date || item?.release_date}
                        explore={true}
                      />
                    </Link>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <div>Sorry, Results not found!</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Explore;
