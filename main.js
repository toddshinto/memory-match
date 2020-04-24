var gameCards = document.getElementById('gameCards');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var hiddenCards = null;
var hiddenClass = null;
var hiddenIndex = [];
var storeHiddenClasses  = null;
var container = document.querySelector('#container');
var congrats = document.getElementById('congrats');
var winScreen = document.querySelector("#win-screen");
var spongeAgain = document.getElementById('sponge-again');
var dinoAgain = document.getElementById('dino-again');
var thomasAgain = document.getElementById('thomas-again');
var youWin = document.querySelector('.you-win');
var spongebobButton = document.getElementById('spongebob');
var thomasButton = document.getElementById('thomas');
var dinoButton = document.getElementById('dino');
var smallSpongebobButton = document.getElementById('toSpongebob');
var smallDinoButton = document.getElementById('toDino');
var smallThomasButton = document.getElementById('toThomas');
var startScreen = document.querySelector('.start-screen');
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
spongeAgain.addEventListener('click', resetGame);
thomasAgain.addEventListener('click', resetGame);
dinoAgain.addEventListener('click', resetGame);
spongebobButton.addEventListener('click', spongebobTheme);
thomasButton.addEventListener('click', thomasTheme);
dinoButton.addEventListener('click', dinoTheme);
smallDinoButton.addEventListener('click', dinoTheme);
smallSpongebobButton.addEventListener('click', spongebobTheme);
smallThomasButton.addEventListener('click', thomasTheme);

function spongebobTheme() {
  if (startScreen.className != 'hidden') { //checks if start screen is hidden
    startScreen.className = 'hidden'; //if start screen is not hidden, sets to hidden
  }
  getHiddenIndex(); //stores matched cards to presere during theme change
  document.querySelector('#title').className = 'spongebob-title'; //changes title format
  congrats.className += ' spongebob-title'; //changes congrats format
  let statsList = document.querySelectorAll('.stats'); //changes stat boxes formatting through setting classname
  for (let i = 0; i < statsList.length; i++) {
    statsList[i].className = 'stats spongebob-stats';
  }
  document.querySelector('#misc-img').className = 'misc-img spongebob-img'; //changes bottom left image
  let cardList = document.querySelectorAll('.card-back'); //changes card backs
  for (let x = 0; x < cardList.length; x++) {
    cardList[x].className = 'card-back spongebob-back';
  }
  document.querySelector('#bg').className = 'spongebob-bg'; //changes background
  if (winScreen.classList.value.includes('hidden')) { //changes win screen styling without changing hidden status
    winScreen.className = 'you-win spongebob-win hidden';
  } else {
    winScreen.className = 'you-win spongebob-win';
  }
  restoreHidden(); //restores matched cards during theme change
}

function thomasTheme() {
  getHiddenIndex();
  if (startScreen.className != 'hidden') {
    startScreen.className = 'hidden';
  }
  document.querySelector('#title').className = 'thomas-title';
  let statsList = document.querySelectorAll('.stats');
  for (let i = 0; i < statsList.length; i++) {
    statsList[i].className = 'stats thomas-stats';
  }
  document.querySelector('#misc-img').className = 'misc-img thomas-img';
  let cardList = document.querySelectorAll('.card-back');
  for (let x = 0; x < cardList.length; x++) {
    cardList[x].className = 'card-back thomas-back';
  }
  document.querySelector('#bg').className = 'thomas-bg';
  if (winScreen.classList.value.includes('hidden')) {
    winScreen.className = 'you-win thomas-win hidden';
  } else {
    winScreen.className = 'you-win thomas-win';
  }
  restoreHidden();
}

function dinoTheme() {
  getHiddenIndex();
  if (startScreen.className != 'hidden') {
    startScreen.className = 'hidden';
  }
  document.querySelector('#title').className = 'dino-title';
  let statsList = document.querySelectorAll('.stats');
  for (let i = 0; i < statsList.length; i++) {
    statsList[i].className = 'stats dino-stats';
  }
  document.querySelector('#misc-img').className = 'misc-img dino-img';
  let cardList = document.querySelectorAll('.card-back');
  for (let x = 0; x < cardList.length; x++) {
    cardList[x].className = 'card-back dino-back';
  }
  document.querySelector('#bg').className = 'dino-bg';
  if (winScreen.classList.value.includes('hidden')) {
    winScreen.className = 'you-win dino-win hidden';
  } else {
    winScreen.className = 'you-win dino-win';
  }
  restoreHidden();
}


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
      hiddenClass = firstCardClicked.previousElementSibling.getAttribute('class').split(' ');
      if (storeHiddenClasses == null) {
        storeHiddenClasses = hiddenClass[0] + ' ';
      }  else {
        storeHiddenClasses += hiddenClass[0] + ' ';
      }
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if (matches === maxMatches) {
        youWin.classList.replace('hidden', 'show');
        congrats.classList.add('show');
        congrats.classList.remove('hiddenFade');
        container.classList.add('hiddenFade');
        setTimeout(function () {
          document.querySelector('.play-again-container').classList.remove('hidden');
        }, 1500);
      }
    } else {
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

function getHiddenIndex() {
  for (let i = 0; i < 18; i++) {
    if (gameCards.children[i].lastElementChild.classList.value.includes('hidden')) {
      hiddenIndex.push(i);
      }
  }
}

function restoreHidden() {
  for (let i = 0; i < hiddenIndex.length; i++) {
    let x = hiddenIndex[i];
    gameCards.children[hiddenIndex[i]].lastElementChild.classList.value += 'hidden';
  }
}

function displayStats() {
  document.getElementById('games').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  /*document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);*/
}

/*function calculateAccuracy(attempts, matches) {
  if (!attempts) {
    return '0%';
  }
  var score = (matches / attempts) * 100;
  return Math.trunc(score) + '%';
}*/

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
