import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import CarouselShimmer from "../Shimmer/CarouselShimmer";
import HeroShimmer from "../Shimmer/HeroShimmer";
import useFetch from "../utils/useFetch";
import DetailsHeroSection from "./DetailsHeroSection";
const TopCast = lazy(() => import("./TopCast"));
const Carousel = lazy(() => import("./Carousel"));

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const { data: recommendations, loading: recommendationLoading } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  const { data: similar, loading: similarLoading } = useFetch(
    `/${mediaType}/${id}/similar`
  );
  return (
    <>
      {loading ? (
        <HeroShimmer />
      ) : (
        <>
          <DetailsHeroSection video={data?.results?.[0]} crew={credits?.crew} />
          <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
            <Suspense fallback={<CarouselShimmer />}>
              <TopCast data={credits?.cast} loading={creditsLoading} />
            </Suspense>
            <div>
              <h1 className="text-slate-50 font-semibold text-xl ">
                Recommendation
              </h1>
              <Suspense fallback={<CarouselShimmer />}>
                <Carousel
                  data={recommendations?.results}
                  loading={recommendationLoading}
                  endpoint={mediaType}
                />
              </Suspense>
            </div>
            <div>
              <h1 className="text-slate-50 font-semibold text-xl ">Similar </h1>
              <Suspense fallback={<CarouselShimmer />}>
                <Carousel
                  data={similar?.results}
                  loading={similarLoading}
                  endpoint={mediaType}
                />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
