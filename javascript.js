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

function modulus(a, b) {
    return a % b;
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
        case "%":
            return modulus(firstNumber, secondNumber);
    }
}

function roundDecimals(string) {

    if (string.length > 10) {

        let dotPosition = 0;
    
        if (string.includes(".")) {
            
            for (let i = 0; i < string.length; i++) {
                if (string[i] == ".") {
                    dotPosition = i;
                    break;
                }
            }
            
        }
        
        let result = parseFloat(string).toFixed(10 - dotPosition);

        // Result is still too long
        if (result.length > 11) return NaN;

        // A result with all zeros afther the comma so is equivalent to a integer
        if (result[10 - dotPosition] === "0") {
            return parseInt(result);
        }

        return result;

    }

    return parseFloat(string);
}

let firstNumber = 0;
let secondNumber = 0;
let operand = "";
let editNumber = true;
let consecutiveOperand = false;
let decimalPlace = false;

const numberKeys = document.querySelectorAll(".number-key");
const operatorKeys = document.querySelectorAll(".operator-key");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear-button");
const equalOperator = document.querySelector(".equal-operator");
const deleteButton = document.querySelector(".delete-button");
const decimalPlaceKeys = document.querySelectorAll(".decimal-key")

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
        // Do not operate if last character is the decimal place
        if (display.textContent[display.textContent.length - 1] !== ".") {
            editNumber = false;
            decimalPlace = false;
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
        }
    });
});

clearButton.addEventListener("click", (event) => {
    firstNumber = 0;
    secondNumber = 0;
    operand = "";
    display.textContent = "0";
    decimalPlace = false;
});

equalOperator.addEventListener("click", (event) => {
    if (display.textContent.includes(".")) {
        decimalPlace = false;
    } else {
        decimalPlace = true;
    }

    // Do not operate if last character is the decimal place
    if (display.textContent[display.textContent.length - 1] !== ".") {
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
    }
});

deleteButton.addEventListener("click", (event) => {
    let newDisplayContent = "";
    if (display.textContent !== "0") {
        for (let i = 0; i < display.textContent.length - 1; i++) {
            newDisplayContent += display.textContent[i];
        }
        if (display.textContent[display.textContent.length - 1] === ".") {
            console.log("removed .");
            decimalPlace = false;
        }

        display.textContent = newDisplayContent;
    }

    if (display.textContent.length === 0) {
        display.textContent = "0";
    }
});

decimalPlaceKeys.forEach((key) => {
    key.addEventListener("click", (event) => {
        if (!decimalPlace) {
            display.textContent += ".";
            decimalPlace = true;
        }
    });
});