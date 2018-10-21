import React, { Component } from "react";
import Character from "./Characters.js";
import Results from "./Results.js";
import chars from "../chars.json";

export default class GameDisplay extends Component {
  state = {
    currPoints: 0,
    topPoints: 0,
    guessed: [],
    options: chars,
    win: false,
    lose: false
  };

  selectChar = id => {
    // Only do this is the user hasn't won or lost yet
    if (!this.state.lose && !this.state.win) {
      if (this.state.guessed.includes(id)) {
        // User has lost
        this.setState({ lose: true });
        // Check to see if this was the user's best score
        if (this.state.currPoints > this.state.topPoints) {
          this.setState({ topPoints: this.state.currPoints });
        }
      } else {
        // Add the clicked character's id to the list of guessed characters
        const guessed = this.state.guessed.concat(id);
        // Update the guessed array and the current amount of points
        // I know the setting of currPoints is weird but it's the only way it works
        this.setState({ guessed, currPoints: this.state.guessed.length + 1 });
        // Shuffle the characters so the user gets confused
        this.shuffle();
        // If their current score is better than their best score, show it
        if (this.state.currPoints >= this.state.topPoints) {
          this.setState({ topPoints: this.state.currPoints + 1 });
        }
        // If they've guessed all the characters, alert them of their feat of memory!
        if (this.state.guessed.length >= this.state.options.length - 1) {
          this.setState({ win: true });
        }
      }
    }
  };

  shuffle() {
    let rand, temp, i;
    let options = this.state.options;
    // Iterate through array, switching with random indexes
    for (i = options.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));
      temp = options[i];
      options[i] = this.state.options[rand];
      options[rand] = temp;
    }
    // Update state
    this.setState({ options });
  }

  reset = () => {
    // Reset state
    this.setState({
      currPoints: 0,
      guessed: [],
      win: false,
      lose: false
    });
    // Shuffle characters
    this.shuffle();
  };

  render() {
    return (
      <div>
        <Results
          topPoints={this.state.topPoints}
          currPoints={this.state.currPoints}
          win={this.state.win}
          lose={this.state.lose}
          reset={this.reset}
        />
        <div className="container flex wrap">
          {this.state.options.map(character => (
            <Character
              id={character.id}
              name={character.name}
              image={character.image}
              selectChar={this.selectChar}
              key={character.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
