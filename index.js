const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const squalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    formateDisplayNumber(number) {
        const stringNumber = number.toString()

        const integerDigitis = parseFloat(stringNumber.split('.')[0])
        const decimalDigitis = stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigitis)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigitis.toLocaleString('en', {
                maximumFractionDigits: 0,
            })
        }

        if(decimalDigitis != null) {
            return `${integerDisplay}. ${decimalDigitis}`
        } else {
            return integerDisplay
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    calculate() {
        let result

        const previousOperand = parseFloat(this.previousOperand)
        const currentOperand = parseFloat(this.currentOperand)

        if(isNaN(previousOperand) || isNaN(currentOperand)) return

        switch(this.operation) {
            case '+':
                result = previousOperand + currentOperand;
                break
            case '-':
                result = previousOperand - currentOperand
                break
            case '÷':
                result = previousOperand / currentOperand
                break
            case '*':
                result = previousOperand * currentOperand
                break
            default:
                return
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''


    }

    chooseOperation(operation) {

        if(this.currentOperand === '') return
        if(this.previousOperand !=='') {
            this.calculate()
        }

        this.operation = operation

        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    appendNumber(number) {
        if(this.currentOperand.includes(".") && number === '.') return
        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }


    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formateDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formateDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator (
    previousOperandTextElement,
    currentOperandTextElement
)

for(const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for(const  operationButton  of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText)
        calculator.updateDisplay()
    })
}

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

squalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})