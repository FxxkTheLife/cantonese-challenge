
function generateHint(guessCorrectCount, hintCount, totalCount, guessCorrectThisTime, hintCountThisTime, times) {
    
    // 一次就猜对
    if (guessCorrectCount >= totalCount && times === 1) {
        return [chooseRandomly(correctCompletelyWithOnceTry()), 'success'];
    }

    // 全部正确
    if (guessCorrectCount + hintCount >= totalCount) {
        // 最后一次是猜对的
        if (guessCorrectThisTime > 0) {
            return [chooseRandomly(correctCompletelyWithLastGuess(hintCount / totalCount)), 'success'];
        }
        // 最后一次是提示对的
        if (hintCountThisTime > 0) {
            return [chooseRandomly(correctCompletelyWithLastHint(hintCount / totalCount)), 'warning'];
        }
    }

    // 部分正确
    if (guessCorrectCount + hintCount < totalCount) {
        // 最后一次是猜对的
        if (guessCorrectThisTime > 0) {
            return [chooseRandomly(correctPartiallyWithLastGuess(guessCorrectThisTime, guessCorrectCount / totalCount)), 'success'];
        }
        // 最后一次是提示对的
        if (hintCountThisTime > 0) {
            return [chooseRandomly(correctPartiallyWithLastHint(hintCount / totalCount)), 'warning'];
        }
    }
    return [chooseRandomly(incorrect()), 'fail'];
}

const emptyGuess = [
    "啥都没猜呢，别急着点呀",
];

function incorrect() {
    return [
        "不对诶～再想想？",
        "没猜对，再试一次～",
		"差点就猜对，再来一次呢"
    ];
}

function correctPartiallyWithLastGuess(count, guessCorrectRatio) {
    if (guessCorrectRatio > 0.8) {
        return [
            "噢，马上猜出来了，加油！",
            "快猜出来咯",
            "还差一点点！",
        ];
    } else if (guessCorrectRatio > 0.5) {
        return [
            "厉害👍，猜对这么多",
            "强啊，都猜对 " + count + " 个了，剩下不多了",
        ];
    }
    return [
        "噢猜对了 " + count + " 个！",
        "对了但没完全对",
        "噫？让我看看你对了几个",
    ];
}

function correctPartiallyWithLastHint(hintRatio) {
    if (hintRatio > 0.8) {
        return [
            "都提示那么多了，该你自己表演了",
        ];
    } else if (hintRatio > 0.5) {
        return [
            "提示过半咯",
        ]
    } else {
        return [
            "我来提示一下～",
            "注意看好了👆",
        ]
    }
}

function correctCompletelyWithLastGuess(hintRatio) {
    if (hintRatio === 0) {
        return [
            "完全正确👍",
            "你太强了👍不愧是粤语大师",
            "无敌是多么寂寞😎",
        ];
    } else if (hintRatio < 0.2) {
        return [
            "恭喜你🎉猜对了啦！",
            "很棒！👍",
            "猜对了！👏换一个，继续~🎈",
            "太棒了~😁"
        ];
    } else if (hintRatio < 0.5) {
        return [
            "猜对啦猜对啦，还是很强的👍",
            "厉害，很有粤语天分",
        ];
    } else if (hintRatio < 0.8) {
        return [
            "3 分靠努力，7 分靠提示",
            "nice！",
        ];
    } else {
        return [
            "终于猜对了，不容易啊",
            "哼，这次是我在猜，不算",
        ];
    }
    
}

function correctCompletelyWithLastHint(hintRatio) {
    if (hintRatio < 0.1) {
        return [
            "哈哈，差点就猜到了",
        ];
    } else if (hintRatio < 0.3) {
        return [
            "哈哈，差点就猜到了",
            "没想到吧～",
        ];
    } else if (hintRatio < 0.5) {
        return [
            "已经很棒了👍继续加油"
        ];
    } else if (hintRatio < 0.7) {
        return [
            "已经很棒了👍继续加油"
        ];
    } else if (hintRatio < 0.9) {
        return [
            "哈哈，善用提示～",
        ]
    } else {
        return [
            "提示有那么好玩吗",
            "别老点提示，下次我把提示吃掉",
            "这次是我在猜",
        ]
    }
}

function correctCompletelyWithOnceTry() {
    return [
        "一次就中？？？",
        "无敌是多么寂寞😎",
        "下次你嚟錄語音，我唔干了",
        "你背了答案吧",
    ]
}

function haveNoIdea(){
	return [
		"放轻松，随便猜猜( •̀ ω •́ )✧",
		"猜一猜呢，随便猜一句也好🙋‍♀️",
		"听起来似曾相识？尽管猜呀~ :)",
		"跟着你的感觉走，猜猜我说了什么？😉"
	]
}

function chooseRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}