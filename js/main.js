
//definition of the cards and their properties
var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];


//an initially empty arraymto store cards that user turns
var cardsInPlay = [];


//variable for score initially as 0 to be added upon each time the cards match
var score = 0;


//function that determines whether the cards rank matches and then defines the logic for each eventuality.
var checkForMatch = function(){
	if (cardsInPlay.length === 2)
	{
		if(cardsInPlay[0] === cardsInPlay[1])
		{
			alert("You found a match!");
			score = score + 100;
			var userScore = document.getElementById('userScore');
			userScore.innerHTML=score;	
			
		}

		else if (cardsInPlay[0] !== cardsInPlay[1])
			{
				alert("Sorry, try again.");
				score = score - 5;
				var userScore = document.getElementById('userScore');
			userScore.innerHTML=score;	
			}
			
	}
};


//function defining the logic after a card is clicked 
var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);

	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);

//disables users gaining points by clicking the same card twice.
	this.removeEventListener('click', flipCard);

//the following removes the event listener from envoking this function once two cards have been drawn
	if (cardsInPlay.length === 2){
		document.getElementsByTagName('img')[0].removeEventListener('click',flipCard);
		document.getElementsByTagName('img')[1].removeEventListener('click',flipCard);
		document.getElementsByTagName('img')[2].removeEventListener('click',flipCard);
		document.getElementsByTagName('img')[3].removeEventListener('click',flipCard);
	}

	checkForMatch();
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
};


//envoked when the page is loaded and is used to present the initial state
var createBoard = function(){
	for (var i = 0; i < cards.length; i++) {

//calls the shuffle function that randomises the cards on start up
		shuffle(cards);

//statements to create the cards
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}

};


var resetCards = function(){
	
//putting the cards back to their initial state showing the card back
	document.getElementsByTagName('img')[0].setAttribute('src','images/back.png')
	document.getElementsByTagName('img')[1].setAttribute('src','images/back.png')
	document.getElementsByTagName('img')[2].setAttribute('src','images/back.png')
	document.getElementsByTagName('img')[3].setAttribute('src','images/back.png')

//empty the cards in play array
	cardsInPlay=[];

//resetting the game shuffles the cards
	shuffle(cards);

//when the game is reset so are the cards event listeners
	document.getElementsByTagName('img')[0].addEventListener('click',flipCard);
	document.getElementsByTagName('img')[1].addEventListener('click',flipCard);
	document.getElementsByTagName('img')[2].addEventListener('click',flipCard);
	document.getElementsByTagName('img')[3].addEventListener('click',flipCard);
} 


//shuffle randomises the cards order when called
function shuffle(cards) {
    for (let i = cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }
}


//enable the reset button to react when clicked
document.getElementById('reset').addEventListener('click', resetCards);


createBoard();

