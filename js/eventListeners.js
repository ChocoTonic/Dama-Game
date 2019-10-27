//selectPawn Fn
const selectPawn = function(e){

  let player = board.turnOfPlayer;
  console.log(player.username, " 's turn");
  let pawn = e.target;
  //check if player own the pawn
  // console.log(pawn);
  
  if(e.target.classList.contains("pawn") && 
        player.isOwner(pawn) &&
          board.canSelectPawn(player, pawn)
      ){
    
    ui.dehighlightEls(ui.slots, "highlight-slot");
    ui.dehighlightEls(ui.pawns, "highlight-pawn");
    // console.log('target ', e.target);
    // console.log('this ', this);
    board.actualPawn = this;

    //highlights slots and pawn
    
    ui.highlightPawn(board.actualPawn, "highlight-pawn");

    const possibleMoves = board.getPossibleMoves(pawn, player);
    console.log('possible moves', possibleMoves);
    // ui.highlightEls(possibleMoves, "highlight-slots");
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
        board.freeSlot(slot)){

    
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
    //switch turn 
    board.turnOfPlayer = (board.turnOfPlayer === board.players[0]) ?
                            board.players[1] :
                              board.players[0];
    console.log('turn switched to player ', board.turnOfPlayer.username);
  }//end if parent

}//end movepawn