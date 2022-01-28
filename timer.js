var timer_for_wait;
var needEncourage = true;
function setTimer(){
	count = 1;
	timer_for_wait = setInterval(encourage, 20000);
}

function encourage(){
	if(needEncourage){
		window.game.hintText([chooseRandomly(haveNoIdea())], 'system');
	}
}

function clearTimer(){
	clearInterval(timer_for_wait);
	
}
setTimer();