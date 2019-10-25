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
    this.turnOfPlayer = '';
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

  freeSlot(){
    return true;
  }

  canSelectPawn(player, pawnTarget){
    //make sure all pawns are invoked before moving
    const pawnID = parseInt(pawnTarget.dataset.id, 10)
    
    for(let pawn of player.pawns){
      if(pawn.id === pawnID && pawn.invoked === true){
        for(let pawn of player.pawns){
          if(pawn.invoked === false){
            return false;
          }
        }
      }
    }//end for parent
      return true;

  }//end canSelectPawn

  movePawn(pawn, slot, player){
    
    //move pawn to slot
    slot.appendChild(pawn);

    //if pawn is invoked update value to true
    const pawnID = parseInt(pawn.dataset.id, 10)
    for(let pawn of player.pawns){
      if(pawn.id === pawnID && pawn.invoked === false){
        pawn.invoked = true;
        console.log(player.pawns);
      }
    }

    //update available slots
    const slotID = parseInt(slot.dataset.id, 10);
    const index = this.availableSlots.indexOf(slotID);

    (index > -1) ?
      this.availableSlots.splice(index, 1) :
        console.log('something went wrong');
  }

}


class Player{
  constructor(username, isComputer, pawns){
    this.username = username;
    this.isComputer = isComputer;
    this.slots = [];
    this.pawns = pawns;
    this.winningSlots = [];
  }

  isOwner(pawnTarget){
    
    const targetId = parseInt(pawnTarget.dataset.id, 10);
    const playerPawnsIds = this.pawns.map(pawn => pawn.id);
    console.log(playerPawnsIds);
    console.log(targetId);
    return playerPawnsIds.includes(targetId);
  }
}


class UI{
  constructor(){
    this.board = document.querySelector('#board');
    this.slots = document.querySelectorAll('.slot');
    this.pawns = document.querySelectorAll('.pawn');
    
  }
  highlightTargetSlots(els, className){
    for(let el of els){
      
        el.classList.add(className);
      
    } 
  }

  highlightPawn(pawn){
    pawn.classList.add("highlight-pawn");
  }

  dehighlightEls(els, className){
    // console.log(els);
    for(let el of els){
      // console.log(el);
      if(el.classList.contains(className)){
        el.classList.remove(className);
      }
    } 
  }//end dehighlight
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

//reference players on board.
board.players.push(player1, player2);
//set first turn to player1
board.turnOfPlayer = board.players[0];



//event Listeners

//loop through pawns
for(let pawn of ui.pawns){
  pawn.addEventListener('click', selectPawn);
}

//loop thru slots
for(let slot of ui.slots){
  slot.addEventListener('click', movePawn);
}