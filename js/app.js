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

    //Can't select an invoked pawn unless all pawns've been invoked
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

  selectComputerPawn(ComputerPawns){

    //while selecting pawns give precedence to non-invoked ones
    const targetPawn = ComputerPawns.filter(pawn => pawn.invoked === false)[0] 
                          || ComputerPawns[Math.floor(Math.random()*ComputerPawns.length)];

    const UITargetPawn = ui.getUIPawn(targetPawn);
    
    return UITargetPawn;
  }//end selectComputerPawn
  
  moveComputerPawn(){

    console.log('will move computer pawn shortly ==> script is missing');
  }// end move computer pawn

  getNextComputerMove(pawn, moves){

    const nextMove = moves[Math.floor(Math.random() * moves.length)];

    return nextMove;
  }//end getNextComputerMove

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

  }//end movePawn

  getPossibleMoves(targetPawn, player, UIslots){
    
    const targetPawnID = parseInt(targetPawn.dataset.id, 10);
    //if pawn is not invoked yet then it can move to any free slot
    for(let pawn of player.pawns){
      if(pawn.id === targetPawnID && pawn.invoked === false){
        return Array.from(UIslots).filter(UIslot => this.availableSlots.includes(parseInt(UIslot.dataset.id, 10)));
      }
    }
    //else if pawn was invoked then moves are restricted
    //get parent slot of actual pawn
    const parentSlotID = parseInt(targetPawn.parentElement.dataset.id, 10);
    
    let possibleMoves;
    // get possibleMoves of actual pawn according to parent slot
    for(let slot of this.slots){
      if(slot.id === parentSlotID){
        possibleMoves = slot.possibleMoves;
      }
    }
    //loop n filter nodelist => return UIslot if possible Move
    return Array.from(UIslots).filter(UIslot => possibleMoves.includes  (parseInt(UIslot.dataset.id, 10)) && 
      this.availableSlots.includes(parseInt(UIslot.dataset.id, 10)));

  }//end getPossibleMoves

  isWinner(player){

    const playerSlots = player.pawns.map(pawn => pawn.slot);
    
    let winningCompo = this.winningSlots.filter(winningLine => 
                            winningLine.every(slot => 
                            playerSlots.includes(slot)));

    winningCompo = [].concat(...winningCompo);

    return winningCompo.length === 3;
    
  }//end isWinner



  isPossibleMove(possibleMoves, targetSlot){
    const targetSlotID = parseInt(targetSlot.dataset.id, 10);
    return possibleMoves.includes(targetSlotID);
  }

}//end Board class


class Player{
  constructor(username, isComputer, pawns){
    this.username = username;
    this.isComputer = isComputer;
    //this.slots = [];
    this.pawns = pawns;
    this.winningSlots = [];
  }

  isOwner(pawnTarget){
    
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
    this.backBtn = document.querySelector('#back');
    this.boardView = document.querySelector('#board-view');
    this.homeView = document.querySelector('#home-view');
    this.singlePlayer = document.querySelector('#single-player');
    this.multiPlayer = document.querySelector('#multiplayer');
  }
  highlightTargetSlots(els, className){
    
    for(let el of els){
      // console.log(el);
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

  getUIPawn(pawn){

    let found = null;
    for(const UIPawn of this.pawns){
      if(UIPawn.dataset.id == pawn.id){
        found = UIPawn;
        break;
      }
    }
    return found;
  }//end getUIPawn


  celebrateWinner(player){
    console.log(`congratualtions ${player.username} for the Win`);
    for(const pawn of player.pawns){
      let slotID = pawn.slot;
      for(const UIslot of this.slots){
        if(slotID == UIslot.dataset.id){
          UIslot.classList.add('winner-slot');
        }
      }
    }
  }//end celebrateWinner

  
  renderState(state){
    const UIstate = state || 'Init';

    switch(UIstate){
      case 'Init':
        //clean state
        this.boardView.style.display = "none";
        this.homeView.style.display = "flex";

        break;
      //start game
      case 'startGame':
        this.boardView.style.display = "grid";
        this.homeView.style.display = "none";
        break;
      //if single player then player1 vs computer
      case 'showBoard':

        break;

      default:
        console.log("something went wrong on state manager");
    }//end switch
  }//end renderState
  
}

//new UI inst
const board = new Board;
const ui = new UI;

//init game
ui.renderState();




//event Listeners
//multiplayer p1 vs pv OR single player vs comp
ui.multiPlayer.addEventListener('click', multiplayerMode);
ui.singlePlayer.addEventListener('click', singlePlayerMode);
ui.backBtn.addEventListener('click', backBtn); 


//loop through pawns
for(let pawn of ui.pawns){
  pawn.addEventListener('click', selectPawn);
}
//loop thru slots
for(let slot of ui.slots){
  slot.addEventListener('click', movePawn);
}

