//GLOBAL Vars
//------------------------------

//Arrays and Vars

var coins = ["bitcoin", "ether", "xrp", "lumens", "eos", "litecoin", "bcash", "iota", "cardano", "monero", "tether", "tron", "dash", "neo", "nem", "tezos", "zcash", "decred", "waves", "status"]
var selWord = "";
var lettersinWord = [];
var blanks = 0;
var blanksandSuccesses = [];
var wrongLetters = [];

//Win Loss Counters
var wins = 0;
var losses = 0;
var guessesLeft = 9;



//Functions
//-------------------------------

function cmMain() {
    selWord = coins[Math.floor(Math.random() * coins.length)];
    lettersinWord = selWord.split("");
    blanks = lettersinWord.length;

    //reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksandSuccesses = [];

    // Loop to create blanks
    for (var i=0; i < blanks; i++) {
        blanksandSuccesses.push("_");
    }

    // Update the mainpage
    document.getElementById("word").innerHTML = blanksandSuccesses.join(" ");
    document.getElementById("Guesses").innerHTML = guessesLeft;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    //Debug

    console.log(selWord);
    console.log(blanks);
    console.log(lettersinWord);
    console.log(blanksandSuccesses);
}


function checkLetters(letter) {
    //Check if letters in word

    var isletterinWord = false;

    for (var i=0; i < blanks; i++) {
        if (selWord[i] == letter) {
            isletterinWord = true;
            console.log(isletterinWord);
        }
    }
    if (isletterinWord) {
        for (var i=0; i < blanks; i++) {
            if (selWord[i] == letter) {
                blanksandSuccesses[i] = letter;
            }
        }
    }
    else {
        wrongLetters.push(letter);
        guessesLeft--
        console.log(wrongLetters);
        console.log(letter);
    }

    //Debug
    console.log(blanksandSuccesses)

}

function roundComplete() {
    console.log("Wins" + wins + " | Losses" + losses + " | Guesses Left")


    document.getElementById("Guesses").innerHTML = guessesLeft;
    document.getElementById("word").innerHTML = blanksandSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


    //Check if user won
    if (lettersinWord.toString() == blanksandSuccesses.toString()) {
        wins++;
        alert("You Won!");
        wrongLetters = [];

        document.getElementById("wins").innerHTML = wins;
        cmMain();

    }

    //Check if user lost
    else if (guessesLeft == 0) {
        losses++;
        alert("You Lost!");

        document.getElementById("losses").innerHTML = losses;

        cmMain();
    }
}


//Main 
//-------------------------------

// Starts CryptoMatch
cmMain();


//grabs keystroke
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // Debug
    console.log(letterGuessed);
}