// Rashaan Lightpool
// Project 1: Calculator WebApp
// SD235 - Professor Stuart, WCC
// 10/07/2023

// Based on a vague description of this algorithm from 
// Data Structures and Algorithm Analysis in Java, 3rd Edition

let display = document.getElementById('display');
let buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        let value = this.textContent;
        processInput(value);
    });
});

let inputStack = [];

function processInput(value) {
    if (value !== "=") {
        // If it's not "=", store the input in the stack
        inputStack.push(value);
        display.value += value;
    } else {
        // Loop through inputStack and combine digits into numbers
        let newStack = [];
        let currentNumber = "";
        for (let i = 0; i < inputStack.length; i++) {
            if (!isNaN(inputStack[i])) {
                currentNumber += inputStack[i];
            } else {
                if (currentNumber !== "") {
                    newStack.push(Number(currentNumber));
                    currentNumber = "";
                }
                newStack.push(inputStack[i]);
            }
        }
        if (currentNumber !== "") {
            newStack.push(Number(currentNumber));
        }

        let postfix = infixToPostfix(newStack);
        let result = evaluatePostfixExpression(postfix);
        display.value = result;
        inputStack = []; // Clear the stack for next input
    }
}

function evaluatePostfixExpression(tokens) {
    let numberStack = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            numberStack.push(token);
        } else {
            let operand2 = numberStack.pop();
            let operand1 = numberStack.pop();
            let result = evaluate(token, operand1, operand2);
            numberStack.push(result);
        }
    });

    return numberStack.pop();

}

function infixToPostfix(tokens) {
    let output = [];
    let operatorStack = [];

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        if (!isNaN(token)) {  // If it's a number
            output.push(token);
        } else if (token === "+" || token === "-" || token === "*" || token === "/") {
            while (operatorStack.length > 0 && hasPrecedence(operatorStack[operatorStack.length - 1], token)) {
                output.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack[operatorStack.length - 1] !== "(") {
                output.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    }

    while (operatorStack.length > 0) {
        output.push(operatorStack.pop());
    }

    return output;
}

function hasPrecedence(op1, op2) {

    if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-")) {
        return true;
    }

    return false;
}

function evaluate(operator, operand1, operand2) {
    if (operator === "+") {
        return operand1 + operand2;
    } else if (operator === "-") {
        return operand1 - operand2;
    } else if (operator === "*") {
        return operand1 * operand2;
    } else if (operator === "/") {
        return operand1 / operand2;
    }
}