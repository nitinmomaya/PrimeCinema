import CarouselSection from "./CarouselSection";

import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="w-full h-full xl:px-60 px-8 py-0 bg-slate-900 font-display">
        <CarouselSection title={"Trending"} />
        <CarouselSection />
        <CarouselSection />
      </div>
    </>
  );
};

export default Home;
