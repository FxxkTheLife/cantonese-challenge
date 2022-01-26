
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
            const verifyInput = generateSingleVerifyInput(i);
            verifyInputs.push(verifyInput);
        }
    }
    return verifyInputs;
}

function generateSingleVerifyInput(no) {
    const singleVerifyArea = document.createElement('input');
    singleVerifyArea.id = 'verify-input-' + no;
    singleVerifyArea.type = 'text';
    singleVerifyArea.classList.add('verify-input');
    singleVerifyArea.maxlength = 1;
    singleVerifyArea.disabled = true;
    return singleVerifyArea;
}

function fillVerifyArea(solution, verifyInputs, guessStatus) {
    clearVerifyArea(guessStatus, verifyInputs);

    const solutionChars = solution.split("");
    for (i = 0; i < verifyInputs.length; i++) {
        const verifyInput = verifyInputs[i];
        if (guessStatus[i]) {
            verifyInput.value = solutionChars[i];
            verifyInput.classList.add('success');
        }
    }
}

function clearVerifyArea(guessStatus, verifyInputs) {
    for (let i = 0; i < Math.min(guessStatus.length, verifyInputs.length); i++) {
        if (!guessStatus[i]) {
            verifyInputs[i].value = '';
        }
    }
}
