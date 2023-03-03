import HeroSection from "./HeroSection";
import TrendingCarousel from "./CarouselSections/TrendingCarousel";
import PopularCarousel from "./CarouselSections/PopularCarousel";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
        <TrendingCarousel />
        <PopularCarousel />
      </div>
    </>
  );
};

export default Home;
