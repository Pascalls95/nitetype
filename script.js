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

let currentWordIndex = 0;
let currentLetterIndex = 0;

const wordsContainer = document.getElementById("words");

function generateWords() {
    wordsContainer.innerHTML = "";

    for (let i = 0; i < 50; i++) {
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

        if (i < 49) {
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

document.addEventListener("keydown", function(event) {
    if (event.key.length !== 1 && 
        event.key !== "Backspace" &&
        event.key !== " "
    ) {
        return;
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
            letters[currentLetterIndex].classList.remove("correct", "incorrect");
            updateCursor();
        }
        return;
    }

    const expectedLetter = letters[currentLetterIndex];

    if(!expectedLetter) {
        return;
    }

    if (event.key === expectedLetter.textContent) {
        expectedLetter.classList.add("correct");
    }else {
        expectedLetter.classList.add("incorrect");
    }

    currentLetterIndex++;
    updateCursor();
});