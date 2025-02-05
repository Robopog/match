const amount = 12;
const numbers = [];

const board = document.querySelector(".board");
const resetButton = document.querySelector("button");

resetButton.addEventListener("click", resetGame);


board.style.gridTemplateColumns = `repeat(6, 1fr)`;

for(let i = 1; i <= amount; i += 1) {
    numbers.push(i, i);
}


for(let i = 1; i <= amount * 2; i += 1) {
    const rand = Math.floor(Math.random() * numbers.length);
    const div = document.createElement("div");
    div.innerHTML = `<span>${numbers[rand]}</span>`;
    board.appendChild(div);
    numbers.splice(rand, 1);

    div.addEventListener("click", (event) => {
        if(event.target.classList.contains('hideen') ||
         event.target.classList.contains('showing')) {
            return;
        }

        if(board.querySelectorAll('.showing').length === 2) {
            return;
        }

        playAudio('./match.wav');

        event.target.classList.add("showing");  

        check();
    });

}

function check() {
    const cards = board.querySelectorAll('.showing');

    if (cards.length === 2) {
        const first = cards[0];
        const second = cards[1];

        if (first.textContent === second.textContent) {

            setTimeout(() => {
                first.classList.remove('showing');
                second.classList.remove('showing');
                first.classList.add('hidden');
                second.classList.add('hidden');

                checkIfDone();
            }, 1000);

        } else {
            setTimeout(() => {
            first.classList.remove('showing');
            second.classList.remove('showing');

            }, 1000);
        }
    }
}

function checkIfDone() {
    const cards = board.querySelectorAll('div:not(.hidden)');

    if(cards.length === 0) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()
        playAudio('./win.wav')
    }
}

function playAudio(src) {
    const audio = document.createElement('audio');
    audio.src = src;
    audio.play();
}

function resetGame() {
    location.reload();
}