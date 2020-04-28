var gameCards = document.getElementById('gameCards');
var firstCardClicked;
var secondCardClicked;
var firstCardMergedItems;
var secondCardMergedItems;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var hiddenCards = null;
var storeHiddenIndex = [];
var storeHiddenClasses  = [];
var theme;
var removeItemsArray = [];
var clickBelow = document.querySelector('.click-below');
var goAgain = document.querySelector('.go-again');
var statsText = document.querySelectorAll('.statsText');
var container = document.querySelector('#container');
var congrats = document.getElementById('congrats');
var winScreen = document.querySelector("#win-screen");
var pokemonAgain = document.getElementById('pokemon-again');
var spongeAgain = document.getElementById('sponge-again');
var dinoAgain = document.getElementById('dino-again');
var thomasAgain = document.getElementById('thomas-again');
var youWin = document.querySelector('.you-win');
var pokemonButton = document.getElementById('pokemon');
var spongebobButton = document.getElementById('spongebob');
var thomasButton = document.getElementById('thomas');
var dinoButton = document.getElementById('dino');
var smallPokemonButton = document.getElementById('toPokemon');
var smallSpongebobButton = document.getElementById('toSpongebob');
var smallDinoButton = document.getElementById('toDino');
var smallThomasButton = document.getElementById('toThomas');
var startScreen = document.querySelector('.start-screen');
var winGif = document.getElementById('win-gif');
var playAgain = document.querySelector('.play-again-container');
const card1 = {
  firstItem: 'backpack',
  secondItem: 'books',
  mergedItems: 'backpack_books'
};
const card2 = {
  firstItem: 'baseball',
  secondItem: 'bat',
  mergedItems: 'baseball_bat'
};
const card3 = {
  firstItem: 'burger',
  secondItem: 'fries',
  mergedItems: 'burger_fries'
};
const card4 = {
  firstItem: 'milk',
  secondItem: 'cup',
  mergedItems: 'milk_cup'
};
const card5 = {
  firstItem: 'eyes',
  secondItem: 'glasses',
  mergedItems: 'eyes_glasses'
};
const card6 = {
  firstItem: 'pants',
  secondItem: 'shirt',
  mergedItems: 'pants_shirt'
};
const card7 = {
  firstItem: 'paper',
  secondItem: 'pencil',
  mergedItems: 'paper_pencil'
};
const card8 = {
  firstItem: 'tv',
  secondItem: 'remote',
  mergedItems: 'tv_remote'
};
const card9 = {
  firstItem: 'shoes',
  secondItem: 'socks',
  mergedItems: 'shoes_socks'
};
var allCards = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9
];

// var list = ['backpack',
//             'books',
//             'baseball',
//             'bat',
//             'burger',
//             'fries',
//             'milk',
//             'cup',
//             'eyes',
//             'glasses',
//             'pants',
//             'shirt',
//             'paper',
//             'pencil',
//             'tv',
//             'remote',
//             'shoes',
//             'socks']
// var pairList1 = ['backpack',
//                   'baseball',
//                   'burger',
//                   'milk',
//                   'eyes',
//                   'pants',
//                   'paper',
//                   'tv',
//                   'shoes']
// var pairList2 = ['books',
//                  'bat',
//                  'fries',
//                  'cup',
//                  'glasses',
//                  'shirt',
//                  'pencil',
//                  'remote',
//                  'socks']
// var mergeList = ['backpack_books',
//                  'baseball_bat',
//                  'burger_fries',
//                  'milk_cup',
//                  'eyes_glasses',
//                  'pants_shirt',
//                  'paper_pencil',
//                  'tv_remote',
//                  'shoes_socks'
//                  ]
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
addToRemoveItemsArray();
gameCards.addEventListener('click', handleClick);
spongeAgain.addEventListener('click', resetGameSponge);
thomasAgain.addEventListener('click', resetGameThomas);
dinoAgain.addEventListener('click', resetGameDino);
pokemonAgain.addEventListener('click', resetGamePokemon);
spongebobButton.addEventListener('click', spongebobTheme);
thomasButton.addEventListener('click', thomasTheme);
dinoButton.addEventListener('click', dinoTheme);
pokemonButton.addEventListener('click', pokemonTheme);
smallDinoButton.addEventListener('click', smallDinoTheme);
smallSpongebobButton.addEventListener('click', smallSpongebobTheme);
smallThomasButton.addEventListener('click', smallThomasTheme);
smallPokemonButton.addEventListener('click', smallPokemonTheme);

function smallPokemonTheme() {
  pokemonTheme();
}
function smallSpongebobTheme() {
  spongebobTheme();
}
function smallThomasTheme() {
  thomasTheme();
}
function smallDinoTheme() {
  dinoTheme();
}

