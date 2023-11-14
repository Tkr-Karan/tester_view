import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import "../Stylesheets/BlockTest.css";
import VideoControl from "./VideoControl";
import { Analytic } from "../api/AnalyticApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addingImgUrl,
  removeFirstAddNew,
  testedBlockById,
} from "../store/blockSlice";
import { fetchTestedBlockById } from "../services";

export default function BlockTest() {
  const { id } = useParams();
  const test = useSelector((state) => state.block.testedBlocks);
  const imgUrl = useSelector((state) => state.block.blockimageUrl);
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [videoSubmit, setVideoSubmit] = useState(false);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const playerRef = useRef(null);

  const [surveyResponses, setSurveyResponses] = useState({});

  // const handleSurveyInputChange = (questionName, answer) => {
  //   setSurveyResponses((prevResponses) => ({
  //     ...prevResponses,
  //     [questionName]: answer,
  //   }));
  // };

  const handleSurveyInputChange = (questionName, answer, option) => {
    console.log(typeof option);
    if (Array.isArray(option)) {
      setSurveyResponses((prevResponses) => {
        // If the question is already in the responses, update the array
        if (prevResponses.hasOwnProperty(questionName)) {
          const updatedOptions = prevResponses[questionName].includes(answer)
            ? prevResponses[questionName].filter(
                (selectedOption) => selectedOption !== answer
              )
            : [...prevResponses[questionName], answer];

          return {
            ...prevResponses,
            [questionName]: updatedOptions,
          };
        } else {
          // If the question is not in the responses, create a new array
          return {
            ...prevResponses,
            [questionName]: [answer],
          };
        }
      });
    } else {
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        [questionName]: answer,
      }));
    }
  };

  const navigate = useNavigate();

  const handleSelectTime = (start, end) => {
    setStartTime(start);
    setEndTime(end);

    if (playerRef.current) {
      playerRef.current.seekTo(start);
    }

    setVideoSubmit(true);
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
    try {
      const response = await fetchTestedBlockById(blockID);
      dispatch(testedBlockById(response));
      console.log(response);
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchBlockById(id);
  }, [id]);

  const handleImageClick = (src) => {
    if (imgUrl.length < 2) {
      // const selectedImg = [...imgUrl, src];
      dispatch(addingImgUrl(src));
    } else {
      console.log(imgUrl);
      dispatch(removeFirstAddNew(src));
      // selectedImages.shift();
      // setSelectedImages(selectedImages.filter((image) => image !== src));
    }

    // Toggle the selected state of the image
    // if (selectedImages.includes(src)) {
    //   setSelectedImages(selectedImages.filter((image) => image !== src));
    // } else {
    //   setSelectedImages([...selectedImages, src]);
    // }
  };

  const handleTestSubmit = async (type, title, vidUrl) => {
    console.log("test submit!!");
    try {
      const testData = {
        title: title,
        urls: test.data.blockType === "image" ? imgUrl : vidUrl,
        startTime: startTime,
        endTime: endTime,
        blockType: type,
        surveyResponses: surveyResponses,
      };

      console.log(surveyResponses);

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
                  <div
                    key={idx}
                    onClick={() => handleImageClick(image)}
                    style={{ position: "relative" }}
                  >
                    <img src={image} alt="" width={100} height={100} />
                    {imgUrl.includes(image) && (
                      <div
                        className="slct"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 15,
                          border: "1px solid",
                          fontSize: "1.3rem",
                        }}
                      >
                        <i
                          className="fa-solid fa-check"
                          style={{
                            backgroundColor: "lightgreen",
                            padding: ".2rem",
                          }}
                        ></i>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : test.data.blockType === "survey" ? (
            <div>
              {test.data.questionsData.map((question, idx) => {
                return (
                  <div key={idx}>
                    {question.type === "input" && (
                      <div>
                        <p>{question.data}</p>
                        <input
                          type="text"
                          onChange={(e) =>
                            handleSurveyInputChange(
                              question.data,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                    {question.type == "checkbox" && (
                      <div>
                        <p>{question.data.description}</p>{" "}
                        {question.data.options.map((option, idx) => {
                          return (
                            <div key={idx}>
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleSurveyInputChange(
                                    question.data.description,
                                    option,
                                    question.data.options
                                  )
                                }
                              />
                              <label>{option}</label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {question.type == "radio" && (
                      <div>
                        <p>{question.data.description}</p>{" "}
                        {question.data.options.map((option, idx) => {
                          return (
                            <div key={idx}>
                              <input
                                type="radio"
                                name={question.data.description}
                                onChange={() =>
                                  handleSurveyInputChange(
                                    question.data.description,
                                    option
                                  )
                                }
                              />
                              <label>{option}</label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div
                style={{
                  padding: ".8rem",
                  backgroundColor: "grey",
                  borderRadius: "10px",
                  marginTop: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => handleTestSubmit("survey", test.data.title)}
              >
                Submit
                <ToastContainer />
              </div>
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
          {imgUrl.length == 2 && (
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
                onClick={() => handleTestSubmit("image", test.data.title)}
              >
                Submit Test
              </div>
              <ToastContainer />
            </div>
          )}

          {videoSubmit && (
            <div
              style={{
                width: "10rem",
                backgroundColor: "gainsboro",
                padding: "1rem",
                borderRadius: "10px",
                marginTop: "2rem",
                cursor: "pointer",
              }}
              onClick={() =>
                handleTestSubmit(
                  "video",
                  test.data.title,
                  test.data.urls.map((video) => video)
                )
              }
            >
              Submit Test
            </div>
          )}
        </div>
      )}
    </div>
  );
}
