//Global variables
let turn =0;
let busyBoxes = [];
const winningPlays = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9']
];
let Xplays = [];
let Oplays = [];

//listen to the dama board 
document.getElementById('board-game').addEventListener('click', e => {
  const options = ['1','2','3','4','5','6','7','8','9'];
  const target = e.target;

  //associate board cases to players
  if(options.includes(target.id)){
    //check if box is empty (Available)
    if(emptyBox(target.id)){
      if(authorizedAction()){
        //mark the target box and occupy space 
        target.value = turnChanger(target.id);
        busyBoxes.push(target.id);
        // console.log(busyBoxes);
      }else{
        alert("cant do this ");
      }

    }else{
      //if player has right to drag the pawn X/O
      if(canMovePawn()){

      }else {
        alert("cant do this ");
      }
      
    }

      
  }
});


//switch turns
function turnChanger(playerPlay){
  let turnPlay;
  if(turn === 0){
      turnPlay = 'O';
       playerPlays(playerPlay);
      // ifWinner(Oplays, turnPlay);
      turn = 1;
  }else{
      turnPlay = 'X';
      //push play to player arrayPlays
      playerPlays(playerPlay);
      //check if player is winner
      // ifWinner(Xplays, turnPlay);
      //switch turn 
      turn = 0;
  }
  return turnPlay;
}

//if empyBox funciton
function emptyBox(selectedBox){
	// if(busyBoxes.includes(selectedBox)){
	// 	return false;
	// }	else {
	// 	return true;
	// }
	return (busyBoxes.includes(selectedBox)) ? false : true;
}


//push play to player's plays 
function playerPlays(playerPlay){
  if(turn == 0){
      Oplays.push(playerPlay);
  }else{
      Xplays.push(playerPlay);
  }
}

//if authorized action
function authorizedAction(){
  return (Xplays.length === 3 && turn === 1 || Oplays.length === 3 && turn === 0) ? false : true;
}

//if can move pawn
function canMovePawn(){
  return false;
}