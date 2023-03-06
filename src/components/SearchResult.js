import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../UI/MovieCard";
import { fetchAPI } from "../utils/fetchAPI";
import SearchHeroSection from "./SearchHeroSection";
const SearchResult = () => {
  const [data, setData] = useState(null);

  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { searchValue } = useParams();
  const { url } = useSelector((state) => state.home);
  const fetchInitialData = () => {
    setLoading(true);
    fetchAPI(`/search/multi?query=${searchValue}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchAPI(`/search/multi?query=${searchValue}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [searchValue]);

  return (
    <>
      {!loading && data?.results?.length > 0 ? (
        <div className="w-full flex flex-col  font-display bg-slate-900">
          <div>
            <SearchHeroSection data={data} loading={loading} />
            <h1 className="text-slate-50 text-xl  pb-4 bg-slate-900 xl:px-60 px-8 gap-10">
              {`Search ${
                data?.total_results > 1 ? "results" : "result"
              } of '${searchValue}'`}
            </h1>
          </div>
          <InfiniteScroll
            className="w-full flex xl:px-60 px-8 gap-10 bg-slate-900 flex-wrap  justify-between"
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
            loader={<h1>Loading</h1>}
            style={""}
          >
            {data?.results.map((item) => {
              if (item.media_type === "person") return;
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
          </InfiniteScroll>
        </div>
      ) : (
        <div className="resultNotFound">Sorry, Results not found!</div>
      )}
    </>
  );
};

export default SearchResult;
