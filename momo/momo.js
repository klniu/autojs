var tts = require("./tts.js")

// 点击认识键
function clickMemoryButton() {
    let memorizeButton = text("认识").findOnce();
    if (memorizeButton) {
        memorizeButton.click();
        tts.ttsSpeech("", null, true);
    } else {
        click(500, 500);
        sleep(300);
        readWord();
    }
}

// 点击模糊键
function clickUnclearButton() {
    let almostButton = text("模糊").findOnce();
    if (!almostButton) {
        almostButton = text("不确定").findOnce();
    }
    if (almostButton) {
        almostButton.click();
        tts.ttsSpeech("", null, true);
    } else {
        readWord();
    }
}

// 点击忘记键
function clickForgetButton() {
    let forgetButton = text("忘记").findOnce();
    if (!forgetButton) {
        forgetButton = text("不认识").findOnce();
    }
    if (forgetButton) {
        forgetButton.click();
        tts.ttsSpeech("", null, true);
    }
}

// 点击音标键
function clickPronounce() {
    let pronouceButton = desc("音标小喇叭").findOnce();
    if (pronouceButton) {
        pronouceButton.click();
    }
}

// 读出释义
function readMeaning() {
    let meaning = id("rev_tx_interpretation").findOnce();
    if (meaning) {
        var meaningText = meaning.text();
        if (meaningText.trim().length > 0) {
            tts.ttsSpeech(meaningText);
        }
    }
}

// 读出单词拼写
function readWord() {
    let word = id("rev_tx_title").findOnce();
    if (word) {
        var wordText = word.text();
        if (wordText.trim().length > 0) {
            tts.ttsSpeech(wordText.split('').join('-'), null, true);
        }
    }
}

module.exports = {
    clickMemoryButton,
    clickForgetButton,
    clickUnclearButton,
    clickPronounce,
    readMeaning,
    readWord
}