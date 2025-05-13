// This file will build the calculator

const MAXLINES = 5;

const mainContainer = document.querySelector(".main-container");


function buildRow(mainContainer) {

    const calculatorButton = document.createElement("button");
    
    for (let i = 0; i < MAXLINES; i++) {
        const numbersContainer = document.createElement("div");
        numbersContainer.classList.add("display");
        mainContainer.append(numbersContainer);
        buildButtons(numbersContainer, i);
    }
}

function buildButtons(numbersContainer, lineNumber) {
    if (lineNumber === 0) {
        appendElement(numbersContainer, "CE", "clear-button");
        appendElement(numbersContainer, "Calculadora", "calc-screen");
    } else {
        
    }

}

function appendElement(container, textContext, classToAdd) {
    const element = document.createElement("div");
    element.classList.add(classToAdd);
    element.textContent = textContext;
    container.append(element);
}

buildRow(mainContainer);