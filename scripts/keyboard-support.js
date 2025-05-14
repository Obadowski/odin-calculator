// Capture keyboard events!
function numberEvent(e){
    console.log(e);
    const code = e.key;
    updateCalcInfo(interfaceAdjustment(code));
}

function interfaceAdjustment(code) {
    switch (code) {
        case "Enter":
            return "=";
        case "Escape":
            return CLEAR;
        case "Backspace":
            return ERASE;
        default:
            return code;
    }
}

window.addEventListener('keydown', numberEvent)