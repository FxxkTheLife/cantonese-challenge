
function renderVerifyArea(verifyInputs) {
    let verifyArea = document.getElementById('verify-area');
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
        if (guessStatus[i]) {
            verifyInput.innerText = solutionChars[i];
            verifyInput.classList.add('success');
        }
    }
}

function clearVerifyArea(guessStatus, verifyInputs) {
    for (let i = 0; i < Math.min(guessStatus.length, verifyInputs.length); i++) {
        if (!guessStatus[i]) {
            verifyInputs[i].innerText = '';
        }
    }
}

function chooseRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
