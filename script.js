const wordBank = [
    "night", "type", "keyboard", "speed", "focus",
    "light", "shadow", "moon", "dream", "code",
    "quick", "calm", "purple", "space", "world",
    "pixel", "sound", "cloud", "storm", "ghost",
    "track", "flow", "glow", "dark", "spark",
    "fast", "smooth", "key", "press", "drift",
    "blue", "quiet", "sharp", "neon", "sleep",
    "banana", "hack", "club", "deprived", "phantom",
    "horizon", "star", "dance", "crescent", "scraps",
    "algorithm", "variable", "string", "function", "constant",
    "bug", "library", "frame", "work", "data",
    "base", "front", "back", "end", "syntax"
];

/*position tracking variables*/
let currentWordIndex = 0;
let currentLetterIndex = 0;

/*timer variables*/
let testDuration = 30;
let timeLeft = testDuration;
let timerInterval = null;
let testStarted = false;
let testFinished = false;

/*wpm/accuracy variables*/
let correctCharacters = 0;
let incorrectCharacters = 0;
let totalKeystrokes = 0;

const wordsContainer = document.getElementById("words");

const timerElement = document.getElementById("timer");

const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

function generateWords() {
    wordsContainer.innerHTML = "";

    for (let i = 0; i < 58; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        const randomWord = wordBank[randomIndex];

        const wordElement = document.createElement("span");
        wordElement.classList.add("word");
        
        for (const letter of randomWord) {
            const letterElement = document.createElement("span");
            letterElement.classList.add("letter");
            letterElement.textContent = letter;

            wordElement.appendChild(letterElement);
        }

        wordsContainer.appendChild(wordElement);

        if (i < 57) {
            wordsContainer.appendChild(document.createTextNode(" "));
        }
    }
}

generateWords();

function updateCursor() {
    document.querySelectorAll(".letter.current").forEach(letter => {
        letter.classList.remove("current");
    });

    const words = document.querySelectorAll(".word");
    const currentWord = words[currentWordIndex];

    if (!currentWord) return;

    const letters = currentWord.querySelectorAll(".letter");

    if (letters[currentLetterIndex]) {
        letters[currentLetterIndex].classList.add("current")
    }
}
updateCursor();

const durartionButtons = document.querySelectorAll(
    "#test-settings button"
);

durartionButtons.forEach(button => {
    button.addEventListener("click", function() {
        testDuration = Number(button.textContent);
        resetTest();

        durartionButtons.forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });
    });
});

durartionButtons.forEach(button => {
    button.classList.toggle(
        "active",
        Number(button.textContent) === testDuration
    );
});

const restartButton = document.getElementById("restart-btn");

restartButton.addEventListener("click", function() {
    resetTest();
});

function startTimer() {
    if (testStarted || testFinished) return;

    testStarted = true;

    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);
}

function finishTest() {
    clearInterval(timerInterval);
    testFinished = true;
    timerElement.textContent = 0;

    updateStats();
}

function updateStats() {
    const elapsedSeconds = testDuration - timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;

    let wpm = 0;

    if (elapsedMinutes > 0) {
        wpm = Math.round(
            (correctCharacters / 5) / elapsedMinutes
        );
    }

    let accuracy = 100;

    if (totalKeystrokes > 0) {
        accuracy = Math.round(
            (correctCharacters / totalKeystrokes) * 100
        );
    }

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy + "%";
}

function resetTest() {
    clearInterval(timerInterval);

    timeLeft = testDuration;
    testStarted = false;
    testFinished = false;
    timerInterval = null;

    currentWordIndex = 0;
    currentLetterIndex = 0;

    correctCharacters = 0;
    incorrectCharacters = 0;
    totalKeystrokes = 0;

    timerElement.textContent = timeLeft;

    generateWords();
    updateCursor();
    updateStats();
}

document.addEventListener("keydown", function(event) {
    if(testFinished) return;

    if (event.key.length !== 1 && 
        event.key !== "Backspace" &&
        event.key !== " "
    ) {
        return;
    }

    if (event.key.length === 1 &&
        event.key !== " " &&
        !testStarted
    ) {
        startTimer();
    }

    const words = document.querySelectorAll(".word");
    const currentWord = words[currentWordIndex];

    if (event.key === " ") {
        event.preventDefault();

        if (currentLetterIndex > 0 && currentWordIndex < words.length -1) {
            currentWordIndex++;
            currentLetterIndex = 0;
            updateCursor();
        }
        return;
    }

    if (!currentWord) {
        return;
    }

    const letters = currentWord.querySelectorAll(".letter");

    if (event.key === "Backspace") {
        if (currentLetterIndex > 0) {
            currentLetterIndex--;

            const previousLetter = letters[currentLetterIndex];

            if (previousLetter.classList.contains("correct")) {
                correctCharacters--;
                totalKeystrokes--;
            } else if (previousLetter.classList.contains("incorrect")) {
                incorrectCharacters--;
                totalKeystrokes--;
            }

            previousLetter.classList.remove("correct", "incorrect");
            
            updateCursor();
            updateStats();
        }
        return;
    }

    const expectedLetter = letters[currentLetterIndex];

    if(!expectedLetter) {
        return;
    }

    totalKeystrokes++;

    if (event.key === expectedLetter.textContent) {
        expectedLetter.classList.add("correct");
        correctCharacters++;
    }else {
        expectedLetter.classList.add("incorrect");
        incorrectCharacters++;
    }

    currentLetterIndex++;
    updateCursor();
    updateStats();
});