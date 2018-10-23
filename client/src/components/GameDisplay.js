import React, { Component } from "react";
import Character from "./Characters.js";
import Results from "./Results.js";
import chars from "../chars.json";

export default class GameDisplay extends Component {
  state = {
    score: 0,
    topScore: 0,
    guesses: [],
    options: chars,
    win: false,
    lose: false
  };

  selectChar = id => {
    if (!this.state.lose && !this.state.win) {
      if (this.state.guesses.includes(id)) {
        this.setState({ lose: true });
        if (this.state.score > this.state.topScore) {
          this.setState({ topScore: this.state.score });
        }
      } else {
        
        const guesses = this.state.guesses.concat(id);     
        this.setState({ guesses, score: this.state.guesses.length + 1 });      
        this.shuffle();     
        if (this.state.score >= this.state.topScore) {
          this.setState({ topScore: this.state.score + 1 });
        }  
        if (this.state.guesses.length >= this.state.options.length - 1) {
          this.setState({ win: true });
        }
      }
    }
  };

  shuffle() {
    let rand, temp, i;
    let options = this.state.options;
    for (i = options.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));
      temp = options[i];
      options[i] = this.state.options[rand];
      options[rand] = temp;
    }
    
    this.setState({ options });
  }

  reset = () => {
    this.setState({
      score: 0,
      guesses: [],
      win: false,
      lose: false
    });
    this.shuffle();
  };

  render() {
    return (
      <div>
        <Results
          topScore={this.state.topScore}
          score={this.state.score}
          win={this.state.win}
          lose={this.state.lose}
          reset={this.reset}
        />
        <div>
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
