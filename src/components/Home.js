import { useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";

const Home = () => {
  const user = useSelector(selectUser);

  const name = user ? user.name : "";
  return (
    <>
      <h1>{`Welcome ${name},to Prime Cinema`}</h1>
    </>
  );
};

export default Home;
