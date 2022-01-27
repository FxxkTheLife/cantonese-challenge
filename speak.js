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
    const cantoneseVoice = voices.find(item => {
        return item.lang == lang;
    });
    return cantoneseVoice;
}

function speak(text) {
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(text);
    const voice = cantoneseSpeechVoice();
    if (!voice) {
        alert("Sorry~ 播放失败了");
    }
    if (voice.lang !== lang) {
        return;
    }
    speech.voice = voice;
    window.speechSynthesis.speak(speech);
}

getVoices();
