import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./SurveyTest.css";

export const SurveyTest = (props) => {
  const { handleTestSubmit, handleSurveyInputChange, test } = props;

  console.log(test);
  return (
    <div className="survey-questions">
      {test.data.questionsData.map((question, idx) => {
        const currentQuestionNumber = idx + 1;
        return (
          <div key={idx}>
            {question.type === "input" && (
              <div className="input-ques">
                <div className="num-and-ques">
                  <p className="question-num"> {currentQuestionNumber}:</p>
                  <p className="ques-desc">{question.data}</p>
                </div>
                <input
                  style={{ width: "100%", height: "2rem" }}
                  type="text"
                  onChange={(e) =>
                    handleSurveyInputChange(question.data, e.target.value)
                  }
                  placeholder="please fill the answer"
                  required
                />
              </div>
            )}

            {question.type == "checkbox" && (
              <div className="check-ques-and-options">
                <div className="num-and-ques">
                  <p className="question-num"> {currentQuestionNumber}:</p>
                  <p className="check-ques">{question.data.description}</p>{" "}
                </div>
                {question.data.options.map((option, idx) => {
                  return (
                    <div className="check-options" key={idx}>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleSurveyInputChange(
                            question.data.description,
                            option,
                            question.data.options
                          )
                        }
                        required={true}
                      />
                      <label>{option}</label>
                    </div>
                  );
                })}
              </div>
            )}
            {question.type == "radio" && (
              <div className="check-ques-and-options">
                <div className="num-and-ques">
                  <p className="question-num"> {currentQuestionNumber}:</p>
                  <p className="check-ques">{question.data.description}</p>{" "}
                </div>
                {question.data.options.map((option, idx) => {
                  return (
                    <div className="check-options" key={idx}>
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
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <div
          style={{
            padding: ".8rem",
            backgroundColor: "grey",
            borderRadius: "10px",
            marginTop: "2rem",
            cursor: "pointer",
            width: "10rem",
          }}
          onClick={() => handleTestSubmit("survey", test.data.title)}
        >
          Submit
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
