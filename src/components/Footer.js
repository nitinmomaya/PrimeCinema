import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-slate-900 h-1/2 w-full flex flex-wrap flex-col sm:flex-row justify-between items-start sm:px-24 px-8 py-8 mt-auto">
        <div className="py-4">
          <ul>
            <p className=" font-display text-slate-50 font-bold text-2xl pb-4 ">
              Product
            </p>

            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              About Us
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Contact Us
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              ApnaMart Stories
            </li>
          </ul>
        </div>
        <div className="py-4">
          <ul>
            <p className=" font-display text-slate-50 font-bold text-2xl pb-4 ">
              Resources
            </p>

            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Case Studies
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Blog
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Industries Tools
            </li>
          </ul>
        </div>
        <div className="py-4">
          <ul>
            <p className=" font-display text-slate-50 font-bold text-2xl pb-4 ">
              Policy
            </p>

            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Term of Use
            </li>

            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Privacy
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              SiteMap
            </li>
          </ul>
        </div>
        <div className="py-4">
          <ul>
            <p className=" font-display text-slate-50 font-bold text-2xl pb-4 ">
              Social
            </p>

            <Link to="https://www.instagram.com/nitinmomaya/">
              <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
                Instagram
              </li>
            </Link>

            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Twitter
            </li>
            <li className="font-display text-slate-400 text-md pb-2 font-semibold hover:text-slate-600 cursor-pointer">
              Youtube
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  py-4 bg-slate-900">
        <h1 className=" text-slate-50 font-semibold font-display">
          © 2023 All rights reserved | Build with ❤ by
          <span className="hover:text-slate-600 font-semibold cursor-pointer font-display mx-1">
            Nitin Momaya
          </span>
        </h1>
      </div>
    </>
  );
};

export default Footer;
