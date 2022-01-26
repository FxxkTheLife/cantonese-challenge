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

function cantoneseSpeechLangParams() {
    const cantoneseFilterVoices = voices.filter(item => {
        return item.lang == lang;
    });
    if (cantoneseFilterVoices.length >= 1) {
        const cantoneseVoice = cantoneseFilterVoices[0];
        return {
            voiceURI: cantoneseVoice.voiceURI,
            lang: cantoneseVoice.lang,
            volumn: 1,
            pitch: 1,
            rate: 1,
        };
    }
    return {};
}

function speak(text) {
    speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(text);
    const params = cantoneseSpeechLangParams();
    if (params.lang !== lang) {
        return;
    }
    Object.assign(speech, params);
    speechSynthesis.speak(speech);
}

getVoices();
