var Game = function() {
    this.verifyInputs = [];
    this.words = {};
    this.solution = '';
    this.guessStatus = [];
}

Game.prototype.play = function() {
    this.words = generateWords();
    this.solution = this.words.solution;

    this.verifyInputs = generateVerifyInputs(this.solution.length);
    renderVerifyArea(this.verifyInputs);
    for (let i = 0; i < this.solution.length; i++) {
        this.guessStatus.push(false);
    }
}

Game.prototype.guess = function() {
    const guessValue = document.getElementById('guess-input').value;
    this.verify(guessValue);

    fillVerifyArea(this.solution, this.verifyInputs, this.guessStatus);
}

Game.prototype.verify = function(guessValue) {
    const guessChars = guessValue.split("");
    const solutionChars = this.solution.split("");
    for (let i = 0; i < guessValue.length; i++) {
        for (let j = 0; j < solutionChars.length; j++) {
            if (guessChars[i] === solutionChars[j]) {
                this.guessStatus[j] = true;
            }
        }
    }
}

Game.prototype.playVoice = function() {
    speak(this.solution);
}


function generateWords() {
    return words[Math.floor(Math.random() * words.length)];
}

function guess() {
    window.game.guess();
}

function playVoice() {
    window.game.playVoice();
}

window.game = window.game || new Game();
window.game.play();
