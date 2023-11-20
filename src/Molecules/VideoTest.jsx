import React, { useRef } from "react";
import VideoControl from "../Components/VideoControl";
import ReactPlayer from "react-player";

export const VideoTest = (props) => {
  const {
    test,
    playerRef,
    startTime,
    endTime,
    handleProgress,
    handleSelectTime,
  } = props;

  return (
    <div>
      {test.data.urls.map((video, idx) => {
        return (
          <div key={idx}>
            <ReactPlayer
              url={video}
              width={400}
              height={200}
              controls={true}
              ref={playerRef}
              onProgress={handleProgress}
            />
            <VideoControl onSelectTime={handleSelectTime} />{" "}
            <div>
              Selected Time Range: {startTime} seconds - {endTime} seconds
            </div>
          </div>
        );
      })}
    </div>
  );
};
