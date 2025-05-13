// This file will build the calculator

const MAXLINES = 5;
const LINE1ST = ["1", "2", "3", "+"];
const LINE2ND = ["4", "5", "6", "-"];
const LINE3RD = ["7", "8", "9", "*"];
const LINE4TH = ["0", ".", "=", "/"];

const NUMBERS = "1234567890"
const OPERATORS = "+-*/="
const CLEAR = "Calculator"

const mainContainer = document.querySelector(".main-container");

// Start by building the mainContainer (sort of main function)
function buildRow(mainContainer) {

    const calculatorButton = document.createElement("button");
    
    for (let i = 0; i < MAXLINES; i++) {
        const numbersContainer = document.createElement("div");
        numbersContainer.classList.add("display");
        mainContainer.append(numbersContainer);
        buildButtons(numbersContainer, i);
    }
}

// Starting filling the buttons
function buildButtons(numbersContainer, lineNumber) {
    if (lineNumber === 0) {
        appendElement(numbersContainer, "CE", "clear-button");
        appendElement(numbersContainer, CLEAR, "calc-screen");
    } else if (lineNumber === 1){
        buildLines(numbersContainer, LINE1ST);
    } else if (lineNumber === 2){
        buildLines(numbersContainer, LINE2ND);
    } else if (lineNumber === 3){
        buildLines(numbersContainer, LINE3RD);
    } else if (lineNumber === 4){
        buildLines(numbersContainer, LINE4TH);
    }

}

// Generic function to add a new button to the group
function appendElement(container, textContext, classToAdd) {
    const element = document.createElement("div");
    element.classList.add(classToAdd);
    element.addEventListener("click", agreggateValue);
    element.textContent = textContext;
    container.append(element);
}

// Create the button in the calc lines
function buildLines(container, buttonTexts) {
    for (let i = 0; i < buttonTexts.length; i++){
        if (buttonTexts[i] === "0") {
            appendElement(container, buttonTexts[i], "zero-button")
        } else {
            appendElement(container, buttonTexts[i], "calc-button");
        }
    }
}

// Event listener for buttons
function agreggateValue(e) {
    const value = e.target.textContent;
    console.log(value);
    if (value === "CE") {
        updateCalcInfo(CLEAR);
    } else {
        updateCalcInfo(value);
    }
}

function updateCalcInfo(data) {
    const screen = document.querySelector(".calc-screen");
    // If the key pressed is the CE (Clear)
    if (data === CLEAR) {
        screen.textContent = CLEAR
        return;
    }
    let currentValue = screen.textContent;
    if (currentValue === CLEAR) {
        if (NUMBERS.includes(data)) {
            screen.textContent = data;
        }
    } else {
        // There are operators in the screen
        if (currentValue.includes(...OPERATORS)) {
            const operator = getOperator(currentValue)
            operands = currentValue.split(operator);
            // if there are two operands AND data is another operand
            //  do operate (op1, op2, operator) -> use the result as operand 1
            // else add the number at the end of the string
        } else {

        }
    }
}

function getOperator(value) {
    const operator = [...OPERATORS].find(op => value.includes(op));
    return operator;
}

function addNumberToScreen(screen, data) {

}

buildRow(mainContainer);