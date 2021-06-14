// @author Martin Schwedes
// game logic on screen

const cardsOnScreen = [
    '#card1',
    '#card2'
];
let setCard1 = [];
let setCard2 = [];


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
    const removeEL = document.querySelectorAll('a')
    for (const i of removeEL) {
        i.removeEventListener('click', checkNum);
    }
}

function checkNum(event) {
    const clickedNum = event.srcElement.innerText;
    const clickedNumParent = event.srcElement.parentElement;
    const clickedNumElement = document.querySelector('#' + clickedNumParent.id + ' .cardNr' + clickedNum);
    clickedNumElement.style.color = 'black';
    let matchingNumElement = '';
    if (clickedNumParent.id == 'card1') {
        matchingNumElement = document.querySelector('#card2 .cardNr' + clickedNum);
        if (setCard2.includes(parseInt(clickedNum))) {
            clickedNumElement.style.backgroundColor = 'green';
            matchingNumElement.style.backgroundColor = 'green';
            endTheGame();
        }
    } else if (clickedNumParent.id == 'card2') {
        matchingNumElement = document.querySelector('#card1 .cardNr' + clickedNum);
        if (setCard1.includes(parseInt(clickedNum))) {
            clickedNumElement.style.backgroundColor = 'green';
            matchingNumElement.style.backgroundColor = 'green';
            endTheGame(); 
        }
    }
}


for (const oneCardOnScreen of cardsOnScreen) {
    const randomCard = Math.floor(Math.random() * gameCards.length);
    let randomCardNums = gameCards[randomCard];
    gameCards.splice(randomCard,1);
    randomCardNums = shuffleNums(randomCardNums);
    for (const number of randomCardNums) {
        const newaHTML = document.querySelector(oneCardOnScreen + ' a').cloneNode(true);
        document.querySelector(oneCardOnScreen).append(newaHTML);
        newaHTML.innerText = number;
        newaHTML.classList.add('cardNr'+number);
    }
    document.querySelector(oneCardOnScreen + ' a').remove();
    if (oneCardOnScreen == cardsOnScreen[0]) {
        setCard1 = randomCardNums;
    } else {
        setCard2 = randomCardNums;
    }

    const numbersOnCards = document.querySelectorAll(oneCardOnScreen + ' a');
    for (const eachNumA of numbersOnCards) {
        eachNumA.addEventListener('click', checkNum);
    }
}


// to do: 
// - other font
// - timer
// - choose the amount of numbers on a card
// - rotate numbers / random size
// - change numbers to icons


