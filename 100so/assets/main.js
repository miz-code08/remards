// Kiểm tra chế độ màu tối của người dùng
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const mode = document.querySelectorAll(`.checkMode`);

// Bản đồ ký tự thành số
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

// giá trị đầu cuối
let a = 0; 
let b = 19; 
let randomNumber; // Số ngẫu nhiên
let score = 0; // Điểm số
let range = b - a + 1; // Phạm vi

const numberA = document.querySelector(`.numberA`);
const numberB = document.querySelector(`.numberB`);
const changeBtn = document.querySelector(`.changeBtn`);

// Áp dụng chế độ tối nếu được kích hoạt
if(darkModeMediaQuery.matches) {
    mode.forEach(val => {
        val.checked = true;
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.color = 'var(--dark-text)';
    });
}

// Khi trang được tải
window.onload = function() {
    document.querySelector(".loading").style.display = "none"; // Ẩn loading
    document.querySelector(`.container`).style.display = "block"; // Hiện nội dung

    // Lắng nghe sự thay đổi chế độ màu
    mode.forEach(val => {
        val.addEventListener("change", () => {
            if(val.checked) {
                mode.forEach(e => { e.checked = true; });
                document.body.style.background = 'var(--dark-bg)';
                document.body.style.color = 'var(--dark-text)';
            } 
            else {
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });

    // Sự kiện thay đổi khoảng a và b
    changeBtn.addEventListener("click", updateRange);

    numberB.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            updateRange();
        }
    });

    // Hàm để thay đổi khoảng a và b
    function updateRange() {
        a = parseInt(Math.min(numberA.value, numberB.value), 10);
        b = parseInt(Math.max(numberA.value, numberB.value), 10);
        numberA.value = "";
        numberB.value = "";
        range = b - a + 1;
        generateRandomNumber();
    }
    
    // Lắng nghe sự kiện nhấn phím cho input người dùng
    document.getElementById("user-input").addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            checkResult(); // Kiểm tra kết quả
        }
    });

    // Hàm kiểm tra kết quả nhập từ người dùng
    function checkResult() {
        const userInputElem = document.getElementById("user-input");
        const userInput = userInputElem.value.toLowerCase().trim();
        const words = userInput.split(/\s+/);
        const convertedChars = words.map(word => charToNumMap[word.charAt(0)] || '').join('');
        
        // Kiểm tra điều kiện trúng thưởng
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
        userInputElem.value = ""; // Xóa input
        generateRandomNumber(); // Tạo số ngẫu nhiên mới
    }

    // Hàm tạo số ngẫu nhiên
    generateRandomNumber(); // Tạo số ngẫu nhiên lần đầu    
    function generateRandomNumber() {
        randomNumber = ("0" + (Math.floor(Math.random() * range) + a)).slice(-2);
        document.getElementById("random-number").innerText = "Số ngẫu nhiên: " + randomNumber;
    }
};
