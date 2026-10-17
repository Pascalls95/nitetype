const wordBank = [
    "night", "type", "keyboard", "speed", "focus",
    "light", "shadow", "moon", "dream", "code",
    "quick", "calm", "purple", "space", "world",
    "pixel", "sound", "cloud", "storm", "ghost",
    "track", "flow", "glow", "dark", "spark",
    "fast", "smooth", "key", "press", "drift",
    "blue", "quiet", "sharp", "neon", "sleep",
    "banana", "hack", "club", "deprived", "phantom",
    "horizon", "star", "dance", "crescent", "scraps"
];

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