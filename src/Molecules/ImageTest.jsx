import React from "react";

export const ImageTest = (props) => {
  const { handleImageClick, imgUrl, test } = props;
  return (
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
  );
};
