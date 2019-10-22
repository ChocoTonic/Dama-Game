class Board{
  constructor(){
    
    this.winningSlots = [
      //horizontal winning slots
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      //vertical winning slots
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      //diagonal winning slots
      [1, 5, 9],
      [3, 5, 7]
      ];
    this.players = [];
    this.turn = {};
    this.availableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.busySlots = [];
    this.gameOver = false;
    this.winner;
    this.actualPawn = false;
    this.player1Pawns = [
      {
        id:1,
        invoked:false
      },
      {
        id:2,
        invoked:false
      },
      {
        id:3,
        invoked:false
      }
      ];
    this.player2Pawns = [
      {
        id:4,
        invoked:false
      },
      {
        id:5,
        invoked:false
      },
      {
        id:6,
        invoked:false
      }
      ];
  }//end constructor
}


class Player{
  constructor(username, isComputer, pawns){
    this.username = username;
    this.isComputer = isComputer;
    this.slots = [];
    this.pawns = pawns;
    this.winningSlots = [];
  }

  ifOwner(pawnTarget){
    
    const targetId = parseInt(pawnTarget.dataset.id, 10);
    const playerPawnsIds = this.pawns.map(pawn => pawn.id);

    
    return playerPawnsIds.includes(targetId);
  }
}


class UI{
  constructor(){
    this.board = document.querySelector('#board');
    this.slots = document.querySelectorAll('.slot');
    this.pawns = document.querySelectorAll('.pawn');
    
  }
}

//new UI inst
const board = new Board;
const ui = new UI;
const player1 = new Player('player-1', 
                          false, 
                          board.player1Pawns);
const player2 = new Player('player-2', 
                          false, 
                          board.player2Pawns);

board.players.push(player1, player2);
//set first turn to player1
board.turn = board.players[0];



//event Listeners

//loop through pawns
for(pawn of ui.pawns){
  pawn.addEventListener('click', selectPawn);
}

//loop thru slots
for(slot of ui.slots){
  slot.addEventListener('click', movePawn);
}