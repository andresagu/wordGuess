



//instantiate the array that will hold the user input words and the array that will hold the deduped letters
var inputWord = ["b","a","l","l"];
var reqLetters = [];
var guessArray = [];
//instantiate empty object to hold letters and their positions
var WordObject = {};


//instantiate array for holding the letters and their positions
for (var i=0;i<inputWord.length;i++){

  guessArray[i] = "_";
  WordObject[inputWord[i]] = [];

}

//fill the word object with the indices of its letters
for (var i=0;i<inputWord.length;i++){

  var key = inputWord[i];

  //set the key's corresponding value
    var value = i;
    WordObject[key].push(i);

}

console.log(WordObject);



document.onkeyup = function(event){

  var input = event.key;
  console.log(input);

  //logic that will go thru the objectKeysArray and check if the keyboard input matches a letter needed
  for(var key in WordObject){
    if(input == key){
      //logic to update guessArray
      var letterIndex = WordObject[key];
      console.log(letterIndex);

      //loop to fill in the guess word array with the correctly guessed letters
      for(var i=0;i<letterIndex.length;i++){
        guessArray[letterIndex[i]] = key;

      }
      console.log(guessArray);

    }

  }
}

var objectKeysArray = Object.keys(WordObject);
console.log(objectKeysArray);