function clearHidden() {
  for (let i = 0; i < 18; i++) {
    gameCards.children[i].lastElementChild.classList.remove('hidden');
  }
}

function resetGameSponge() {
  resetGame();
  spongebobTheme();
}
function resetGameThomas() {
  resetGame();
  thomasTheme();
}
function resetGameDino() {
  resetGame();
  dinoTheme();
}
function resetGamePokemon() {
  resetGame();
  pokemonTheme();
}

function spongebobTheme() {
  theme = 'spongebob';
  changeTheme(theme);
}
function thomasTheme() {
  theme = 'thomas';
  changeTheme(theme);
}
function dinoTheme() {
  theme = 'dino';
  changeTheme(theme);
}
function pokemonTheme() {
  theme = 'pokemon';
  changeTheme(theme);
}

function changeTheme(theme) {
  if (startScreen.className != 'hidden') { //checks if start screen is hidden
    startScreen.className = 'hidden'; //if start screen is not hidden, sets to hidden
  }
  document.querySelector('#title').className = theme+'-title'; //changes title format
  congrats.className = theme+'-title'; //changes congrats format
  let statsList = document.querySelectorAll('.stats'); //changes stat boxes formatting through setting classname
  for (let i = 0; i < statsList.length; i++) {
    statsList[i].className = 'stats '+ theme+'-stats';
  }
  document.querySelector('#misc-img').className = 'misc-img' +theme+'-img'; //changes bottom left image
  let cardList = document.querySelectorAll('.card-back'); //changes card backs
  for (let x = 0; x < cardList.length; x++) {
    cardList[x].className = 'card-back ' +theme+'-back';
  }
  for (let i = 0; i < statsText.length; i++) {
    statsText[i].classList = 'statsText '+ theme+'-font';
  }
  document.querySelector('#bg').className = theme+'-bg'; //changes background
  if (winScreen.classList.value.includes('hidden')) { //changes win screen styling without changing hidden status
    winScreen.className = 'you-win ' + theme+'-win hidden';
  } else {
    winScreen.className = 'you-win ' +theme+'-win';
  }
  winGif.className = 'win-gif ' + theme+'-gif'
  goAgain.className = 'go-again ' + theme+'-again';
  clickBelow.className = 'click-below ' + theme+'-font';
}

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  event.target.className += ' hidden';
  if (!firstCardClicked) {
    firstCardClicked = event.target;
  } else {
    secondCardClicked = event.target;
    gameCards.removeEventListener('click', handleClick);
    firstCardMergedItems = firstCardClicked.previousElementSibling.classList[1];
    secondCardMergedItems = secondCardClicked.previousElementSibling.classList[1];
    if (firstCardMergedItems === secondCardMergedItems) {
      storeHiddenClasses.push(firstCardMergedItems);
      setTimeout(function() {
        for (let i = 0; i < removeItemsArray.length; i++) {
          firstCardClicked.previousElementSibling.classList.remove(removeItemsArray[i]);
          secondCardClicked.previousElementSibling.classList.remove(removeItemsArray[i]);
        }
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
          clearHidden();
          setTimeout(function () {
            playAgain.classList.remove('hidden');
          }, 5000);
        }
      }, 1000);
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

function displayStats() {
  document.getElementById('games').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  /*document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);*/
}

function resetGame() {
  playAgain.classList.add('hidden');
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  firstCardClicked = '';
  secondCardClicked = '';
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

function addToRemoveItemsArray() {
  for (let i = 0; i < allCards.length; i++) {
    removeItemsArray.push(allCards[i].firstItem, allCards[i].secondItem);
  }
}

function shuffleCards() {
  for (let i = allCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }
}

function createCards() {
  while (gameCards.lastElementChild) {
    gameCards.removeChild(gameCards.lastElementChild);
  }
  shuffleCards();
  for (let i = 0; i < 9; i++) {
    let newCard = document.createElement('div');
    newCard.className = 'card col-2 col-custom';
    let newCardBack = document.createElement('div');
    newCardBack.className = 'card-back';
    let newCardFront = document.createElement('div');
    newCardFront.className = allCards[i].firstItem + ' ' + allCards[i].mergedItems + ' card-front';
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    gameCards.appendChild(newCard);
  }
  for (let i = 0; i < 9; i++) {
    let newCard = document.createElement('div');
    newCard.className = 'card col-2 col-custom';
    let newCardBack = document.createElement('div');
    newCardBack.className = 'card-back';
    let newCardFront = document.createElement('div');
    newCardFront.className = allCards[i].secondItem + ' ' + allCards[i].mergedItems + ' card-front';
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    gameCards.appendChild(newCard);
  }
}
