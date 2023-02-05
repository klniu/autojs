importPackage(android.speech.tts);
importClass(java.util.Locale);

auto();

var momo = require("./momo.js");

var A_KEY = "KEYCODE_1";
var B_KEY = "KEYCODE_2";
var X_KEY = "KEYCODE_3";
var Y_KEY = "KEYCODE_4";
var START_KEY = "KEYCODE_0";

var options = ["MOCUTE_052老", "MOCUTE_052新"]
var i = dialogs.select("请选择一个遥控器", options);
switch (i) {
    case 0:
        A_KEY = "KEYCODE_1";
        B_KEY = "KEYCODE_2";
        X_KEY = "KEYCODE_3";
        Y_KEY = "KEYCODE_4";
        START_KEY = "KEYCODE_0";
        break;
    case 1:
        A_KEY = "KEYCODE_BUTTON_START";
        B_KEY = "KEYCODE_BUTTON_R1";
        X_KEY = "KEYCODE_BUTTON_X";
        Y_KEY = "KEYCODE_BUTTON_Y";
        START_KEY = "KEYCODE_BUTTON_B";
        break;
    default:
        alert("Wrong Remote Control", "Wrong remote control, quit!");
        break;
    
}


events.observeKey();

// 如果正在处理
var lastHandleTime = new Date();

events.on("key", (code, event) => {
    let keyCode = event.keyCodeToString(code);
    let timeDiff = new Date().getTime() - lastHandleTime;
    if (timeDiff < 1000 || event.getAction() !== event.ACTION_DOWN) {
        return;
    } 
    log("keyCode: " + keyCode + ", action: " + event.getAction());
    lastHandleTime = new Date();
    switch (keyCode) {
        case A_KEY:
            momo.clickMemoryButton();
            break;
        case B_KEY:
            momo.clickForgetButton();
            break;
        case Y_KEY:
            momo.clickUnclearButton();
            break;
        case X_KEY:
            momo.clickPronounce();
            break;
        case START_KEY: 
            momo.readMeaning();
            break;
        default:
            break;
    }
    isHandling = false;
});