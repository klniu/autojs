importPackage(android.speech.tts);
importClass(java.util.Locale);

auto();

var tts = require("./tts.js")

events.observeKey();

// 新的MOCUTE 052
const A_KEY = "KEYCODE_BUTTON_START";
const B_KEY = "KEYCODE_BUTTON_R1";
const Y_KEY = "KEYCODE_BUTTON_Y";
const X_KEY = "KEYCODE_BUTTON_X";
const START_KEY = "KEYCODE_BUTTON_B";

events.on("key", (code, event) => {
    let keyCode = event.keyCodeToString(code);
    if (event.getAction() !== event.ACTION_DOWN) {
        return
    } 
    log("keyCode: " + keyCode);
    switch (keyCode) {
        case A_KEY:
            let memorizeButton = text("认识").findOnce();
            if (memorizeButton) {
                memorizeButton.click();
                tts.ttsSpeech("", null, true);
            } else {
                click(500, 500);
                sleep(300);
                readWord();
            }
            break;
        case B_KEY:
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
            break;
        case Y_KEY:
            let forgetButton = text("忘记").findOnce();
            if (!forgetButton) {
                forgetButton = text("不认识").findOnce();
            }
            if (forgetButton) {
                forgetButton.click();
                tts.ttsSpeech("", null, true);
            }
            break;
        case X_KEY:
            let pronouceButton = desc("音标小喇叭").findOnce();
            if (pronouceButton) {
                pronouceButton.click();
            }
            break;
        case START_KEY: 
            readMeaning();
            break;
        default:
            break;
    }
});

function readMeaning() {
    let meaning = id("rev_tx_interpretation").findOnce();
    if (meaning) {
        var meaningText = meaning.text();
        if (meaningText.trim().length > 0) {
            tts.ttsSpeech(meaningText);
        }
    }
}

function readWord() {
    let word = id("rev_tx_title").findOnce();
    if (word) {
        var wordText = word.text();
        if (wordText.trim().length > 0) {
            tts.ttsSpeech(wordText.split('').join('-'), null, true);
        }
    }
}