export class Calculator {
  constructor() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = null
    this.displayElement = document.getElementById('display-text')
  }

  operationHandler(operation) {
    return (a, b) => {
      switch (operation) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '/':
          return a / b
        case 'x':
          return a * b
      }
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number;

    this.display();
  }

  chooseOperation(operation) {
    if (['=', 'RESET', 'DEL'].includes(operation)) {
      return this.flowOperation(operation)
    }

    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.computeCalculation();
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  flowOperation(operation) {
    const handler = {
      '=': this.computeCalculation.bind(this),
      'RESET': this.reset.bind(this),
      'DEL': this.delete.bind(this)
    }

    return handler[operation]()
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.display()
  }

  computeCalculation() {
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return

    const handler = this.operationHandler(this.operation)
    this.currentOperand = handler(previous, current)

    this.previousOperand = ''
    this.operation = null;

    this.display()
  }

  reset() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = null;

    this.display();
  }

  getDisplayNumber() {
    const stringNumber = this.currentOperand.toString()
    const [integerPart, decimalPart] = stringNumber.split('.');
    const integerDigits = parseFloat(integerPart)

    let displayText
    if (isNaN(integerDigits)) {
      displayText = ''
    } else {
      displayText = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalPart != null) {
      return `${displayText}.${decimalPart}`
    }

    return displayText
  }

  display() {
    const formatedNumber = this.getDisplayNumber()
    this.displayElement.innerHTML = formatedNumber
  }
}