import React from "react";

const Results = ({score, topScore, win, lose, reset}) => {
  return (
    <div className="container">
    <h5>Click on all the characters without picking the same character twice!</h5>
      <div>
        <h5>Current Score: {score}</h5>
        <h5>Top Score: {topScore}</h5>
      </div>
      <div>
        <h3>
          {win ? "You Won!" : ""}
          {lose ? "You Lost!" : ""}
        </h3>
        {(lose || win) ? (
          <button className="btn" onClick={() => reset()}>
            Reset
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Results;