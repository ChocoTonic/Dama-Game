//selectPawn Fn
const selectPawn = function(e){
  
  let player = board.turn;
  let pawn = e.target;
  //check if player own the pawn
  
  if(e.target.classList.contains("pawn")
      && player.ifOwner(e.target)
      ){
    
    // console.log('target ', e.target);
    // console.log('this ', this);
    board.actualPawn = this;

    //highlights slots and pawn
    this.classList.add("highlight-pawn");
    for(slot of ui.slots){
      slot.classList.add('highlight-slot');
    }
    
    // console.log('actual ', board.actualPawn);
  }
  
  
}//end movePawn fn

//Movepawn fn
const movePawn = function(e){
  
  if(board.actualPawn && 
      e.target.classList.contains('slot')){

    this.appendChild(board.actualPawn);
  
    //remove highlight
    for(slot of ui.slots){
      slot.classList.remove("highlight-slot");
      board.actualPawn.classList.remove("highlight-pawn");
    }
    // console.log(board.actualPawn);
    board.actualPawn = false;
    
  }

}