//? for the river:
//? create three radnom numbers (flop)
//? then one more (turn) and then the last one (river)

//? after each turn, you will bet
//jack = 11
//queen = 12
//king = 13
//ace 1


let stage = 0;
//stage 0 = pre flop bet
//stage 1 = flop
//stage 2 = bet
//stage 3 = turn
//stage 4 = bet
//stage 5 = river
//stage 6 = bet

//*ORDER OF HANDS (ascending order)
//*one pair
//*two pair
//*three of a kind
//*straight
//*flush
//*full house
//*four of a kind
//*straight flush
//*royal flush

//!PROBLEM, I dont know how do have 'limits' on my cards, like
//! you cant draw 5 jacks right? but how do I limit that?
//?maybe make an object filled with all card types, and then subract when cards are drawn?
//! wait, I have to randomize the suites too, uhh.

let deck = {
    1: 4, //aces
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4, //jacks
    12: 4, //queens
    13: 4  //kings
};
//*making an array of suites, then when a random value from decks is created, it's then assigned a random suite
let suites = ['hearts', 'diamonds', 'clubs', 'spades']

    
//*AND THENNN, AFTER A RANDOM CARD AND SUITE IS MADE
//*THEY'RE PUSHED INTO AN ARRAY
//*AND THEN THE ARRAY IS CHECKED BEFORE GENERATING ANOTHER CARD TO PREVENT DUPLICARE VALUES

let cardsDealt = [];

let balance = 100;
const balanceText = document.getElementById('balance')
balanceText.innerHTML = balance;
const button = document.getElementById('temp')


const keysArray = Object.keys(deck)
console.log(keysArray.length) //!*you have to push all keys into an array, and then get the array length to find the amount of keys in an object

function checkEmpty(){
    //* a function to check if any of the keys values from the deck are 0
    //* if they are, remove them

    //forloop goes through all keys in deck
    ///if a key's value = 0, delete[key]
}
function generateNums(max){
    //*function to generate random numbers
    return Math.floor(Math.random()*max);
}

function randomNum(){
    //*function to display the random numbers, this function calls the generateNums() function
    switch(stage){
        case 1:
            console.log('flop') //generate three random cards
            console.log(generateNums(keysArray.length))
        break;
        case 3:
            console.log('turn')
            console.log(generateNums(keysArray.length))
        break;
        case 5:
            console.log('river')
            console.log(generateNums(keysArray.length))
        break;
        default:
            console.log('bruh error')
        break;
    }
    stage++;
}