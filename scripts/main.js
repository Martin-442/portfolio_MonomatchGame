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
const buttonsOnCardTemplate = document.querySelector('#gameset button');
// new game button
const newGameButton = document.querySelector('#newgame');

// store opponents cards
let opponent = '';

initScreen();



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

function initScreen() {
    // let new game button disappear
    newGameButton.classList.add('font__Kalem'); 
    newGameButton.classList.add('fadeout');
    // remove all button elements from screen
    const removeButtons = document.querySelectorAll('#gameset button');
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
            buttonOnCardText.innerText = number;
            buttonOnCardText.classList.add('font__Kalem');
        }

        // add eventListener on each number
        const numbersOnCards = document.querySelectorAll(oneCardOnScreen + ' button span');
        for (const eachNumA of numbersOnCards) {
            eachNumA.addEventListener('click', checkNum);
        }
    }
}

function checkNum(event) {
    const clickedNum = this.innerText;
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

function startNextGame() {
    newGameButton.removeEventListener('click', initScreen );
    newGameButton.classList.toggle('fadein');
    opponent.parentElement.classList.remove('success');
    initScreen(); 
}

function endTheGame() {
    // removing all eventListeners for the numbers
    const removeEL = document.querySelectorAll('button span')
    for (const i of removeEL) {
        i.removeEventListener('click', checkNum);
    }
    /* show new game button */
    newGameButton.classList.add('fadein');
    newGameButton.addEventListener('click', startNextGame );
}





// to do: 
// - timer
// - choose the amount of numbers on a card
// - rotate numbers / random size
// - change numbers to icons