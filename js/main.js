//Global variables
let turn =0;
let pawnToMove = "";
let movingTurn = false;
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
let possibleMoves = [
  /* 0 */['0', '0', '0'],
  /* 1 */['2', '5', '4'],
  /* 2 */['3', '1', '5'],
  /* 3 */['2', '6', '5'],
  /* 4 */['1', '5', '7'],
  /* 5 */['1', '2', '3','4', '6', '7','8', '9'],
  /* 6 */['3', '9', '5'],
  /* 7 */['4', '5', '8'],
  /* 8 */['5', '7', '9'],
  /* 9 */['6', '5', '8']

];


//listen to the Dama board 
document.getElementById('board-game').addEventListener('click', e => {
  const options = ['1','2','3','4','5','6','7','8','9'];
  const target = e.target;

  //make sur the user clicked on a board's button
  if(options.includes(target.id)){
    //check if box is empty (Available)
    if(emptyBox(target.id)){
        //if moving turn and move is possible, move the pawn else invok a pawn
        if(movingTurn && possibleMove(target.id)){
          //turn moving turn to false since we only gotta move once per turn
          
          //reset the pawn to move case and update 
          console.log(`busyBoxes before splice ${busyBoxes}`);
          document.getElementById(pawnToMove).value = "";
          document.getElementById(pawnToMove).style.background = "";
          // update busyBoxes remove the moved id from its array
          // add new target case to the busyboxes array
          // let index = busyBoxes.indexOf(pawnToMove);
          // busyBoxes[''] = busyBoxes.splice(index, 1);
          busyBoxes[''] = removeFromArray(busyBoxes);
          //push new busy box to busyboxes array
          busyBoxes.push(target.id);
          //mark the new case and change turn
          target.value = turnChanger(target.id);

          console.log(`busyBoxes after slice and push ${busyBoxes}`);
          // console.log(document.getElementById(pawnToMove));
          // console.log(pawnToMove);
          // console.log(target);
          movingTurn = false;
        }else {       
          //make sure each player doesnt own more than 3 pawns
          if(authorizedAction()){
            //mark the target box and occupy space 
            target.value = turnChanger(target.id);
            busyBoxes.push(target.id);
            console.log(`busyBoxes : ${busyBoxes}`);
          }else{
            alert("cant do this ");
          }
        }//end else movingTurn
    }else{
      //if player has right to move the pawn X/O
      if(canMovePawn() && movingTurn === false){
        //ready to move 
        readyToMove(target.id);
        //console.log('inside canMovePawn()');
      }else {
        alert("cant move this pawn ");
      }
      
    }

      
  }
});
//possibleMove
function possibleMove(move){
  return (possibleMoves[pawnToMove].includes(move)) ? true : false;
}
//readyTo move funciton
function readyToMove(targetId){
  pawnToMove = targetId;
  document.getElementById(pawnToMove).style.background = 'red';
  movingTurn = true;
  
}

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
      if(movingTurn){
        console.log(`Oplays before splice: ${Oplays}`);
        // let index = Oplays.indexOf(pawnToMove);
        // Oplays[''] = Oplays.splice(index, 1);
        Oplays[''] = removeFromArray(Oplays);
        console.log(`Oplays after splice: ${Oplays}`);
      }
      console.log(`Oplays : ${Oplays}`);
  }else{
      Xplays.push(playerPlay);
      if(movingTurn){
        console.log(`Xplays before splice: ${Xplays}`);
        // let index = Xplays.indexOf(pawnToMove);
        // Xplays[''] = Xplays.splice(index, 1);
        //remove moved pawn from Xplays array
        Xplays[''] = removeFromArray(Xplays);
        console.log(`Xplays after splice: ${Xplays}`);
      }
      console.log(`Xplays : ${Xplays}`);
  }
}
//remove from array to update busy boxes and playerplays after moving the pawn
function removeFromArray(arr){
  let index = arr.indexOf(pawnToMove);
  newArr = arr.splice(index, 1);
  return newArr; 
}

//if authorized action
function authorizedAction(){
  return (Xplays.length === 3 && turn === 1 || Oplays.length === 3 && turn === 0) ? false : true;
}

//if can move pawn
function canMovePawn(){
  let actualPlays = (turn === 1) ? Xplays.length : Oplays.length;
  return (actualPlays === 3) ? true : false;
}
