function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operand1, operand2 = "", operation = "+") {
    op1 = parseFloat(operand1);
    if (operand2 === "") {
        if (operation === "+" || operation === "-") op2 = 0;
        if (operation === "*" || operation === "/") op2 = 1;
    } else {
        op2 = parseFloat(operand2);
    }
    let result =  NaN;
    if (operation === "+") result = add(op1, op2);
    if (operation === "-") result = subtract(op1, op2);
    if (operation === "*") result = multiply(op1, op2);
    if (operation === "/") result = divide(op1, op2);
    return Math.floor(result * 1000) / 1000;
}