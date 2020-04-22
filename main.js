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

gameCards.addEventListener('click', handleClick);
playAgain.addEventListener('click', resetGame)

function handleClick(event) {
  if(event.target.className.indexOf('card-back') === -1) {
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
      setTimeout(function() {
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
}

function resetCards() {
  hiddenCards = document.querySelectorAll('.card-back');
  for (let i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden');
  }
}
