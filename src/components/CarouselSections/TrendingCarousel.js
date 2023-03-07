import { lazy, Suspense, useState } from "react";
import CarouselShimmer from "../../Shimmer/CarouselShimmer";
import SwitchTabs from "../../UI/SwitchTabs";
import useFetch from "../../utils/useFetch";
const Carousel = lazy(() => import("../Carousel"));

const TrendingCarousel = () => {
  const [tab, setTab] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${tab}`);

  console.log("POP", data);
  const handleChange = (tab) => {
    setTab(tab === "Day" ? "day" : "week");

    console.log("clicked++", tab);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-slate-50 text-2xl font-semibold">Trending</h1>
        <SwitchTabs
          items={["Day", "Week"]}
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

export default TrendingCarousel;
