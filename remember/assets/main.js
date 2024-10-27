const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const mode = document.querySelectorAll(`.checkMode`);

const submit = document.querySelector(`.startBtn`);
const cards = [
    "A1", "11", "21", "31", "41", "51", "61", "71", "81", "91", "J1", "Q1", "K1",
    "A2", "12", "22", "32", "42", "52", "62", "72", "82", "92", "J2", "Q2", "K2",
    "A3", "13", "23", "33", "43", "53", "63", "73", "83", "93", "J3", "Q3", "K3",
    "A4", "14", "24", "34", "44", "54", "64", "74", "84", "94", "J4", "Q4", "K4"
];

const listCardImg = document.querySelectorAll(`.listCardImg`);
const arrowNext = document.querySelector(`.fa-angles-right`);
const arrowPrev = document.querySelector(`.fa-angles-left`);
const next = document.querySelector(`.fa-angle-right`);
const prev = document.querySelector(`.fa-angle-left`);
const cardIdx = document.querySelector(`.cardIdx`);

let viTri = 4;
let calc;
const startTime = new Date();

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
    
    const shuffledCards = shuffleArray(cards);

    // cập nhật ảnh thẻ bài
    listCardImg.forEach((val, idx) => {
        val.src = `../img/52/${shuffledCards[idx]}.png`;
    });

    // Hàm trộn các phần tử trong mảng
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Hàm cập nhật vị trí thẻ khi được nhấn
    function updateCard (newIndex){
        viTri = newIndex;
        calcTranslate();
        removeActive();
        addActive();
        cardTranslate();
    };

    // Gán sự kiện click cho từng thẻ
    listCardImg.forEach((val, idx) => {
        val.addEventListener("click", () => updateCard(idx));
    });

    // Các sự kiện cho nút trước/sau và mũi tên
    prev.addEventListener("click", () => {
        if (viTri > 0)
            updateCard(--viTri);
    });

    next.addEventListener("click", () => {
        if (viTri < listCardImg.length - 1)
            updateCard(++viTri);
    });

    arrowPrev.addEventListener("click", () => updateCard(0));
    arrowNext.addEventListener("click", () => updateCard(listCardImg.length - 1));

    // Thêm sự kiện cho phím mũi tên
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && viTri > 0) 
            updateCard(--viTri);
        else if (event.key === 'ArrowRight' && viTri < listCardImg.length - 1) 
            updateCard(++viTri);
    });

    // Hàm xóa lớp hoạt động
    function removeActive (){
        listCardImg.forEach(val => {
            val.classList.remove("active1", "active2");
        });
    };

    // Hàm thêm lớp hoạt động
    function addActive (){
        listCardImg[viTri].classList.add("active1");
        if (viTri > 0) 
            listCardImg[viTri - 1].classList.add("active2");
        if (viTri < listCardImg.length - 1) 
            listCardImg[viTri + 1].classList.add("active2");
    };

    // Tính toán vị trí dịch chuyển
    function calcTranslate (){
        calc = Math.max(0, Math.min((viTri - 4) * 100, (listCardImg.length - 9) * 100));
        cardIdx.textContent = `${viTri + 1}/52`;
    };

    // Dịch chuyển thẻ
    function cardTranslate (){
        listCardImg.forEach(val => {
            val.style.translate = `-${calc}%`;
        });
    };

    // Ngăn sự thoát khỏi trang khi đang nhớ
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

    // Xử lý sự kiện submit
    submit.addEventListener("click", () => {
        const currentTime = new Date();
        const timeDiff = currentTime - startTime;
        // Tính toán thời gian làm bài
        const endTime = new Date(timeDiff).toISOString().substr(11, 8);
        // Tải hàm shuffledCards lên
        localStorage.setItem("shuffledCards", JSON.stringify(shuffledCards));
        localStorage.setItem("endTime", JSON.stringify(endTime));

        // Chuyển hướng
        window.location.assign('../test/index.html');
    });
};