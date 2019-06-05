



//instantiate the array that will hold the user input words and the array that will hold the deduped letters
var inputWord = ["b","a","l","l"];
var reqLetters = [];
var guessArray = [];
//instantiate empty object to hold letters and their positions
var WordHolderObject = {};


//instantiate array for holding the letters and their positions
for (var i=0;i<inputWord.length;i++){

  guessArray[i] = "_";
  WordHolderObject[inputWord[i]] = [];

}

//fill the word object with the indices of its letters
for (var i=0;i<inputWord.length;i++){

  var key = inputWord[i];

  //set the key's corresponding value
    var value = i;
    WordHolderObject[key].push(i);

}

console.log(WordHolderObject);

//if input value == iterate through object keys
var input = "l";
var objectKeysArray = Object.keys(WordHolderObject);
console.log(objectKeysArray);

//logic that will go thru the objectKeysArray and check if the keyboard input matches a letter needed
// for(var i = 0; i<objectKeysArray.length;i++){
//   if(input == objectKeysArray[i]){
//     //logic to update guessArray
//     var letterIndex = WordHolderObject[input];
//     console.log(letterIndex);
//   }
// }

//logic that will go thru the objectKeysArray and check if the keyboard input matches a letter needed
for(var key in WordHolderObject){
  if(input == key){
    //logic to update guessArray
    var letterIndex = WordHolderObject[key];
    console.log(letterIndex);

    //loop to fill in the guess word array with the correctly guessed letters
    for(var i=0;i<letterIndex.length;i++){
      guessArray[letterIndex[i]] = key;

    }
    console.log(guessArray);

  }

}
