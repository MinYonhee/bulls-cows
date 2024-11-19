// Generate a random 4-digit code
const generateCode = () => {
    let digits = new Set();
    while (digits.size < 4) {
        digits.add(Math.floor(Math.random() * 10));
    }
    return Array.from(digits).join('');
};

const secretCode = generateCode();
let attempts = [];

// Check Bulls and Cows
const checkBullsAndCows = (guess, code) => {
    let bulls = 0, cows = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === code[i]) {
            bulls++;
        } else if (code.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
};

// Display Attempts
const updateAttempts = () => {
    const attemptsList = document.getElementById('attemptsList');
    attemptsList.innerHTML = attempts
        .map(
            (attempt) =>
                `<div class="attempt">${attempt.guess} - Bulls: ${attempt.result.bulls}, Cows: ${attempt.result.cows}</div>`
        )
        .reverse()
        .join('');
};

// Handle Guess Submission
const submitGuess = () => {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value;
    if (guess.length !== 4 || isNaN(guess)) {
        alert('Please enter a valid 4-digit number.');
        return;
    }

    const result = checkBullsAndCows(guess, secretCode);
    attempts.push({ guess, result });
    updateAttempts();
    guessInput.value = '';
};

// Reveal Secret Code
const revealCode = () => {
    alert(`The secret code is: ${secretCode}`);
};
