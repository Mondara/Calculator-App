export default class Calculator {
  constructor(primaryOperand, secondaryOperand, operation) {
    this.#primaryOperand = primaryOperand;
    this.#secondaryOperand = secondaryOperand;
    this.#operation = operation;
    this.clear();
  }

  #primaryOperand;
  #secondaryOperand;
  #operation;

  get primaryOperand() {
    return parseFloat(this.#primaryOperand.dataset.value);
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperand.dataset.value);
  }

  get operation() {
    return this.#operation.textContent;
  }

  set primaryOperand(value) {
    this.#primaryOperand.dataset.value = value ?? '';
    this.#primaryOperand.textContent = displayNumber(value);
  }

  set secondaryOperand(value) {
    this.#secondaryOperand.dataset.value = value ?? '';
    this.#secondaryOperand.textContent = displayNumber(value);
  }

  set operation(operand) {
    this.#operation.textContent = operand ?? '';
  }

  addDigit(digit) {
    if (digit === '.' && this.#primaryOperand.dataset.value.includes('.'))
      return;

    if (this.primaryOperand === 0) {
      this.primaryOperand = digit;
      return;
    }

    this.primaryOperand = this.#primaryOperand.dataset.value + digit;
  }

  addOperation(operation) {
    if (this.operation !== '') return;
    this.operation = operation;
    this.moveToSecondOperand(this.primaryOperand);
  }

  moveToSecondOperand(currentPrimaryOperand) {
    this.secondaryOperand = currentPrimaryOperand;
    this.primaryOperand = 0;
  }

  evalute() {
    let result;
    switch (this.operation) {
      case '*':
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case '/':
        result = this.secondaryOperand / this.primaryOperand;
        break;
      case '+':
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case '-':
        result = this.secondaryOperand - this.primaryOperand;
        break;
      default:
        return;
    }

    this.clear();
    this.primaryOperand = result;

    return result;
  }

  delete() {
    if (this.#primaryOperand.dataset.value.length <= 1 || this.#primaryOperand.dataset.value.match(/-\d?$/)) {
      this.primaryOperand = 0;
      return;
    }

    this.primaryOperand = this.#primaryOperand.dataset.value.slice(0, -1);
  }

  clear() {
    this.primaryOperand = 0;
    this.secondaryOperand = 0;
    this.operation = '';
  }
}

// Number Formatter
const NUMBER_FORMATTER = new Intl.NumberFormat('en');

function displayNumber(number) {
  const stringNumber = number?.toString() || '';
  if (stringNumber === '') return '';
  const [integer, decimal] = stringNumber.split('.');
  const formattedInteger = NUMBER_FORMATTER.format(integer);
  if (decimal == null) return formattedInteger;
  return formattedInteger + '.' + decimal;
}
