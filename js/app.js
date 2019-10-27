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
    // this.allSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.availableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.busySlots = [];
    this.gameOver = false;
    this.winner;
    this.actualPawn = false;
    this.actualPossibleMoves = false;
    this.slots = [
      {
        id: 1,
        possibleMoves: [2, 4, 5],
      },
      {
        id: 2,
        possibleMoves: [1, 3, 5],
      },
      {
        id: 3,
        possibleMoves: [2, 5, 6],
      },
      {
        id: 4,
        possibleMoves: [1, 5, 7],
      },
      {
        id: 5,
        possibleMoves: [1, 2, 3, 4, 6, 7, 8, 9],
      },
      {
        id: 6,
        possibleMoves: [3, 5, 9],
      },
      {
        id: 7,
        possibleMoves: [4, 5, 8],
      },
      {
        id: 8,
        possibleMoves: [7, 5, 9],
      },
      {
        id: 9,
        possibleMoves: [5, 6, 8],
      },
    ];
    this.player1Pawns = [
      {
        id:1,
        invoked:false,
        slot:false
      },
      {
        id:2,
        invoked:false,
        slot:false
      },
      {
        id:3,
        invoked:false,
        slot:false
      }
      ];
    this.player2Pawns = [
      {
        id:4,
        invoked:false,
        slot:false
      },
      {
        id:5,
        invoked:false,
        slot:false
      },
      {
        id:6,
        invoked:false,
        slot:false
      }
      ];
  }//end constructor

  freeSlot(targetSlot){

    const targetSlotID = parseInt(targetSlot.dataset.id, 10);

    
    return this.availableSlots.includes(targetSlotID);
  }

  canSelectPawn(player, pawnTarget){

    //Can't select an invoked pawn unless all pawns are invoked
    const targetPawnID = parseInt(pawnTarget.dataset.id, 10)
    
    for(let pawn of player.pawns){
      //if selected pawn is invoked
      if(pawn.id === targetPawnID && 
          pawn.invoked === true){
        //make sure all pawn are invoked
        for(let pawn of player.pawns){
          if(pawn.invoked === false){
            return false;
          }
        }//end for*2
      }
    }//end for*1
      
      return true;
  }//end canSelectPawn

  movePawn(targetPawn, slot, player){
    
    const slotID = parseInt(slot.dataset.id, 10);
    const targetPawnID = parseInt(targetPawn.dataset.id, 10);
    //if pawn was moved from another slot, free that slot 
    if(targetPawn.parentElement.classList.contains("slot")){

      const parentSlotID = parseInt(targetPawn.parentElement.dataset.id, 10);
      this.availableSlots.push(parentSlotID);
    }
    //move pawn to target slot
    slot.appendChild(targetPawn);

    //bind slot to pawn after move
    for(let pawn of player.pawns){
      if(targetPawnID === pawn.id){
        pawn.slot = slotID;
      }
    }
    console.log(`${player.username} Pawns => `, player.pawns);

    //if pawn was invoked update value to true
    for(let pawn of player.pawns){
      if(pawn.id === targetPawnID && pawn.invoked === false){
        pawn.invoked = true;
        // console.log(player.pawns);
      }
    }

    //update available slots
    const index = this.availableSlots.indexOf(slotID);

    (index > -1) ?
      this.availableSlots.splice(index, 1) :
        console.log('something went wrong');
    
    console.log("available slots ",  this.availableSlots);
  }//end movePawn

  getPossibleMoves(targetPawn, player){
    //this needs some thinking
    
    const targetPawnID = parseInt(targetPawn.dataset.id, 10);
    //if pawn is not invoked yet then it can move anywhere
    for(let pawn of player.pawns){
      if(pawn.id === targetPawnID && pawn.invoked === false){
        return this.slots.map(slot => slot.id);
      }
    }
    //else 
    const parentSlotID = parseInt(targetPawn.parentElement.dataset.id, 10);

    


  }

}//end Board class


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
    // console.log(playerPawnsIds);
    // console.log(targetId);
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
    if(els === undefined){return false};
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