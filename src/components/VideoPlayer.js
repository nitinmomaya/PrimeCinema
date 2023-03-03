import React from "react";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div
      className={` w-full h-full flex justify-center items-center  fixed top-0 left-0 opacity-0  ${
        show ? "opacity-100 transform scale-100 z-40" : ""
      } `}
    >
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-blur "
        onClick={hidePopup}
      ></div>
      <div className="w-3/4 relative aspect-video mt-20">
        <div
          className="absolute -top-8 cursor-pointer right-0"
          onClick={hidePopup}
        >
          <FiX className="w-8 h-8 text-white" />
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
