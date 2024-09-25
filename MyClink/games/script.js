document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    const colors = ['🍎', '🍌', '🍇', '🍍', '🍓', '🍑', '🍒', '🍉'];
    let cards = [...colors, ...colors];
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;

    function initializeBoard() {
        board.innerHTML = '';
        cards.sort(() => Math.random() - 0.5); // Shuffle cards
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-card', card);
            cardElement.addEventListener('click', flipCard);
            board.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('flipped')) return;
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-card');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;

        if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
            matchedPairs++;
            if (matchedPairs === colors.length) {
                setTimeout(() => alert('You Win!'), 500);
            }
            flippedCards = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }

    function restartGame() {
        flippedCards = [];
        matchedPairs = 0;
        initializeBoard();
    }

    restartBtn.addEventListener('click', restartGame);
    initializeBoard();
});
