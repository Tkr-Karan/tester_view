import { useEffect } from "react";
import Loader from "../Atoms/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToTesterData } from "../store/testerSlice";
import "../Stylesheets/TesterView.css";
import { fetchPublishedData } from "../services";

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

  const goToTest = (id) => {
    console.log(id);

    navigate(`/test/${id}`);
  };

  return (
    <div className="tester-block-container">
      <h2>here you give your block test!!</h2>

      <div className="tester-data">
        {testerData && testerData.length > 0 ? (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {" "}
            {testerData.map((test) => {
              return (
                <div
                  onClick={() => goToTest(test._id)}
                  className="tester-blocks"
                  key={test._id}
                >
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
