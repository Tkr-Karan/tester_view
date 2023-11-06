import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import "./BlockTest.css";
import VideoControl from "./VideoControl";
import { Analytic } from "../api/AnalyticApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlockTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const playerRef = useRef(null);

  //image tested urls
  const [imgUrl, setImgUrl] = useState([]);

  const navigate = useNavigate();

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
        // console.log(data.data);
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

  const handleImageClick = (src) => {
    if (imgUrl.length < 2) {
      const selected = [...imgUrl, src];
      setImgUrl(selected);
    } else {
      console.log(imgUrl);
      toast.error("selection limit reached");
    }
  };

  const handleTestSubmit = async (title) => {
    console.log("test submit!!");

    try {
      const testData = {
        title: title,
        urls: imgUrl,
      };

      const res = await Analytic(testData);
      if (res.success) {
        toast.success("Image survey dded successfully");
        setTimeout(() => {
          return navigate("/");
        }, 2000);
      } else {
        toast.error("Image survey failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div style={{ cursor: "pointer", display: "flex", gap: "2rem" }}>
              {test.data.urls.map((image, idx) => {
                return (
                  <div key={idx} onClick={() => handleImageClick(image)}>
                    <img src={image} alt="" width={100} height={100} />
                  </div>
                );
              })}
            </div>
          ) : (
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
                      Selected Time Range: {startTime} seconds - {endTime}{" "}
                      seconds
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {imgUrl.length === 2 && (
            <div>
              <div
                style={{
                  width: "10rem",
                  backgroundColor: "gainsboro",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginTop: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => handleTestSubmit(test.data.title)}
              >
                Submit Test
              </div>
              <ToastContainer />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
