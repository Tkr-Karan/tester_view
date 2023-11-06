import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./BlockTest.css";
import VideoControl from "./VideoControl";

export default function BlockTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const playerRef = useRef(null);

  const handleSelectTime = (start, end) => {
    setStartTime(start);
    setEndTime(end);

    if (playerRef.current) {
      playerRef.current.seekTo(start);
      //   playerRef.current.play();
    }
  };

  const handleProgress = (progress) => {
    // Check if the video reached the end time and pause it
    if (progress.playedSeconds >= endTime) {
      if (playerRef.current) {
        playerRef.current.getInternalPlayer().pause();
      }
    }
  };

  const fetchBlockById = async (blockID) => {
    console.log(blockID);
    try {
      const response = await fetch(`/api/published/published-block/${blockID}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setTest(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchBlockById(id);
  }, [id]);

  return (
    <div>
      {test && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{test.data.title}</h2>
          <p>{test.data.description}</p>

          {test.data.blockType === "image" ? (
            <div>
              {test.data.urls.map((image) => {
                return <img src={image} alt="" width={100} height={100} />;
              })}
            </div>
          ) : (
            <div>
              {test.data.urls.map((video) => {
                return (
                  <div>
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
                      Selected Time Range: {startTime} seconds - {endTime}{" "}
                      seconds
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
