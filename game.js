var Game = function() {
    this.verifyInputs = [];
    this.words = {};
    this.solution = '';
    this.guessStatus = [];
    this.times = 0;
    this.correctCount = 0;
}

Game.prototype.play = function() {
    this.words = generateWords();
    this.solution = this.words.solution;

    this.hint('正确答案有 ' + this.solution.length + '个字哦～', 'system');

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
    let correctThisTime = 0;

    for (let i = 0; i < guessValue.length; i++) {
        for (let j = 0; j < solutionChars.length; j++) {
            if (!this.guessStatus[j] && guessChars[i] === solutionChars[j]) {
                this.guessStatus[j] = true;
                correctThisTime++;
            }
        }
    }

    this.times++;
    this.correctCount = this.guessStatus.filter(item => { return item; }).length;
    this.hint(...generateHint(guessValue, this.correctCount, this.solution.length, correctThisTime, this.times));
}

Game.prototype.playVoice = function() {
    speak(this.solution);
}

Game.prototype.hint = function(text, ...classList) {
    let hint = document.getElementById('hint-text')
    hint.innerText = text;
    hint.classList.remove(...hint.classList.values());
    hint.classList.add(...classList);
}

Game.prototype.answer = function() {
    for (let i = 0; i < this.solution.length; i++) {
        this.guessStatus[i] = true;
    }
    fillVerifyArea(this.solution, this.verifyInputs, this.guessStatus);
}


function generateWords() {
    return chooseRandomly(words);
}

function guess() {
    window.game.guess();
}

function answer() {
    window.game.answer();
}

function playVoice() {
    window.game.playVoice();
}
function reloadPage(){
	location.reload();
}

window.game = window.game || new Game();
window.game.play();
