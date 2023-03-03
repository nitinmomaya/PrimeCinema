import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import DetailsHeroSection from "./DetailsHeroSection";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <>
      <DetailsHeroSection video={data?.results?.[0]} crew={credits?.crew} />
    </>
  );
};

export default Details;
