const gridDisplay = document.getElementById('grid')
const canvas = document.createElement('canvas');
const scoreSpan = document.getElementById('score')
const notes = document.getElementById('notes')
const MAX_SCORE = 6
const cardsArr = ['imglime/a1.JPG', 'imglime/a2.JPG', 'imglime/a3.JPG',
    'imglime/a4.JPG', 'imglime/a5.JPG', 'imglime/a6.JPG']
let indices = [0, 1, 2, 3, 4, 5]
let card1 = null, card2 = null;
let score = 0

init()
function init() {
    indices = [...indices, ...indices]
    indices.sort(() => 0.5 - Math.random())
    canvas.width = 150; 
    canvas.height = 150;
    const context = canvas.getContext('2d');
    context.fillStyle = '#e9d94e'; 
    context.fillRect(0, 0, canvas.width, canvas.height);
    createBoard()
}

function createBoard() {
       gridDisplay.innerHTML=''
    
    indices.forEach( (i) => {
        const img = document.createElement('img')
        img.classList.add('card')
        img.setAttribute('src', canvas.toDataURL())
        img.setAttribute('data-id', i)
        img.addEventListener('click', cardFlip)
        gridDisplay.appendChild(img)
    })
}

function cardFlip() {
 
    this.style.cursor = 'auto';
    this.removeEventListener('click', cardFlip);
        // Is this the first card being flipped?
    if (card1 == null) {
            card1 = this;
           this.src = cardsArr[this.getAttribute('data-id')];
        notes.innerHTML=' : '
        notes.innerHTML+='um thinking...'
    }else {card2 = this;
      
            checkMatch();
    }
}

function checkMatch() {
    if (card1.getAttribute('data-id') === card2.getAttribute('data-id'))    
        {card1.classList.add('matched')
        card2.classList.add('matched')
        card1 = null
        card2 = null
        score = score + 1
        scoreSpan.innerText = score
        notes.innerHTML=' : yuppa, you got a match' 
        if (score === MAX_SCORE) {
            gameOver()
        }
    }
    else {
        card1.img.setAttribute('src', 'imglime/orange.PNG')
        notes.innerHTML=' : '
        disableClicks()
        setTimeout(restoreCards, 100)
    }
}

function restoreCards() {
    card1.src = canvas.toDataURL()
    card2.src = canvas.toDataURL()
    card1 = null
    card2 = null
    enableClicks()
}

function disableClicks() {
    const cards = document.querySelectorAll('.card:not(.matched)')
    cards.forEach( c => {
        c.removeEventListener('click', cardFlip)
        c.style.cursor = 'auto'
    })
}

function enableClicks() {
    const cards = document.querySelectorAll('.card:not(.matched)')
    cards.forEach( c => {
        c.addEventListener('click', cardFlip)
        c.style.cursor = 'pointer'
    })
}

function gameOver() {
    const go = document.createElement('div')
    go.innerHTML = 'Congratulations <br>you have got them all'
    go.classList.add('gameover')
    gridDisplay.appendChild(go) 
    /*setTimeout( gridDisplay.removeChild(go) ,2000) */
  
   setTimeout( createBoard,3000)
 
}
