import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Layouts = () => {
  const [time, setTime] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          navigate("/");
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [navigate]);

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
      <h2>Thanks for your time</h2>

      <div>
        <img
          src="https://img.freepik.com/free-vector/thank-you-concept-illustration_114360-12887.jpg?size=626&ext=jpg&ga=GA1.1.1743508807.1700119584&semt=ais"
          alt=""
          width={500}
          height={400}
        />
      </div>

      <p>
        Click here for redirecting &nbsp;
        <Link to="/">home</Link>
        &nbsp; or wait for {time} seconds
      </p>
    </div>
  );
};
