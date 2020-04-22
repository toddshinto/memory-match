var gameCards = document.getElementById('gameCards');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var hiddenCards;
var playAgain = document.getElementById('play-again');
var youWin = document.querySelector('.you-win');
var cards = gameCards.children;
var cardsFrag = document.createDocumentFragment();
var list = ['css-logo',
  'css-logo',
  'docker-logo',
  'docker-logo',
  'gitHub-logo',
  'gitHub-logo',
  'html-logo',
  'html-logo',
  'js-logo',
  'js-logo',
  'mysql-logo',
  'mysql-logo',
  'node-logo',
  'node-logo',
  'php-logo',
  'php-logo',
  'react-logo',
  'react-logo']

createCards();
gameCards.addEventListener('click', handleClick);
playAgain.addEventListener('click', resetGame);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  event.target.className += ' hidden';
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses === secondCardClasses) {
      console.log('match');
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if (matches === maxMatches) {
        youWin.classList.remove('hidden');
      }
    } else {
      console.log('no match');
      setTimeout(function () {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++;
        displayStats();
      }, 1000);
    }
  }
}

function displayStats() {
  document.getElementById('games').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
  if (!attempts) {
    return '0%';
  }
  var score = (matches / attempts) * 100;
  return Math.trunc(score) + '%';
}

function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  youWin.classList.add('hidden');
  shuffleCards();
}

function resetCards() {
  hiddenCards = document.querySelectorAll('.card-back');
  for (let i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden');
  }
}

function shuffleCards() {
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}

function createCards() {
  shuffleCards();
  for (let i = 0; i < 18; i++) {
    let newCard = document.createElement('div');
    newCard.className = 'card col-2 col-custom';
    let newCardBack = document.createElement('div');
    newCardBack.className = 'card-back';
    let newCardFront = document.createElement('div');
    newCardFront.className = list[i] + ' ' + 'card-front';
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    gameCards.appendChild(newCard);
  }
}
