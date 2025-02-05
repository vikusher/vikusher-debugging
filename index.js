const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  // (Stretch Goals) added input validation (if the user enters a non-number or a 
  // number outside 1-99, it now shows an alert and exits the function:)
  const guess = parseInt(guessInput.value, 10);
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert('Please enter a valid number between 1 and 99.');
    return;
  }
  attempts++;

  hideAllMessages();

// If the guess is correct (guess === targetNumber), the game:
// displays the correct guess message
// disables input and the submit button
  if (guess === targetNumber) {
    //style.display = 'block'; instead of style.display = ''; to ensure the
    //  message is always visible when needed.
    
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = 'block';;
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
// (Fixed) added else instead od guess !== targetNumber
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else {
      // (Fixed) tooHighMessage instead of tooLowMessage
      tooHighMessage.style.display = 'block';
    }
    // (Stretch Goals) If there is only one guess left, it should say "guess" (singular) instead of "guesses" (plural)
    const remainingAttempts = maxNumberOfAttempts - attempts;
    const remainingText = remainingAttempts === 1 ? `${remainingAttempts} guess remaining` : `${remainingAttempts} guesses remaining`;
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingText}`;

// (Fixed) attempts ==== maxNumberOfAttempts issue (changed ==== to ===)
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    // Added (maxGuessesMessage.style.display = 'block') to inform the user that 
    // they have used all their attempts when they reach the maximum number of
    //  guesses.
    maxGuessesMessage.style.display = 'block';
  }
}
  guessInput.value = '';
  resetButton.style.display = 'block';
}

function hideAllMessages() {
  // (fixed) Used i < messages.length instead of i <= messages.length to prevent 
  // accessing an undefined index.
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// (Fixed) typo in function setup()

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts

  // (Fixed) replaced maxNumberOfAttempts = 0; with attempts = 0; in the setup 
  // function, becaus attempts should reset to 0 when the game restarts, 
  // while maxNumberOfAttempts should remain 5.
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabeld = false;
  guessInput.disabled = false;
  // (Fixed) also added guessInput.value = ''; in setup() to clear the input field
  // when the game resets (this ensures a fresh start each time).
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
