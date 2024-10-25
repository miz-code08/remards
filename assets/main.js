const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const mode = document.querySelectorAll(`.checkMode`);

const startBtn = document.querySelector(`.startBtn`);
const cards = [
    "A1", "11", "21", "31", "41", "51", "61", "71", "81", "91", "J1", "Q1", "K1",
    "A2", "12", "22", "32", "42", "52", "62", "72", "82", "92", "J2", "Q2", "K2",
    "A3", "13", "23", "33", "43", "53", "63", "73", "83", "93", "J3", "Q3", "K3",
    "A4", "14", "24", "34", "44", "54", "64", "74", "84", "94", "J4", "Q4", "K4"
];

// dark light mode 
if (darkModeMediaQuery.matches) {
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
            else {
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });

    // chuyển hướng đến trang nhớ
    startBtn.addEventListener("click", () => {
        document.querySelector(".loading").style.display = "flex";
        document.querySelector(`.container`).style.display = "none";
        
        setTimeout(() => {
            window.location.href = './remember/index.html';
            const shuffledCards = shuffleArray(cards);
            console.log(shuffledCards);
        }, 1000);
    })

    // Hàm để trộn các phần tử trong mảng
    function shuffleArray(array) {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
};