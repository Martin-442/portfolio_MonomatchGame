// @author Martin Schwedes
// game logic on screen

const cardsOnScreen = [
    '#card1',
    '#card2'
];
let cardSet1 = [];
let cardSet2 = [];


const gameCards = cards;

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

function endTheGame() {
    // removing all eventListeners for the numbers
    const removeEL = document.querySelectorAll('button span')
    for (const i of removeEL) {
        i.removeEventListener('click', checkNum);
    }
}

function checkNum(event) {
    console.log(this.innerText);
    const clickedNum = this.innerText;
    const clickedNumParent = this.parentElement.parentElement;
    const clickedNumElement = document.querySelector('#' + clickedNumParent.id + ' .cardNr' + clickedNum);
    console.log(clickedNumElement);
    clickedNumElement.style.color = 'var(--click-number)';
    let matchingNumElement = '';
    if (clickedNumParent.id == 'card1') {
        matchingNumElement = document.querySelector('#card2 .cardNr' + clickedNum);
        if (cardSet2.includes(parseInt(clickedNum))) {
            clickedNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            matchingNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            endTheGame();
        }
    } else if (clickedNumParent.id == 'card2') {
        matchingNumElement = document.querySelector('#card1 .cardNr' + clickedNum);
        if (cardSet1.includes(parseInt(clickedNum))) {
            clickedNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            matchingNumElement.parentElement.style.backgroundColor = 'var(--click-success)';
            endTheGame(); 
        }
    }
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
    const buttonsOnCardTemplate = document.querySelector(oneCardOnScreen + ' button');
    // remove template
    buttonsOnCardTemplate.remove();
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


// to do: 
// - timer
// - choose the amount of numbers on a card
// - rotate numbers / random size
// - change numbers to icons