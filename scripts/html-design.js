// This file will build the calculator

const MAXLINES = 5;
const LINE1ST = ["1", "2", "3", "+"];
const LINE2ND = ["4", "5", "6", "-"];
const LINE3RD = ["7", "8", "9", "*"];
const LINE4TH = ["0", ".", "=", "/"];

const NUMBERS = new Set("1234567890")
const OPERATORS = new Set("+-*/")
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
    // Just after a reset
    if (currentValue === CLEAR) {
        if (NUMBERS.has(data)) {
            screen.textContent = data;  // If the user added a number, then it replaces "calculator"
        } else {
            screen.textContent = "";  // Anything else, i.e. operators, the screen is cleared
        }
    } else {
        expression = getExpression(currentValue);
        screen.textContent = buildExpression(expression, data);
    }
}

// Split the screen expression in three operands:
// operand1, operand2 and operator
// function getExpression(expression) {
//     const operator = getOperator(expression);
//     if (!operator) {
//         return [expression];
//     } else {
//         const operands = expression.split(operator);
//         return [
//             operands[0],
//             operands[1],
//             operator
//         ]
//     }
// }

function getExpression(expression) {
    const trimmed = expression.trim();
    const numberPattern = '[+-]?\\d*(?:\\.\\d*)?';  // Allows 123, -123., .45, 0.45, etc.
    const operatorPattern = '[+\\-*/]';

    const patterns = {
        full: new RegExp(`^(${numberPattern})\\s*(${operatorPattern})\\s*(${numberPattern})$`),
        partial: new RegExp(`^(${numberPattern})\\s*(${operatorPattern})\\s*$`),
        single: new RegExp(`^(${numberPattern})$`)
    };

    if (patterns.full.test(trimmed)) {
        const [, operand1, operator, operand2] = trimmed.match(patterns.full);
        return [
            operand1,
            operand2,
            operator
        ];
    }

    if (patterns.partial.test(trimmed)) {
        const [, operand1, operator] = trimmed.match(patterns.partial);
        return [
            operand1,
            operator,
            ""
        ];
    }

    if (patterns.single.test(trimmed)) {
        const [, operand1] = trimmed.match(patterns.single);
        return [
            operand1,
        ];
    }

    return [
        "",
        "",
        ""
    ];
}


function buildExpression(expression, data) {
    if  (expression.length === 1) {
        if (data === "=") {
            return expression[0]; 
        }
        
        if (NUMBERS.has(data) || (OPERATORS.has(data)) || (data === "." && !expression[0].includes("."))) {
            if (expression[1] === "."){
                return expression[0] + expression[2] + expression[1];
            }
            return expression[0] + data;
        }

        // Default fallback
        return expression[0];

    } else {
        
        if (data === "="){
            return operate(expression[0], expression[1], expression[2]);
        }

        if (OPERATORS.has(data)){
            return operate(expression[0], expression[1], expression[2]) + data;
        }

        if (NUMBERS.has(data)) {
            return expression[0] + expression[2] + expression[1] + data;
        }

        if (data === "." && !expression[1].includes(".")) {
            return expression[0] + expression[2] + expression[1] + data;
        }

        // Default fallback
        return expression[0] + expression[2] + expression[1];
        
    }
}

function getOperator(value) {
    return [...OPERATORS].find(op => value.includes(op));
}

function addNumberToScreen(screen, data) {

}

buildRow(mainContainer);