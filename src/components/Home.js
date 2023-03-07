import { lazy, Suspense } from "react";
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
      <Suspense fallback={<h1>Loading...</h1>}>
        <HeroSection />
      </Suspense>
      <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
        <Suspense fallback={<h1>Loading...</h1>}>
          <TrendingCarousel />
          <PopularCarousel />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
