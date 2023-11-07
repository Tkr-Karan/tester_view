import { useEffect } from "react";
import Loader from "../Atoms/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToTesterData } from "../store/testerSlice";

export default function TesterView() {
  const testerData = useSelector((state) => state.tester.testerDataList);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchingPublishedData = async () => {
    try {
      const response = await fetch("/api/published/published-data");
      const data = await response.json();

      data.result.forEach((blocks) => {
        dispatch(addToTesterData(blocks));
      });
    } catch (error) {
      console.log(error);
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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>here you give your block test!!</h2>

      <div
        className="tester-data"
        style={{
          width: "95%",
          height: "100%",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {testerData.length >= 1 ? (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {" "}
            {testerData.map((test) => {
              return (
                <div
                  onClick={() => goToTest(test._id)}
                  style={{
                    width: "10rem",
                    boxShadow: "3px 3px 5px grey",
                    backgroundColor: "lightseagreen",
                    borderRadius: "20px",
                    padding: "1rem",
                    cursor: "pointer",
                  }}
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
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
