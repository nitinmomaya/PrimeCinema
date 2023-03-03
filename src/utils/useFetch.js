import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetchAPI";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchAPI(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })

      .catch((err) => {
        setLoading(false);
        setError("Something went Wrong");
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
