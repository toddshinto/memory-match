var gameCards = document.getElementById('gameCards');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var firstCardClassesArray;
var secondCardClassesArray;
var firstCardIndex;
var secondCardIndex;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var hiddenCards = null;
var hiddenCard1;
var hiddenCard2;
var storeHiddenIndex = [];
var storeHiddenClasses  = [];
var clickBelow = document.querySelector('.click-below');
var goAgain = document.querySelector('.go-again');
var statsText = document.querySelectorAll('.statsText');
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
var winGif = document.getElementById('win-gif');
var playAgain = document.querySelector('.play-again-container');
var list = ['backpack',
            'books',
            'baseball',
            'bat',
            'burger',
            'fries',
            'milk',
            'cup',
            'eyes',
            'glasses',
            'pants',
            'shirt',
            'paper',
            'pencil',
            'tv',
            'remote',
            'shoes',
            'socks']
var pairList1 = ['backpack',
                  'baseball',
                  'burger',
                  'milk',
                  'eyes',
                  'pants',
                  'paper',
                  'tv',
                  'shoes']
var pairList2 = ['books',
                 'bat',
                 'fries',
                 'cup',
                 'glasses',
                 'shirt',
                 'pencil',
                 'remote',
                 'socks']
var mergeList = ['backpack_books',
                 'baseball_bat',
                 'burger_fries',
                 'milk_cup',
                 'eyes_glasses',
                 'pants_shirt',
                 'paper_pencil',
                 'tv_remote',
                 'shoes_socks'
                 ]

// ['css-logo',
//   'css-logo',
//   'docker-logo',
//   'docker-logo',
//   'gitHub-logo',
//   'gitHub-logo',
//   'html-logo',
//   'html-logo',
//   'js-logo',
//   'js-logo',
//   'mysql-logo',
//   'mysql-logo',
//   'node-logo',
//   'node-logo',
//   'php-logo',
//   'php-logo',
//   'react-logo',
//   'react-logo']

createCards();
gameCards.addEventListener('click', handleClick);
spongeAgain.addEventListener('click', resetGameSponge);
thomasAgain.addEventListener('click', resetGameThomas);
dinoAgain.addEventListener('click', resetGameDino);
spongebobButton.addEventListener('click', spongebobTheme);
thomasButton.addEventListener('click', thomasTheme);
dinoButton.addEventListener('click', dinoTheme);
smallDinoButton.addEventListener('click', dinoTheme);
smallSpongebobButton.addEventListener('click', spongebobTheme);
smallThomasButton.addEventListener('click', thomasTheme);

function resetGameSponge() {
  resetGame();
  spongebobTheme();
  for (let i = 0; i < 18; i++) {
    gameCards.children[i].lastElementChild.classList.remove('hidden');
  }
}

function resetGameThomas() {
  resetGame();
  thomasTheme();
  for (let i = 0; i < 18; i++) {
    gameCards.children[i].lastElementChild.classList.remove('hidden');
  }
}

function resetGameDino() {
  resetGame();
  dinoTheme();
  for (let i = 0; i < 18; i++) {
    gameCards.children[i].lastElementChild.classList.remove('hidden');
  }
}

function spongebobTheme() {
  storeHidden();
  if (startScreen.className != 'hidden') { //checks if start screen is hidden
    startScreen.className = 'hidden'; //if start screen is not hidden, sets to hidden
  }
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
  for (let i = 0; i < statsText.length; i++) {
    statsText[i].classList = 'statsText sponge-font';
  }
  document.querySelector('#bg').className = 'spongebob-bg'; //changes background
  if (winScreen.classList.value.includes('hidden')) { //changes win screen styling without changing hidden status
    winScreen.className = 'you-win spongebob-win hidden';
  } else {
    winScreen.className = 'you-win spongebob-win';
  }
  winGif.className = 'win-gif spongebob-gif'
  goAgain.className = 'go-again spongebob-again';
  clickBelow.className = 'click-below sponge-font';
  restoreHidden(); //restores matched cards during theme change
}

function thomasTheme() {
  storeHidden();
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
  for (let i = 0; i < statsText.length; i++) {
    statsText[i].classList = 'statsText thomas-font';
  }
  document.querySelector('#bg').className = 'thomas-bg';
  if (winScreen.classList.value.includes('hidden')) {
    winScreen.className = 'you-win thomas-win hidden';
  } else {
    winScreen.className = 'you-win thomas-win';
  }

  goAgain.className = 'go-again thomas-again';
  restoreHidden();
}

function dinoTheme() {
  storeHidden();
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
  for (let i = 0; i < statsText.length; i++) {
    statsText[i].classList = 'statsText dino-font';
  }
  document.querySelector('#bg').className = 'dino-bg';
  if (winScreen.classList.value.includes('hidden')) {
    winScreen.className = 'you-win dino-win hidden';
  } else {
    winScreen.className = 'you-win dino-win';
  }

  goAgain.className = 'go-again dino-again';
  restoreHidden();
}


function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  event.target.className += ' hidden';
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    console.log(event.target);
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    firstCardClassesArray = firstCardClasses.split(' ');
    secondCardClassesArray = secondCardClasses.split(' ');
    if (pairList1.includes(firstCardClassesArray[0])) {
      firstCardIndex = pairList1.indexOf(firstCardClassesArray[0]);
      secondCardIndex = pairList2.indexOf(secondCardClassesArray[0])
    } else {
      firstCardIndex = pairList2.indexOf(firstCardClassesArray[0]);
      secondCardIndex = pairList1.indexOf(secondCardClassesArray[0])
    }
    if (firstCardIndex === secondCardIndex) {
      storeHiddenClasses.push(firstCardIndex);
      firstCardClicked.previousElementSibling.classList.replace(firstCardClicked.previousElementSibling.classList[0], mergeList[firstCardIndex]);
      secondCardClicked.previousElementSibling.classList.replace(secondCardClicked.previousElementSibling.classList[0], mergeList[secondCardIndex])
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if (matches === maxMatches) {
        youWin.classList.remove('hidden');
        winGif.classList.remove('hidden');
        container.classList.add('hiddenFade');
        setTimeout(function () {
          playAgain.classList.remove('hidden');
        }, 5000);
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

function storeHidden() {
  for (let i = 0; i < (storeHiddenClasses.length); i++) {
    hiddenCard1 = pairList1[storeHiddenClasses[i]];
    hiddenCard2 = pairList2[storeHiddenClasses[i]];
    for (let x = 0; x < 18; x++) {
      if (gameCards.children[x].firstElementChild.classList.contains(hiddenCard1)) {
        storeHiddenIndex.push(x);
      } else if (gameCards.children[x].firstElementChild.classList.contains(hiddenCard2)) {
        storeHiddenIndex.push(x);
      }
    }
  }
}

function restoreHidden() {
  for (let i = 0; i < storeHiddenIndex.length; i++) {
    gameCards.children[storeHiddenIndex[i]].lastElementChild.classList.add('hidden');
  }
  storeHiddenIndex = [];
  hiddenCard1 = '';
  hiddenCard2 = '';
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
  playAgain.classList.add('hidden');
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  youWin.classList.add('hidden');
  createCards();
  container.classList.remove('hiddenFade');
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
  while (gameCards.lastElementChild) {
    gameCards.removeChild(gameCards.lastElementChild);
  }
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
