
function generateHint(correctCount, totalCount, correctThisTime, times) {
    if (correctCount === totalCount) {
        return [chooseRandomly(correctCompletely()), 'success'];
    }
    if (correctThisTime > 0 && correctCount < totalCount) {
        return [chooseRandomly(correctPartially(correctThisTime)), 'success'];
    }
    return [chooseRandomly(incorrect()), 'fail'];
}

function incorrect() {
    return [
        "不对哦～再想想？",
        "没猜对，再试试呢？"
    ];
}

function correctPartially(count) {
    return [
        "恭喜猜对 " + count + " 个！",
        "对啦，但没完全对",
        "哦？让我看看你对了几个",
    ];
}

function correctCompletely() {
    return [
        "恭喜你🎉完全正确！",
    ];
}

function chooseRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
