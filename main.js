const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('#decimal');
const clearBtns = document.querySelectorAll('.clear-btn');
const ce = document.querySelector('#ce');
const c = document.querySelector('#c');
const display = document.querySelector('#display');
const sqrt = document.querySelector('#sqrt');
const negNumber = document.querySelector('#neg-number');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for(let i=0; i<numbers.length; i++) {
  const number = numbers[i];
  number.addEventListener('click', function(e) {
    numberPress(e.target.textContent);
  });
}

for(let i=0; i<operations.length; i++) {
  const operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {
    operation(e.target.textContent);
  });
}

for(let i=0; i<clearBtns.length; i++) {
  const cleartBtn = clearBtns[i];
  cleartBtn.addEventListener('click', function(e) {
    clear(e.srcElement.id);
  });
}

decimalBtn.addEventListener('click', decimal)
sqrt.addEventListener('click', sqrtPress)
negNumber.addEventListener('click', negNumberPress)

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
};

function operation(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
      MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      (MemoryCurrentNumber += parseFloat(localOperationMemory));
      MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(5)
    }
    else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
      MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(5)
    }
    else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
      MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(5)
    }
    else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
      MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(5)
    }
    else if (MemoryPendingOperation === '^') {
      MemoryCurrentNumber **= parseFloat(localOperationMemory);
    }
    else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }

    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
};

function decimal() {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.'
    MemoryNewNumber = false;
  }
  else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.'
    }
  }
  display.value = localDecimalMemory;
};

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  }
  else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
};

function negNumberPress() {
  let localNegMemory = display.value;

  if (MemoryNewNumber) {
    localNegMemory = '-'
    MemoryNewNumber = false;
  }
  else {
    if (localNegMemory.indexOf('-') === -1) {
      localNegMemory += '-'
    }
  }
  display.value = localNegMemory;
};

function sqrtPress() {
  if (display.value.includes('-')) {
    MemoryCurrentNumber = 'Error';
  } else {
    display.value = Math.sqrt(+display.value);
    MemoryCurrentNumber = display.value
    MemoryNewNumber = false;
  }
  display.value = MemoryCurrentNumber;
}