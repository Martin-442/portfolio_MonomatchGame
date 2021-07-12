// @author Martin Schwedes
// game logic on screen

const cardsOnScreen = [
    '#card1',
    '#card2'
];
let cardSet1 = [];
let cardSet2 = [];

// fwrxh array "cards" from theDoubleAlgorithm.js
const gameCards = cards;

// create template for number buttons
const buttonsOnCardTemplate = document.querySelector('._gameset_zen button');
// define parts of gameplay
const welcomeCard = document.querySelector('._gamestart');
const GameZenCard = document.querySelector('._gameset_zen');
// define button elements
const newGameButton = welcomeCard.querySelector('._startgame');
const newCardsButton = document.querySelector('._newcards');

// store opponents cards
let opponent = '';
let angle = '(0deg)';
const underLineChar = [6, 9, 16, 18, 19, 51]; 
let allowRotation = false; 
let allowIcons = true; 

/* random set of rotation/no rotation and icons/numbers */
allowRotation = Math.floor(Math.random()*2); 
allowIcons = Math.floor(Math.random()*2); 


initGameScreen(); 
// initZenMode();

function initGameScreen() {
    welcomeCard.style.display = 'flex';
    newGameButton.classList.add('font__Kalem'); 
    welcomeCard.querySelector('h1').classList.add('font__Kalem'); 
    welcomeCard.querySelector('p').classList.add('font__Kalem'); 
    GameZenCard.style.display = 'none';
    newCardsButton.style.display = 'none';
    newGameButton.addEventListener('click', startNewZenGame );
}

function shuffleNums(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function initZenMode() {
    // let new game button disappear
    newCardsButton.style.display = 'block';
    newCardsButton.classList.add('font__Kalem'); 
    newCardsButton.classList.add('fadeout');
    // remove all button elements from screen
    const removeButtons = document.querySelectorAll('._gameset_zen button');
    for (const i of removeButtons) {
        i.remove();
    }

    // loop through cards in gameset (2 cards)
    for (const oneCardOnScreen of cardsOnScreen) {
        // random card from card stack
        const randomCard = Math.floor(Math.random() * gameCards.length);
        // shuffle numbers in card array
        const randomCardNums = shuffleNums(gameCards[randomCard]);
        // delete random card from array to avoid same cards in the gameset
        gameCards.splice(randomCard,1);
        // create 2 cardsets defined outside the loop
        if (oneCardOnScreen == cardsOnScreen[0]) {
            cardSet1 = randomCardNums;
        } else {
            cardSet2 = randomCardNums;
        }

        // loop through numbers for one card
        // loop through numbers on card to create a visual card set
        for (const number of randomCardNums) {
            const buttonOnCard = buttonsOnCardTemplate.cloneNode(true);
            const buttonOnCardText = buttonOnCard.querySelector('span');
            document.querySelector(oneCardOnScreen).append(buttonOnCard);
            buttonOnCardText.classList.add('cardNr'+number);
            if (allowIcons) { /* icons or unbers */
                buttonOnCardText.innerHTML = fe_icons_57[number];
            } else {
                buttonOnCardText.innerText = number;
            }
            buttonOnCardText.classList.add('font__Kalem');
            if (allowRotation) { /* rotate for more fun :) */ 
                angle = '(' + (Math.floor(Math.random() * 5)) * 72 + "deg)";
                buttonOnCardText.style.transform = 'rotate' + angle;
                if (underLineChar.includes(number)) {
                    buttonOnCardText.style.textDecoration = 'underline';
                    buttonOnCardText.style.paddingTop = '0.1rem';
                }
            }
        }

        // add eventListener on each number
        const numbersOnCards = document.querySelectorAll(oneCardOnScreen + ' button span');
        for (const eachNumA of numbersOnCards) {
            eachNumA.addEventListener('click', checkNum);
        }
    }
}

function checkNum(event) {
    const clickedClasses = this.classList; 
    const clickedNum = clickedClasses[0].substr(6, clickedClasses[0].length - 6); /* number from className, ie 'cardNr23' */
    const clickedNumParent = this.parentElement.parentElement;
    const clickedNumElement = document.querySelector('#' + clickedNumParent.id + ' .cardNr' + clickedNum);
    clickedNumElement.style.color = 'var(--click-number)';
    let matchingNumElement = '';
    if (clickedNumParent.id == 'card1') {
        matchingNumElement = document.querySelector('#card2 .cardNr' + clickedNum);
        if (cardSet2.includes(parseInt(clickedNum))) {
            clickedNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            opponent = matchingNumElement.parentElement;
            opponent.parentElement.classList.add('success');
            opponent.style.backgroundColor = 'var(--click-success)';
            endTheGame();
        }
    } else if (clickedNumParent.id == 'card2') {
        matchingNumElement = document.querySelector('#card1 .cardNr' + clickedNum);
        if (cardSet1.includes(parseInt(clickedNum))) {
            clickedNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            opponent = matchingNumElement.parentElement;
            opponent.parentElement.classList.add('success');
            opponent.style.backgroundColor = 'var(--click-success)';
            endTheGame(); 
        }
    }
}

function startNewZenGame() {
    welcomeCard.style.display = 'none';
    GameZenCard.style.display = 'flex';
    initZenMode(); 
}

function startNextZenGame() {
    newCardsButton.removeEventListener('click', initZenMode );
    newCardsButton.classList.toggle('fadein');
    opponent.parentElement.classList.remove('success');
    initZenMode(); 
}

function endTheGame() {
    // removing all eventListeners for the numbers
    const removeEL = document.querySelectorAll('button span')
    for (const i of removeEL) {
        i.removeEventListener('click', checkNum);
    }
    /* show new game button */
    newCardsButton.classList.add('fadein');
    newCardsButton.addEventListener('click', startNextZenGame );
}



// to do: 
// - timer
// - 2 player mode