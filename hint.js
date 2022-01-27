
function generateHint(guessValue, correctCount, totalCount, correctThisTime, times) {
    if (correctCount === totalCount) {
        return [chooseRandomly(correctCompletely()), 'success'];
    }
    if (guessValue.length === 0) {
        return [chooseRandomly(emptyGuess), 'warning'];
    }
    if (correctThisTime > 0 && correctCount < totalCount) {
        return [chooseRandomly(correctPartially(correctThisTime)), 'success'];
    }
    return [chooseRandomly(incorrect()), 'fail'];
}

const emptyGuess = [
    "啥都没猜呢，别急着点呀",
];

function incorrect() {
    return [
        "不对诶～再想想？",
        "没猜对，再试一次~",
		"差点就猜对，再来一次呢"
    ];
}

function correctPartially(count) {
    return [
        "噢猜对了 " + count + " 个！",
        "对了但没完全对",
        "噫？让我看看你对了几个",
		"噢，马上猜出来了，加油！"
    ];
}

function correctCompletely() {
    return [
        "恭喜你🎉猜对了啦！",
		"很棒！👍",
		"猜对了！👏换一个，继续~🎈",
		"太棒了~😁"
    ];

}
function chooseRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}