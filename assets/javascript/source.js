


//SETTING UP THE GAME

//instantiate the array that will hold the user input words and the array that will hold the deduped letters
var inputWordArray = [];
var guessArray = [];

var reqLetters = [];
var guessedLettersArray = [];


//sets the game start boolean to false when this is set to true the game will setup and take in user input for the word that will need to be guessed
var gameSetupOn = false;

//starts the game for player 2 to guess the word entered by player 1 and this will start the game
var gameStart = false;

//finally a boolean to keep track of the end of the game. should be triggered once tries is ZERO or the guessArray is full.
//guessArray.length == inputWordArray.length
//Also distinguishes between won and lost
var gameEndWon = false;
var gameEndLost = false;


//Starting off with 8 tries to see how that pans out
var numTries = 8;

//instantiate empty object to hold letters and their positions
var WordObject = {};

//instantiate empty object that will hold letters that have been guessed without tracking duplicates
var WordsGuesedObject = {};

//wrapped the object setup into 2 functions. one for creating the placeholders and one for filling it
function setupWordObject(){
//instantiate array for holding the letters and their positions
for (var i=0;i<inputWordArray.length;i++){

  guessArray[i] = "_";
  WordObject[inputWordArray[i]] = [];

}

}

//Part 2 of the WordObject setup. this function fills in the object

function fillWordObject(){
//fill the word object with the indices of its letters
for (var i=0;i<inputWordArray.length;i++){

  var key = inputWordArray[i];

  //set the key's corresponding value
    var value = i;
    WordObject[key].push(i);
}

//logs the filled in WordObject
console.log(WordObject);

//Fills the reqLetters array with the keys so that game winning can be determined later
reqLetters = Object.keys(WordObject);
console.log(reqLetters);

}


//will fill the WordsGuesedObj and update the UI to show which words have been guessedLettersArray
//takes in input as a parameter and pushes it as a key for the WordsGuesedObj

function updateGuesses(value){

  var key =value;
//So there may be a way to do this using less memory but
//but since objects don't take in duplicates this may be a good way to do this with less memory and quicker lookups
//using the boolean as a place holder only
  WordsGuesedObject[key] = true;

}

//LOGIC TO BE USED FOR UI UPDATES//

//keep track of game start so that no more spacebar inputs are allowed
//more than 1 space will not work
//also instantiate count for enter key
var spaceCount = 0;
var enterCount = 0;




//This onkeyup will most likely run the game but there should be another key event that requires pressing the space bar to setup the game and a few key events to setup the word in general


document.onkeyup = function(event){

  //CREATE ONKEYEVENT THAT WILL HANDLE IF SPACE WAS PRESSED TO BEGIN THE GAME AND INPUT THE GUESS WORD


  var input = event.key;
  console.log(input);
  var space = " ";
  var enter = "Enter";

  //Boolean to track if a matching letter was found in the WordObject
  //This is reset every key event since the word isn't a match until it's proven a match in the for loop...
  var letterMatch = false;

  if(input == space && spaceCount<1){

    gameSetupOn = true;
    spaceCount++;
    console.log("game setup is on");
  }
  //once the enter key is pressed to start the game and the gameSetupOn is false meaning the game is no longer setting up and is ready to play
  //spacecount allows enter to be read into the input if space has been hit once before
  else if(input == enter && gameSetupOn && spaceCount>0){

    gameStart=true;
    gameSetupOn = false;
    console.log("game start is on");

    //Hoping this will give a clean setup of the game and WordObject needed to run the game

    setupWordObject();
    fillWordObject();
    console.log("Game Started");

  }


//This should only run during game setup and ignores spaces so for now no words with spaces can be entered
  if(gameSetupOn && input != space && input != enter && input != "Backspace"){
    console.log("inputting words to the inputWordArray");
    inputWordArray.push(input);


    //Will udpate the UI here for the input word

    var inputWordDispay = inputWordArray.join(" ");
    document.getElementById("inputWord").innerHTML = inputWordDispay;


    console.log(inputWordArray);
  }




//This check is in place to only run the game logic once the game is setup and started
if(gameSetupOn==false && gameStart == true && input != space && input != enter){

console.log("game is on: inside the game logic");

  //logic that will go thru the objectKeysArray and check if the keyboard input matches a letter needed
  for(var key in WordObject){
    console.log ("looking for key " + key);
    //checks to see if input is equal to one of the required words and also checks to see if the game has been completed
    //by checking the array lengths of the guessed word array vs the input word array
    if(input == key){


      console.log("you guessed the right letter")
      letterMatch = true;


      //LOGIC TO UPDATE guessArray//

      //saves the array of indices to letteIndex array
      var letterIndexArray = WordObject[key];

      //logs the index of the key
      console.log(letterIndexArray);

      //loop to fill in the guess word array with the correctly guessed letters
      for(var i=0;i<letterIndexArray.length;i++){
        guessArray[letterIndexArray[i]] = key;

      }
      console.log("Here's what's been guessed "+ guessArray + " I'm going to break now");

      //add correct letter to the guessedLettersArray

      //Will udpate the UI here for the guessed word
      var guessWordDisplay = guessArray.join(" ");
      document.getElementById("guessWord").innerHTML = guessWordDisplay;

      //breaks for loop hopefully as soon as this condition is satisfied so it doesn't keep trying the other keys
      break;

    }


  }
//logic for either wrong guesses or the game being won
//This is running outside the for loop because it only needs to know that the letter didn't match any of the keys

//This first if statement checks to see if you've won already
if(guessArray.length == reqLetters.length){
  console.log("you won");
  gameEndWon = true;
}

//checks if there was no match and updates accordingly
else if (!letterMatch && input != enter && numTries>0){

    console.log("you guessed wrong");
    numTries--;
    console.log("# tries left "+numTries );
    //Checks to see if you reached 0 tries and alerts of a game loss
    if (numTries==0){
      console.log("you lost")
      gameEndLost = true;
    }

}

//UPDATE THE WordsGuesedObject and UI
updateGuesses(input);
var newGuessedLettersArray = Object.keys(WordsGuesedObject);
console.log("should be all guesses " + newGuessedLettersArray);
//Will udpate the UI here for the guessed word
var guessedWordTrackerDisplay = newGuessedLettersArray.join(", ");
document.getElementById("guessedWordTrackerDisplay").innerHTML = guessedWordTrackerDisplay;

//ALSO UPDATE NUMTRIES HERE // TODO:
document.getElementById("numTries").innerHTML = numTries;


}

//This is most likely not needed at all
console.log("you're outside the game logic")

}

$(document).ready(function(){


  $(document).keypress(function(event){

    var input = event.key;
    console.log("this is the jquery input " + input);
    if(input == " " && !gameSetupOn && spaceCount<1){
      $('#exampleModalCenter').modal('show');

    }

    else if(input == "Enter" && gameSetupOn){
    $('#exampleModalCenter').modal('hide');
    $('.collapse').collapse();
  }

});

});


//This is also most likely not needed at all once the whole game is implemented
console.log("this is outside the key event for some reason");
var objectKeysArray = Object.keys(WordObject);
console.log(objectKeysArray);
