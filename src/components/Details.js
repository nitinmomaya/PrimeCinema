import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import Carousel from "./Carousel";
import TrendingCarousel from "./CarouselSections/TrendingCarousel";
import DetailsHeroSection from "./DetailsHeroSection";
import TopCast from "./TopCast";

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
      <DetailsHeroSection video={data?.results?.[0]} crew={credits?.crew} />
      <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
        <TopCast data={credits?.cast} loading={creditsLoading} />
        <div>
          <h1 className="text-slate-50 font-semibold text-xl ">
            Recommendation
          </h1>
          <Carousel
            data={recommendations?.results}
            loading={recommendationLoading}
            endpoint={mediaType}
          />
        </div>
        <div>
          <h1 className="text-slate-50 font-semibold text-xl ">Similar </h1>
          <Carousel
            data={similar?.results}
            loading={similarLoading}
            endpoint={mediaType}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
