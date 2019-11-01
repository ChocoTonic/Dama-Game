//selectPawn Fn
const selectPawn = function(e){

  let player = board.turnOfPlayer;
  console.log(player.username, " 's turn");
  let pawn = e.target;
  //check if player own the pawn
  // console.log(pawn);
  
  if(e.target.classList.contains("pawn") && 
        player.isOwner(pawn) &&
          board.canSelectPawn(player, pawn) &&
            board.gameOver === false
      ){
    
    ui.dehighlightEls(ui.slots, "highlight-slot");
    ui.dehighlightEls(ui.pawns, "highlight-pawn");
    // console.log('target ', e.target);
    // console.log('this ', this);
    board.actualPawn = this;

    //highlights slots and pawn
    
    ui.highlightPawn(board.actualPawn, "highlight-pawn");
    
    //possible moves === UIslots
    const UIpossibleMoves = board.getPossibleMoves(pawn, player, ui.slots);
    
    //console.log('possible moves', possibleMoves);
    //console.log(UIpossibleMoves);
    board.actualPossibleMoves = Array.from(UIpossibleMoves).map(slot => parseInt(slot.dataset.id, 10));

    //console.log(board.actualPossibleMoves);
    ui.highlightTargetSlots(UIpossibleMoves, "highlight-slot");
    // this.classList.add("highlight-pawn");
    // for(slot of ui.slots){
    //   slot.classList.add('highlight-slot');
    // }
    
    // console.log('actual ', board.actualPawn);
  }//end if parent
  
  
}//end selectPawn fn

//Movepawn fn
const movePawn = function(e){
  let player = board.turnOfPlayer;
  let slot = e.target;
   
  //if player has right to move
  if(board.actualPawn && 
      slot.classList.contains('slot') &&
        board.freeSlot(slot) &&
          board.isPossibleMove(board.actualPossibleMoves, slot)){

    
    board.movePawn(board.actualPawn, this, player)    
    // this.appendChild(board.actualPawn);
  
    //remove highlight
    // console.log('dehiglight slots')
    ui.dehighlightEls(ui.slots, "highlight-slot");
    ui.dehighlightEls(ui.pawns, "highlight-pawn");
    // for(slot of ui.slots){
    //   slot.classList.remove("highlight-slot");
    //   board.actualPawn.classList.remove("highlight-pawn");
    // }
    // console.log(board.actualPawn);
    board.actualPawn = false;

    //check if player isWinner
    if(board.isWinner(player)){
      
      board.gameOver = true;
      ui.celebrateWinner(player);
    }else{
      //switch turn 
      board.turnOfPlayer = (board.turnOfPlayer === board.players[0]) ?
                            board.players[1] :
                            board.players[0];
      //console.log('turn switched to player ', board.turnOfPlayer.username);
    }
    
  }//end if parent

}//end movepawn

//play again btn
const playAgain = function(e){
  
  location.reload();
  e.preventDefault();
}