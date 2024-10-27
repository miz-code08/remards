const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const mode = document.querySelectorAll(`.checkMode`);

const charToNumMap = {
    's': '0', 'x': '0', 
    't': '1', 
    'n': '2', 
    'm': '3', 
    'r': '4', 
    'l': '5', 
    'g': '6', 
    'c': '7', 'k': '7', 
    'v': '8', 
    'b': '9', 'p': '9'
};
// Biến a và b để xác định phạm vi số ngẫu nhiên
let a = 0;
let b = 19;
let randomNumber;
let score = 0;
let range = b - a + 1;

const numberA = document.querySelector(`.numberA`);
const numberB = document.querySelector(`.numberB`);
const changeBtn = document.querySelector(`.changeBtn`);

// dark light mode 
if(darkModeMediaQuery.matches) {
    mode.forEach(val => {
        val.checked = true;
        mode.forEach(e => { e.checked = true; });
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.color = 'var(--dark-text)';
    });
}

// nếu load tất cả xong
window.onload = function() {
    // ẩn loading
    document.querySelector(".loading").style.display = "none";
    document.querySelector(`.container`).style.display = "block";

    // dark light mode
    mode.forEach((val, idx) => {
        val.addEventListener("change", () => {
            if(val.checked) {
                mode.forEach(e => { e.checked = true; });
                document.body.style.background = 'var(--dark-bg)';
                document.body.style.color = 'var(--dark-text)';
            }
            else{
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });

    changeBtn.addEventListener("click", () => {
        a = parseInt(Math.min(numberA.value, numberB.value), 10);
        b = parseInt(Math.max(numberA.value, numberB.value), 10);
        range = b - a + 1;
        generateRandomNumber();
    });

    numberB.addEventListener("keyup", function(event) {
        if(event.key === "Enter") {
            a = parseInt(Math.min(numberA.value, numberB.value), 10);
            b = parseInt(Math.max(numberA.value, numberB.value), 10);
            range = b - a + 1;
            generateRandomNumber();
        }
    });

    generateRandomNumber();
    function generateRandomNumber() {
        randomNumber = ("0" + (Math.floor(Math.random() * range) + a)).slice(-2);
        document.getElementById("random-number").innerText = "Số ngẫu nhiên: " + randomNumber;
    }
    
    function checkResult() {
        const userInputElem = document.getElementById("user-input");
        const userInput = userInputElem.value.toLowerCase().trim();
        const words = userInput.split(/\s+/);
        const convertedChars = words.map(word => charToNumMap[word.charAt(0)] || '').join('');
        if(randomNumber.startsWith("0")) {
            const secondDigit = randomNumber.charAt(1);
            if(convertedChars.charAt(0) === secondDigit) {
                score++;
                document.getElementById("score").innerText = score;
            }
        } 
        else{
            if(convertedChars === randomNumber) {
                score++;
                document.getElementById("score").innerText = score;
            }
        }
        userInputElem.value = "";
        generateRandomNumber();
    }
    
    document.getElementById("user-input").addEventListener("keyup", function(event) {
        if(event.key === "Enter") {
            checkResult();
        }
    });
};