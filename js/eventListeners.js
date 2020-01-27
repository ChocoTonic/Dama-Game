//selectPawn Fn
const selectPawn = function(e){

  let player = board.turnOfPlayer;
  
  
  let pawn = e.target;
  //check if player own the pawn
  // console.log(pawn);
  
  if(e.target.classList.contains("pawn") && 
        player.isOwner(pawn) &&
          board.canSelectPawn(player, pawn) &&
            board.gameOver === false &&
            board.gameOnPause === false &&
              player.isComputer === false
      ){

    ui.dehighlightEls(ui.slots, "highlight-slot");
    ui.dehighlightEls(ui.pawns, "highlight-pawn");
    
    board.actualPawn = this;

    //highlights slots and pawn
    ui.highlightPawn(board.actualPawn);
    
    //possible moves === UIslots
    const UIpossibleMoves = board.getPossibleMoves(pawn, player, ui.slots);
    
    //convert possible moves from UI to data 
    board.actualPossibleMoves = Array.from(UIpossibleMoves).map(slot => parseInt(slot.dataset.id, 10));

    ui.highlightTargetSlots(UIpossibleMoves, "highlight-slot");
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
          board.isPossibleMove(board.actualPossibleMoves, slot) &&
            player.isComputer === false
    ){
    
    board.movePawn(board.actualPawn, this, player)    
  
    //remove highlight
    ui.dehighlightEls(ui.slots, "highlight-slot");
    ui.dehighlightEls(ui.pawns, "highlight-pawn");

    board.actualPawn = false;

    //check if player isWinner
    if(board.isWinner(player)){
      
      board.gameOnPause = true;

      ui.celebrateRoundWinner(player);
      //increment score
      player.score++;
      ui.renderScore(board.players[0], board.players[1]);
      
        const playAgainIn = Promise.resolve(2000);

        playAgainIn.then(function(v){
          setTimeout(function(){
            ui.resetBoard();
            ui.dehighlightEls(ui.slots, "winner-slots");
            board.resetValues();
            board.gameOnPause = false;
          }, v);
        });//end synchronous promise
      
    }else{
      
      board.turnOfPlayer = (board.turnOfPlayer === board.players[0]) ?
                            board.players[1] :
                            board.players[0];
      ui.PlayerTurnAlert(board.turnOfPlayer);
    }
    
  }//end if player move 

  //after move => if computer's turn  then automate move
  if(board.turnOfPlayer.isComputer === true &&
      board.gameOver === false &&
      board.gameOnPause === false &&
      !board.computerCurrentlyPlaying){

    
    const computer = board.turnOfPlayer;
    
    board.computerCurrentlyPlaying = true;
    
    //cpu select random pawn
    let computerPawn = board.selectComputerPawn(computer.pawns);
    //console.log(computerPawn);

    ui.highlightPawn(computerPawn);
    
    //get possible moves == UIslots
    let UIpossibleMoves = board.getPossibleMoves(computerPawn, computer, ui.slots);

    //if selected pawn has no possible move then choose another one    
    let performance = 0;   
    while(UIpossibleMoves.length === 0){
      
      performance ++;
      computerPawn = board.selectComputerPawn(computer.pawns);
      UIpossibleMoves = board.getPossibleMoves(computerPawn, computer, ui.slots);
      
      if(performance > 1000){
        console.log('performance Error : slow script');
        break;
      }
    }

    ui.highlightTargetSlots(UIpossibleMoves, "highlight-slot");

    //get computer move
    const nextMove = board.getNextComputerMove(computerPawn, UIpossibleMoves);
    
    //move pawn  after some delay to give the cpu some life

    const delay = Promise.resolve(1000);

    delay.then(function(v){
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          board.movePawn(computerPawn, nextMove, computer);

          ui.dehighlightEls(ui.slots, "highlight-slot");
          ui.dehighlightEls(ui.pawns, "highlight-pawn");
          resolve(v);
        }, v);
      });//end return
    }).then(function(v){
      //check if computer isWinner
      if(board.isWinner(computer)){
      
        board.gameOnPause = true;
        ui.celebrateRoundWinner(computer);
        //increment score
        computer.score++;
        ui.renderScore(board.players[0], board.players[1]);
        //check if cpu is Gamewinner score =3
        
          const nextRoundIn = Promise.resolve(2000);
  
          nextRoundIn.then(function(v){
            setTimeout(function(){
              ui.resetBoard();
              ui.dehighlightEls(ui.slots, "winner-slots");
              board.gameOnPause = false;
              board.resetValues();
            }, v);
          });//end synchronous promise

          //switch turn 
          board.turnOfPlayer = (board.turnOfPlayer === board.players[0]) ?
          board.players[1] :
          board.players[0];
          ui.PlayerTurnAlert(board.turnOfPlayer);
          
          

      }else{
        //switch turn 
        board.turnOfPlayer = (board.turnOfPlayer === board.players[0]) ?
                              board.players[1] :
                              board.players[0];

        board.computerCurrentlyPlaying = false;                 
        ui.PlayerTurnAlert(board.turnOfPlayer);
        
      }
    });//end then

    
    
    

    }//end if cpu move

}//end movepawn


//start multiplayerMode
const multiplayerMode = function(e){
  const player1 = new Player(1, 'player-1', 
                          false, 
                          board.player1Pawns);
  const player2 = new Player(2, 'player-2', 
                          false, 
                          board.player2Pawns);
  //reference players on board.
  board.players.push(player1, player2);
  //set first turn to player1
  board.turnOfPlayer = board.players[0];

  //render state
  ui.renderState('startGame');
  ui.PlayerTurnAlert(board.turnOfPlayer);
  
  e.preventDefault();
} //end multiplayerMode

//start singlePlayerMode
const singlePlayerMode = function(e){
  const player1 = new Player(1, 'player-1', 
                          false, 
                          board.player1Pawns);
  const player2 = new Player(2, 'Computer', 
                          true, 
                          board.player2Pawns);

  //reference players on board.
  board.players.push(player1, player2);
  //set first turn to player1
  board.turnOfPlayer = board.players[0];

  //render state
  ui.renderState('startGame');
  ui.PlayerTurnAlert(board.turnOfPlayer);
  
  e.preventDefault();
}//end singlePlayerMode


const backBtn = function(e){
  location.reload();
  e.preventDefault();
}//end back btn