import { Link } from "react-router-dom";
import ErrorImage from "../Assest/Not-Found.jpg";
import Button from "../UI/Button";
const Error = () => {
  return (
    <>
      <div className="w-screen h-screen flex-col justify-center items-center flex bg-slate-900">
        <div className="w-120 h-120 flex justify-center items-center flex-col space-y-8">
          <img className="w-100 h-96" src={ErrorImage} />
          <h1 className="text-2xl font-semibold text-slate-50 font-display">
            No Result Found
          </h1>
          <Link to="/">
            <Button name={"Take me Home"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
