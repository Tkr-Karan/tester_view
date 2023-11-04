import { useEffect, useState } from "react";
import Loader from "../Atoms/Loader";

export default function TesterView() {
  const [testerData, setTesterData] = useState([]);

  const fetchingPublishedData = async () => {
    await fetch("/api/published/published-data")
      .then((res) => res.json())
      .then((data) => {
        setTesterData(data.result);
      });
  };

  useEffect(() => {
    fetchingPublishedData();
  }, []);

  const handlePublishedData = (data) => {
    console.log(data);
  };

  return (
    <div
      style={{
        width: "100vw",
        height:"100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>here you give your block test!!</h2>

      <div className="tester-data" style={{ width: "95%", height:"100%", alignSelf:"center", display:"flex", justifyContent:"center", alignItems:"center" }}>
        {testerData.length !== 0  ? (
          <div style={{ display: "flex", gap: "2rem", flexWrap:"wrap" }}>
            {" "}
            {testerData.map((test) => {
              return (
                <div
                  onClick={() => handlePublishedData(test)}
                  style={{
                    width:"10rem",
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
          <div style={{width:"100%", height:"100%"}}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
