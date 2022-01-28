const GameGuessStatus = {
    none: 0,
    right: 1,
    hint: 2,
}

var Game = function() {
    this.verifyInputs = [];
    this.words = {};
    this.solution = '';
    this.guessStatus = [];
    this.times = 0;
    this.correctCount = 0;
    this.hintCount = 0;
    this.isComplete = false;
}

Game.prototype.play = function() {
    this.words = generateWords();
    this.solution = this.words.solution;

    this.initSystemHint();

    this.verifyInputs = generateVerifyInputs(this.solution.length);
    renderVerifyArea(this.verifyInputs);
    for (let i = 0; i < this.solution.length; i++) {
        this.guessStatus.push(GameGuessStatus.none);
    }
}

Game.prototype.guess = function() {
    if (this.isComplete) {
        return;
    }
    const guessValue = document.getElementById('guess-input').value;
    this.verify(guessValue);

    fillVerifyArea(this.solution, this.verifyInputs, this.guessStatus);
}

Game.prototype.verify = function(guessValue) {
    if (guessValue.length === 0) {
        return [chooseRandomly(emptyGuess), 'warning'];
    }

    const guessChars = guessValue.split("");
    const solutionChars = this.solution.split("");
    let correctThisTime = 0;

    for (let i = 0; i < guessValue.length; i++) {
        for (let j = 0; j < solutionChars.length; j++) {
            if (this.guessStatus[j] == GameGuessStatus.none && guessChars[i] === solutionChars[j]) {
                this.guessStatus[j] = GameGuessStatus.right;
                correctThisTime++;
            }
        }
    }

    this.times++;
    this.updateData(correctThisTime, 0);
}

Game.prototype.playVoice = function() {
    speak(this.solution);
}

Game.prototype.hintText = function(text, ...classList) {
    let hint = document.getElementById('hint-text')
    hint.innerText = text;
    hint.classList.remove(...hint.classList.values());
    hint.classList.add(...classList);
}

Game.prototype.updateData = function(guessCorrectThisTime, hintCountThisTime) {
    this.correctCount = this.guessStatus.filter(item => { return item === GameGuessStatus.right; }).length;
    this.hintCount = this.guessStatus.filter(item => { return item === GameGuessStatus.hint; }).length;
    if (this.correctCount + this.hintCount >= this.solution.length) {
        this.isComplete = true;
    }
    this.hintText(...generateHint(this.correctCount, this.hintCount, this.solution.length, guessCorrectThisTime, hintCountThisTime, this.times));
}

Game.prototype.hint = function() {
    if (this.isComplete) {
        return;
    }
    
    emptyidxs = [];
    this.guessStatus.forEach((state, idx) => {
        if (state === GameGuessStatus.none) {
            emptyidxs.push(idx);
        }
    });
    this.guessStatus[chooseRandomly(emptyidxs)] = GameGuessStatus.hint;
    this.updateData(0, 1);
    fillVerifyArea(this.solution, this.verifyInputs, this.guessStatus);
}

Game.prototype.answer = function() {
    let hintCount = 0;
    for (let i = 0; i < this.solution.length; i++) {
        if (this.guessStatus[i] === GameGuessStatus.none) {
            this.guessStatus[i] = GameGuessStatus.hint;
            hintCount++;
        }
    }
    this.updateData(0, hintCount);
    fillVerifyArea(this.solution, this.verifyInputs, this.guessStatus);
}

Game.prototype.initSystemHint = function(){
	this.hintText('正确答案有 ' + this.solution.length + '个字哦～', 'system');
}

function generateWords() {
    return chooseRandomly(words);
}


function guess() {
    window.game.guess();
	resetTimer();
}

function hint() {
    window.game.hint();
	resetTimer();
}

function playVoice() {
    window.game.playVoice();
	window.game.initSystemHint();
	resetTimer();
}

function replay(){
	window.game = new Game();
    window.game.play();
	document.getElementById('guess-input').value = '';
	resetTimer();
}

function resetTimer(){
	clearTimer();
	setTimer();
}

replay();
