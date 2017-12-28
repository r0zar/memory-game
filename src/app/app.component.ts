import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as StateMachine from 'javascript-state-machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tiles = tiles;
  fsm = fsm;
  select = select;
  pick = pick;
  guess = guess;
}

// temporary values for cards under comparison
var pick = {text: '', isFlipped: false};
var guess = {text: '', isFlipped: false};

// the state machine that controls the gameplay logic
var fsm = new StateMachine({
  init: 'noCards',
  transitions: [
    { name: 'pick', from: 'noCards', to: 'oneCard' },
    { name: 'guess', from: 'oneCard', to: 'twoCards' },
    { name: 'resolve', from: 'twoCards', to: 'noCards' }
  ],
  methods: {
    onPick:     () => { console.log('You picked', pick.text) },
    onGuess:    () => { match() },
    onResolve:  () => { resolve() }
  }
});

// game and card state transition logic
var select = (tile) => {
  if (fsm.is('noCards') && !tile.isFlipped){
    pick = tile;
    fsm.pick()
    tile.isFlipped=!tile.isFlipped
  }
  else if (fsm.is('oneCard') && tile != pick){
    guess = tile;
    fsm.guess()
    tile.isFlipped=!tile.isFlipped
  }
}

// private functions to be called by state controller
var match = () => {
  console.log('You guessed, and compared the cards')
  setTimeout(() => {
    if (pick.text != guess.text) {
      pick.isFlipped = false
      guess.isFlipped = false
    }
    fsm.resolve()
  }, 1000)
}

var resolve = () => {
  console.log('You resolved', pick.text == guess.text)
  if (_.every(tiles, 'isFlipped')) {
    alert("YOU WIN!");
  }
}

// generate cards for the picking and matching
var tiles = [];
_.times(12, (text) => {
  // push matching cards
  tiles.push({text, cols: 1, rows: 1, isFlipped: false})
  tiles.push({text, cols: 1, rows: 1, isFlipped: false})
});
// randomize the pile
tiles = _.shuffle(tiles)
