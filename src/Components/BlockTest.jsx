import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import './BlockTest.css';

export default function BlockTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

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
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
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
                  <ReactPlayer
                    url={video}
                    width={400}
                    height={200}
                    controls={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
