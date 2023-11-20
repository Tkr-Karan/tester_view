import { useEffect } from "react";
import Loader from "../Atoms/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToTesterData } from "../store/testerSlice";
import "../Stylesheets/TesterView.css";
import { fetchPublishedData } from "../services";
import "./Stylesheets/TesterView.css";

export default function TesterView() {
  const testerData = useSelector((state) => state.tester.testerDataList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchingPublishedData = async () => {
    try {
      const response = await fetchPublishedData();
      dispatch(addToTesterData(response));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchingPublishedData();
  }, []);

  return (
    <div className="tester-block-container">
      <h2>here you give your block test!!</h2>

      <div className="tester-data">
        {testerData && testerData.length > 0 ? (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {" "}
            {testerData.map((test) => {
              const backgroundColor =
                colorMapping[test.blockType] || "lightcoral";
              return (
                <div
                  onClick={() => navigate(`/test/${test._id}`)}
                  className="tester-blocks"
                  key={test._id}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      color: "#4F4A45",
                      width: "100%",
                      textAlign: "end",
                      backgroundColor: backgroundColor,
                      paddingRight: "1rem",
                      paddingBottom: ".2rem",
                    }}
                  >
                    {test.blockType}
                  </div>
                  <h2>{test.title}</h2>
                  <p>{test.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          //   <Loader />
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

const colorMapping = {
  image: "lightcoral",
  video: "lightblue",
  survey: "lightgreen",
};
