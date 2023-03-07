import { lazy, Suspense, useState } from "react";
import CarouselShimmer from "../../Shimmer/CarouselShimmer";
import SwitchTabs from "../../UI/SwitchTabs";
import useFetch from "../../utils/useFetch";
const Carousel = lazy(() => import("../Carousel"));

const PopularCarousel = () => {
  const [tab, setTab] = useState("movie");

  const { data, loading } = useFetch(`/${tab}/popular`);

  console.log("POP", data);
  const handleChange = (tab) => {
    setTab(tab === "Movies" ? "movie" : "tv");

    console.log("clicked++ from pop", tab);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-slate-50 text-2xl font-semibold">Popular</h1>
        <SwitchTabs
          items={["Movies", "TV Shows"]}
          onChange={handleChange}
          endPoint={tab}
        />
      </div>

      <Suspense fallback={<CarouselShimmer />}>
        <Carousel data={data?.results} endpoint={tab} loading={loading} />
      </Suspense>
    </>
  );
};

export default PopularCarousel;
