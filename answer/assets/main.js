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
const listCardImg1 = document.querySelectorAll(`.listCardImg1Img`);
const arrowNext = document.querySelector(`.fa-angles-right`);
const arrowPrev = document.querySelector(`.fa-angles-left`);
const next = document.querySelector(`.fa-angle-right`);
const prev = document.querySelector(`.fa-angle-left`);
const cardIdx = document.querySelector(`.cardIdx`);
const score = document.querySelector(`.score`);
const time = document.querySelector(`.time`);

let viTri = 4;
let calc;
let scoreCnt = 0
let timeCnt;

// lấy mảng từ local
const shuffledCards = JSON.parse(localStorage.getItem("shuffledCards"));
const answer = JSON.parse(localStorage.getItem("answer"));
const endTime = JSON.parse(localStorage.getItem("endTime"));
// console.log(shuffledCards, answer);

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
            else {
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });
    
    // Cập nhật hình ảnh thẻ cho listCardImg
    listCardImg.forEach((val, idx) => {
        val.src = `../img/52/${shuffledCards[idx]}.png`;
    });

    // Cập nhật hình ảnh thẻ cho listCardImg1 từ answer
    answer.forEach((val, idx) => {
        listCardImg1[idx].src = `../img/52/${val}.png`;
    });

    // Hàm cập nhật hiệu ứng cho thẻ
    const updateCard = (newIndex) => {
        viTri = newIndex;
        calcTranslate();
        removeActive();
        addActive();
        cardTranslate();
    };

    // Gán sự kiện click cho listCardImg
    listCardImg.forEach((val, idx) => {
        val.addEventListener("click", () => updateCard(idx));
    });

    // Gán sự kiện click cho listCardImg1
    listCardImg1.forEach((val, idx) => {
        val.addEventListener("click", () => updateCard(idx));
    });

    // Các sự kiện cho nút trước/sau và mũi tên
    const navigate = (direction) => {
        if(direction === 'prev' && viTri > 0)
            updateCard(--viTri);
        else if(direction === 'next' && viTri < listCardImg.length - 1)
            updateCard(++viTri);
    };

    prev.addEventListener("click", () => navigate('prev'));
    next.addEventListener("click", () => navigate('next'));
    arrowPrev.addEventListener("click", () => updateCard(0));
    arrowNext.addEventListener("click", () => updateCard(listCardImg.length - 1));

    // Thêm sự kiện cho phím mũi tên
    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowLeft')
            navigate('prev');
        else if(event.key === 'ArrowRight')
            navigate('next');
    });

    // Hàm xóa lớp hoạt động
    const removeActive = () => {
        [...listCardImg, ...listCardImg1].forEach(val => {
            val.classList.remove("active1", "active2");
        });
    };

    // Hàm thêm lớp hoạt động
    const addActive = () => {
        if(viTri > 3 && viTri < listCardImg.length - 4) {
            [listCardImg, listCardImg1].forEach(imgList => {
                imgList[viTri].classList.add("active1");
                if(viTri > 0)
                    imgList[viTri - 1].classList.add("active2");
                if(viTri < imgList.length - 1)
                    imgList[viTri + 1].classList.add("active2");
            });
        } else {
            [listCardImg, listCardImg1].forEach(imgList => {
                imgList[viTri].classList.add("active2");
            });
        }
    };

    // Tính toán vị trí dịch chuyển
    const calcTranslate = () => {
        calc = Math.max(0, Math.min((viTri - 4) * 100, (listCardImg.length - 9) * 100));
        cardIdx.textContent = `${viTri + 1}/52`;
    };

    // Dịch chuyển thẻ
    const cardTranslate = () => {
        [...listCardImg, ...listCardImg1].forEach(val => {
            val.style.translate = `-${calc}%`;
        });
    };

    // Kiểm tra kết quả
    answer.forEach((val, idx) => {
        if(val === shuffledCards[idx]) {
            listCardImg1[idx].classList.add("green");
            scoreCnt++;
        } 
        else {
            listCardImg1[idx].classList.add("red");
        }
    });

    // Cập nhật điểm số và thời gian
    score.textContent = `${scoreCnt}/52`;
    time.textContent = endTime;
};