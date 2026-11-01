function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a , b) {
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

function operate(firstNumber, operand, secondNumber) {
    switch(operand) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "X":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

function roundDecimals(string) {

    console.log(string);

    if (string.length > 9) {

        let dotPosition = 0;
    
        if (string.includes(".")) {
    
            console.log("is decimal")
            
            for (let i = 0; i < string.length; i++) {
                if (string[i] == ".") {
                    dotPosition = i;
                    break;
                }
            }
            
        }
    
        return parseFloat(string).toFixed(10 - dotPosition);

    }

    return parseFloat(string);
}

let firstNumber = 0;
let secondNumber = 0;
let operand = "";
let editNumber = true;
let consecutiveOperand = false;

const numberKeys = document.querySelectorAll(".number-key");
const operatorKeys = document.querySelectorAll(".operator-key");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear-button");
const equalOperator = document.querySelector(".equal-operator");

numberKeys.forEach((key) => {
    key.addEventListener("click", (event) => {
        consecutiveOperand = false;
        if (!editNumber) {
            display.textContent = "0";
            editNumber = true;
        }
        if (display.textContent === "0") {
            display.textContent = key.textContent;
        } else if (display.textContent.length < 10) {
            display.textContent += key.textContent;
        }
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", (event) => {
        editNumber = false;
        if (operand === "") {
            firstNumber = parseFloat(display.textContent);
            operand = key.textContent;
            consecutiveOperand = true;
        } else if (!consecutiveOperand) {
            secondNumber = parseFloat(display.textContent);
            display.textContent = roundDecimals(operate(firstNumber, operand, secondNumber).toString());
            firstNumber = parseFloat(display.textContent);
            operand = key.textContent;
        }
    });
});

clearButton.addEventListener("click", (event) => {
    firstNumber = 0;
    secondNumber = 0;
    operand = "";
    display.textContent = "0";
});

equalOperator.addEventListener("click", (event) => {
    if (operand !== "" && editNumber) {
        secondNumber = parseFloat(display.textContent);
        let result = operate(firstNumber, operand, secondNumber);
        display.textContent = result;
        if (display.textContent.length > 9) {
            display.textContent = roundDecimals(display.textContent)
        }
        operand = "";
        editNumber = false;
    }
});