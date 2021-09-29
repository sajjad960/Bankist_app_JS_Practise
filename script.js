'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Sajjad Hossain',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
  acc.balance = balance;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = Math.abs(
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  labelSumOut.textContent = `${outcomes}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log(accounts);

const updateUI = function (currentAccount) {
  // Display movements
  displayMovements(currentAccount.movements);
  //Display balance
  calcDisplayBalance(currentAccount);
  //Display summary
  calcDisplaySummary(currentAccount);
};
//Event lister
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Wellcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Input
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciveAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    reciveAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciveAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    //Delete account
    accounts.splice(index, 1);

    // Update UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaFinal = dogsJulia.slice(1, -2);

  const bothArray = [...dogsJuliaFinal, ...dogsKate];
  console.log(bothArray);

  bothArray.forEach(function (value, index) {
    const checkDogs =
      value >= 3
        ? `Dog number ${index + 1} is an adult, and is ${value} years old`
        : `"Dog number ${index + 1} is still a puppy`;
    console.log(checkDogs);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
/*
const uroToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * uroToUsd);
console.log(movementsUsd);
*/

// const withdrawal = movements.filter(move => move < 0);
// console.log(withdrawal);

//maximun value of movements
/*
console.log(movements);
const maximum = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
});
console.log(maximum);

const calcAverageHumanAge = function (dogsage) {
  const humanAge = dogsage.map(function (age) {
    if (age <= 2) return 2 * age;
    else if (age > 2) return 16 + age * 4;
  });
  console.log(humanAge);
  const adults = humanAge.filter(hage => hage >= 18);
  console.log(adults);

  const average = adults.reduce(
    (acc, aage, i, arr) => acc + aage / arr.length,
    0
  );

  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/
/*
const calcAverageHumanAge = function (dogsage) {
  const average = dogsage
    .map(age => {
      if (age <= 2) return 2 * age;
      else if (age > 2) return 16 + age * 4;
    })
    .filter(hage => hage >= 18)
    .reduce((acc, aage, i, arr) => acc + aage / arr.length, 0);

  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);
*/

//Challeng 4

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// dogs.forEach(dog => (dog.recfood = dog.weight ** 0.75 * 28));
// console.log(dogs);

// dogs.forEach(function (dog) {
//   if (dog.owners.some(el => el === 'Sarah')) {
//     dog.recfood > dog.curFood
//       ? console.log(`It's Eating too much`)
//       : console.log(`It's Eating too little`);
//   }
// });

// const ownersEatTooMuch = dogs
//   .filter(dog => dog.recfood > dog.curFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.recfood < dog.curFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')} dogs eat
// too little!`);

// const equalEat = dogs.some(el => el.recfood === el.curFood);
// console.log(equalEat);

// const checkEatingOkey = dog =>
//   dog.curFood > dog.recfood * 0.9 && dog.curFood < dog.recfood * 1.1;

// const anyOkeyAmount = dogs.some(checkEatingOkey);
// console.log(anyOkeyAmount);

// const anyOkeyArray = dogs.filter(checkEatingOkey);
// console.log(anyOkeyArray);

// const copyDogs = dogs.slice().sort((a, b) => a.recfood - b.recfood);
// console.log(copyDogs);
