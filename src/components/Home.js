import { lazy, Suspense } from "react";
import CarouselShimmer from "../Shimmer/CarouselShimmer";
import HeroShimmer from "../Shimmer/HeroShimmer";
const HeroSection = lazy(() => import("./HeroSection"));
const TrendingCarousel = lazy(() =>
  import("./CarouselSections/TrendingCarousel")
);
const PopularCarousel = lazy(() =>
  import("./CarouselSections/PopularCarousel")
);
const Home = () => {
  return (
    <>
      <Suspense fallback={<HeroShimmer />}>
        <HeroSection />
      </Suspense>
      <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
        <Suspense fallback={<CarouselShimmer />}>
          <TrendingCarousel />
          <PopularCarousel />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
