import React from "react";

const Results = props => {
  return (
    <div className="container teal lighten-4 jumbotron">
    <h5 className="flex"><strong>Click on all the characters without clicking on anyone twice!</strong></h5>
      <div className="flex wrap">
        <h5>Current Score: {props.currPoints}</h5>
        <h5>Top Score: {props.topPoints}</h5>
      </div>
      <div>
        <h3>
          {props.win ? "You Won!" : ""}
          {props.lose ? "You Lost!" : ""}
        </h3>
        {(props.lose || props.win) ? (
          <button className="btn teal darken-4" onClick={() => props.reset()}>
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