var voices = [];
const lang = 'zh-HK';

function getVoices() {
    let timer = setInterval(() => {
        voices = speechSynthesis.getVoices();
        if (voices.length) {
            clearInterval(timer);
        }
    }, 100);
}

function cantoneseSpeechVoice() {
    const cantoneseVoices = voices.filter(item => {
        return item.lang == lang;
    });
    if (cantoneseVoices.length <= 0) {
        return undefined;
    }
    const localCantoneseVoices = cantoneseVoices.filter(item => {
        return item.localService == true;
    });

    if (localCantoneseVoices.length >= 0) {
        return localCantoneseVoices[0];
    }
    return cantoneseVoices[0];
}

function speak(text) {
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(text);
    const voice = cantoneseSpeechVoice();
    if (!voice) {
        alert("Sorry~ 播放失败了，请稍后再试");
        return;
    }
    if (!voice.localService) {
        alert("当前语音非本地服务，可能需要等待较长时间");
        return;
    }
    if (voice.lang !== lang) {
        return;
    }
    speech.voice = voice;
    window.speechSynthesis.speak(speech);
}

getVoices();
