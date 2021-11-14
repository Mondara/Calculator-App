import Calculator from './calculator.js';

// -------------- Theme Toggle -------------- //
const styleLink = document.querySelector('#theme');
const themeToggleBtns = document.querySelectorAll('.custom-radio-btn > input');

themeToggleBtns.forEach((toggleBtn) =>
  toggleBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
      styleLink.href=`styles/themes/${e.target.id}.css`;
    }
  })
);

// -------------- Calculator -------------- //
const primaryOperand = document.querySelector('.primary-operand');
const secondaryOperand = document.querySelector('.secondary-operand');
const operationDisplay = document.querySelector('[data-operation]');

const calculator = new Calculator(primaryOperand, secondaryOperand, operationDisplay);

document.addEventListener('click', e => {
  if(e.target.matches('[data-all-clear]')) {
    calculator.clear()
  }
  
  if(e.target.matches('[data-delete]')) {
    calculator.delete();
  } 
  
  
  if(e.target.matches('[data-operation]')) {
    calculator.addOperation(e.target.textContent);
  }

  if(e.target.matches('[data-number]')) {
    calculator.addDigit(e.target.textContent);
  }

  if(e.target.matches('[data-equals]')) {
    calculator.evalute();
  }
})