import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <>
      <div className="w-full gap-2  flex flex-wrap  ">
        {data?.map((g) => {
          if (!genres[g]?.name) return;
          return (
            <div
              key={g}
              className="px-2 py-1 rounded-md bg-black/20 text-slate-50 font-medium text-sm"
            >
              {genres[g]?.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Genres;
