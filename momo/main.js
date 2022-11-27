importPackage(android.speech.tts);
importClass(java.util.Locale);

auto();

var tts = require("./tts.js")

events.observeKey();

const A_KEY = "KEYCODE_BUTTON_A";
const B_KEY = "KEYCODE_BUTTON_B";
const Y_KEY = "KEYCODE_BUTTON_Y";
const X_KEY = "KEYCODE_BUTTON_X";
const START_KEY = "KEYCODE_BUTTON_START";

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
            } else {
                click(500, 500);
                sleep(1000);
                readWord();
                sleep(2000);
                readMeaning();
            }
            break;
        case B_KEY:
            let almostButton = text("模糊").findOnce();
            if (almostButton) {
                almostButton.click();
            }
            break;
        case Y_KEY:
            let forgetButton = text("忘记").findOnce();
            if (forgetButton) {
                forgetButton.click();
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
            tts.ttsSpeech(wordText.split('').join(' '));
        }
    }
}