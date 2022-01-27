
function renderVerifyArea(verifyInputs) {
    let verifyArea = document.getElementById('verify-area');
    verifyArea.innerHTML = '';
    verifyInputs.forEach(verifyInput => {
        verifyArea.appendChild(verifyInput);
    });
}

function generateVerifyInputs(count) {
    let verifyInputs = [];
    if (typeof count === 'number') {
        for (i = 0; i < count; i++) {
            const verifyInput = generateSingleVerifyText();
            verifyInputs.push(verifyInput);
        }
    }
    return verifyInputs;
}

function generateSingleVerifyText() {
    const singleVerifyArea = document.createElement('div');
    singleVerifyArea.classList.add('verify-text');
    return singleVerifyArea;
}

function fillVerifyArea(solution, verifyInputs, guessStatus) {
    clearVerifyArea(guessStatus, verifyInputs);

    const solutionChars = solution.split("");
    for (i = 0; i < verifyInputs.length; i++) {
        const verifyInput = verifyInputs[i];
        switch (guessStatus[i]) {
            case GameGuessStatus.right:
                verifyInput.innerText = solutionChars[i];
                verifyInput.classList.add('success');
                break;
            case GameGuessStatus.hint:
                verifyInput.innerText = solutionChars[i];
                verifyInput.classList.add('warning');
            default:
                break;
        }
    }
}

function clearVerifyArea(guessStatus, verifyInputs) {
    for (let i = 0; i < Math.min(guessStatus.length, verifyInputs.length); i++) {
        if (guessStatus[i] === GameGuessStatus.none) {
            verifyInputs[i].innerText = '';
        }
    }
}

function chooseRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
