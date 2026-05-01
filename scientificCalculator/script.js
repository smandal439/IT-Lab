let currentOperandElement = document.getElementById('current-operand');
let previousOperandElement = document.getElementById('previous-operand');

let currentOperand = '0';
let previousOperand = '';
let shouldResetScreen = false;

function updateDisplay() {
    let displayCurrent = currentOperand
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e');
        
    let displayPrevious = previousOperand
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e');

    currentOperandElement.innerText = displayCurrent;
    previousOperandElement.innerText = displayPrevious;
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    updateDisplay();
}

function deleteChar() {
    if (currentOperand === '0' || currentOperand === 'Error') return;
    
    // Check if we're deleting a specific function like sin(, cos(, etc.
    let funcs = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt('];
    let deletedFunc = false;
    for (let f of funcs) {
        if (currentOperand.endsWith(f)) {
            currentOperand = currentOperand.slice(0, -f.length);
            deletedFunc = true;
            break;
        }
    }
    
    if (!deletedFunc) {
        currentOperand = currentOperand.slice(0, -1);
    }
    
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function appendNumber(number) {
    if (currentOperand === '0' && number !== '.') currentOperand = '';
    if (currentOperand === 'Error') currentOperand = '';
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    currentOperand += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === 'Error') currentOperand = '0';
    if (shouldResetScreen) shouldResetScreen = false;
    
    // Prevent multiple consecutive operators
    const lastChar = currentOperand.slice(-1);
    if (['+', '-', '*', '/', '%', '^'].includes(lastChar) && ['+', '-', '*', '/', '%', '^'].includes(operator)) {
        currentOperand = currentOperand.slice(0, -1) + operator;
    } else {
        currentOperand += operator;
    }
    updateDisplay();
}

function appendFunction(func) {
    if (currentOperand === '0' || currentOperand === 'Error') currentOperand = '';
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    currentOperand += func;
    updateDisplay();
}

function evaluateExpression(expr) {
    // Replace all friendly symbols with JS math equivalents
    let parsedExpr = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/%/g, '/100');

    try {
        // Balance parentheses safely
        let openParenCount = (parsedExpr.match(/\(/g) || []).length;
        let closeParenCount = (parsedExpr.match(/\)/g) || []).length;
        if (openParenCount > closeParenCount) {
            parsedExpr += ')'.repeat(openParenCount - closeParenCount);
        }

        // Warning: eval is generally unsafe, but acceptable here for a client-side calculator without user-submitted code
        let result = eval(parsedExpr);
        
        if (result === Infinity || result === -Infinity || Number.isNaN(result) || result === undefined) {
            return "Error";
        }
        
        // Fix common floating point precision issues (e.g., 0.1 + 0.2)
        return Math.round(result * 1e12) / 1e12;
    } catch (e) {
        return "Error";
    }
}

function calculate() {
    if (currentOperand === 'Error' || currentOperand === '0') return;
    
    previousOperand = currentOperand + ' =';
    let result = evaluateExpression(currentOperand);
    
    currentOperand = result.toString();
    shouldResetScreen = true;
    updateDisplay();
}

// Add basic keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%') {
        appendOperator(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    if (event.key === 'Backspace') {
        deleteChar();
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
});
